namespace DataCraftServer.Models
{
    public class FileData
    {
        public string FileName { get; set; }
        public List<ColumnData> Columns { get; set; }
    }

    public class ColumnData
    {
        public string ColumnName { get; set; }
        public List<string?> ColumnValues { get; set; }
    }
}
