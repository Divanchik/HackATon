using Dapper;
using DataCraftServer.AppContext;
using Npgsql;
using System.Data;
using System.Text;
using Task = System.Threading.Tasks.Task;

namespace DataCraftServer.Services
{
    public class PostgreSQLService
    {
        private string GetColumnType(dynamic type, string doublePresicion = "2")
        {
            switch (type)
            {
                case "String":
                    return "TEXT";
                case "Lookup":
                    return "UUID";
                case "Int32":
                    return "INTEGER";
                case "Decimal":
                    return $"NUMERIC(18,{doublePresicion})";
                case "DateTime":
                    return "TIMESTAMP";
                case "Guid":
                    return "UUID";
                case "Boolean":
                    return "BOOLEAN";
                case "Date":
                    return "DATE";
                case "Time":
                    return "TIME";
                default:
                    return "TEXT";
            }
        }

        private string DetermineDataType(string value)
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
                // Выбор типа данных для колонки. Здесь используется VARCHAR(255) как пример.
                createTableSql += $", {header} VARCHAR(255)";
            }

            using (IDbConnection db = new NpgsqlConnection(DbConnection.ConnectionString))
            {//\"{EntityName}\"
                var usersDb = await db.ExecuteAsync(queryBuilder.ToString());
      
            }
        }
    }
}
