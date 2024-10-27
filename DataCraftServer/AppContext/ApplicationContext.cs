using DataCraftServer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataCraftServer.AppContext
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<EntityInfoItem> EntityInfoItems { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options = null) : base(options)
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }

        public ApplicationContext()
        {
            
        }
    }
}
