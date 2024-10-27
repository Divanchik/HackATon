using DataCraftServer.Models;
using Task = System.Threading.Tasks.Task;

namespace DataCraftServer.Services
{
    public interface IPostgreSQLService
    {
        string DetermineDataType(string value);
        Task CreateTableWithColumnsFromCsv(string tableName, Dictionary<string, List<string>> csvData);
        Task<FileData> GetPagedData(string tableName, List<string> columns, int offset = 0, int limit = 20);
        Task InsertTableData(string tableName, Dictionary<string, List<string>> csvData);
    }
}
