using System.ComponentModel.DataAnnotations;

namespace DataCraftServer.Models
{
    public class EntityInfoItem
    {
        [Key]
        public Guid EntityId { get; set; } = Guid.NewGuid();
        public string FileName { get; set; }
        public List<string> Columns { get; set; }
    }
}
