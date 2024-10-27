using Dapper;
using DataCraftServer.AppContext;
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
                var usersDb = await db.ExecuteAsync(queryBuilder.ToString());
            }
        }
    }
}
