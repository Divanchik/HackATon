using Dapper;
using DataCraftServer.AppContext;
using DataCraftServer.Models;
using Microsoft.AspNetCore.Http.Extensions;
using Npgsql;
using System.Data;
using System.Text;
using Task = System.Threading.Tasks.Task;

namespace DataCraftServer.Services
{
    public class PostgreSQLService : IPostgreSQLService
    {
        public string DetermineDataType(string value)
        {
            if (Guid.TryParse(value, out var guidResult))
                return "UUID";
            if (int.TryParse(value, out var intResult))
                return "INTEGER";
            if (double.TryParse(value, out var doubleResult))
                return "NUMERIC(18,3)";
            if (bool.TryParse(value, out var boolResult))
                return "BOOLEAN";
            if (DateTime.TryParse(value, out var dateResult))
                return "TIMESTAMP";

            return "TEXT";
        }

        public async Task CreateTableWithColumnsFromCsv(string tableName, Dictionary<string, List<string>> csvData)
        {
            var queryBuilder = new StringBuilder();
            var createTableStr = $"CREATE TABLE IF NOT EXISTS \"{tableName}\" (";

            queryBuilder.Append(createTableStr);

            foreach (var header in csvData.Keys)
            {
                queryBuilder.Append($"\"{header}\" {DetermineDataType(csvData[header].First(x => !string.IsNullOrEmpty(x)))}, ");
            }

            queryBuilder.Remove(queryBuilder.Length - 2, 2);
            queryBuilder.Append(");");

            using (IDbConnection db = new NpgsqlConnection(DbConnection.ConnectionString))
            {
                var result = await db.ExecuteAsync(queryBuilder.ToString());
            }
        }

        public async Task<FileData> GetPagedData(string tableName, List<string> columns, int offset, int limit)
        {
            string columnNames = string.Join(", ", columns.Select(col => $"\"{col}\""));

            string sql = $"SELECT {columnNames} FROM \"{tableName}\" OFFSET {offset} LIMIT {limit}";

            using (IDbConnection db = new NpgsqlConnection(DbConnection.ConnectionString))
            {
                var results = await db.QueryAsync(sql);
                var columnDataList = new List<ColumnData>();

                foreach (var column in columns)
                {
                    columnDataList.Add(new ColumnData
                    {
                        ColumnName = column,
                        ColumnValues = results.Select(row =>
                        {
                            var rowDict = row as IDictionary<string, object>;
                            return rowDict != null && rowDict.ContainsKey(column)
                                ? rowDict[column]
                                : null; // Или другое значение
                        })
                    .ToList()
                    });
                }

                return new FileData
                {
                    FileName = tableName,
                    Columns = columnDataList
                };
            }
        }
    }
}
