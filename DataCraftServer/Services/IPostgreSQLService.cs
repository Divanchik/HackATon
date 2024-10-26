namespace DataCraftServer.Services
{
    public interface IPostgreSQLService
    {
        string DetermineDataType(string value);
        Task CreateTableWithColumnsFromCsv(string tableName, Dictionary<string, List<string>> csvData);
    }
}
