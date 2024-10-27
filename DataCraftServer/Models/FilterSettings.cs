namespace DataCraftServer.Models
{
    public class FilterSettings
    {
        public string fileName { get; set; }
        public List<String> columns { get; set; }
        int? limit { get; set; }
        int? offset { get; set; }
    }
}
