using Microsoft.EntityFrameworkCore;

namespace lift_games_database.data
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<games> Games { get; set; }
        public DbSet<user> User { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
            
        }



    }
}
