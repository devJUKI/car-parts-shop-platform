using AdsWebsiteAPI.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace AdsWebsiteAPI.Data
{
    public class AdsWebsiteDbContext : DbContext
    {
        public DbSet<User>? Users { get; set; }
        public DbSet<Part>? Parts { get; set; }
        public DbSet<Shop>? Shops { get; set; }
        public DbSet<Car>? Cars { get; set; }
        public DbSet<Make>? Makes { get; set; }
        public DbSet<Model>? Models { get; set; }
        public DbSet<BodyType>? BodyTypes { get; set; }
        public DbSet<FuelType>? FuelTypes { get; set; }
        public DbSet<GearboxType>? GearboxTypes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json", optional: false)
               .Build();

            optionsBuilder.UseMySQL(configuration.GetConnectionString("MySQLConnectionString")!);
        }
    }
}
