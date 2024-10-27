namespace DataCraftServer.Models
{
    public class EntityInfoItem
    {
        public Guid EntityId { get; set; } = Guid.NewGuid();
        public string FileName { get; set; }
        public List<string> Columns { get; set; }
    }
}
