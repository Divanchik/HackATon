using DataCraftServer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataCraftServer.AppContext
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Location> Locations { get; set; }
        public DbSet<TaskType> TaskTypes { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Sprint> Sprints { get; set; }
        public DbSet<WorkGroup> Workgroups { get; set; }
        public DbSet<Resolution> Resolutions { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options = null) : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public ApplicationContext()
        {
            
        }
    }
}
