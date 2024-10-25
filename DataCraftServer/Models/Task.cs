using System.ComponentModel.DataAnnotations;

namespace DataCraftServer.Models
{
    public class Task
    {
        public int Id { get; set; }
        public Location Location { get; set; }
        public TaskType Type { get; set; }
        public Status Status { get; set; }
        public Priority Priority { get; set; }
        public string Number { get; set; }
        public string Title { get; set; }
        public Tag[] Tags { get; set; }
        public DateTime CreationDateTime { get; set; }
        public int CreationUserId { get; set; }
        public DateTime UpdateDateTime { get; set; }
        public int UpdateUserId { get; set; }
        public string Description { get; set; }
        public int ParentTaskId { get; set; }
        public User AssignedUser { get; set; }
        public User OwnerUser { get; set; }
        public DateTime Deadline { get; set; }
        public int Estimation { get; set; }
        public Sprint Sprint { get; set; }
        public int TimeSpent { get; set; }
        public WorkGroup WorkGroup { get; set; }
        public Resolution Resolution { get; set; }
    }
}
