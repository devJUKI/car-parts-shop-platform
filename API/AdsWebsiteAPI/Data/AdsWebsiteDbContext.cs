﻿using AdsWebsiteAPI.Auth.Entities;
using AdsWebsiteAPI.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AdsWebsiteAPI.Data
{
    public class AdsWebsiteDbContext : IdentityDbContext<AdsWebsiteUser>
    {
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

            //optionsBuilder.UseMySQL(configuration.GetConnectionString("AWSConnectionString")!);
            //optionsBuilder.UseMySQL(configuration.GetConnectionString("MySQLConnectionString")!);
            optionsBuilder.UseMySQL(configuration.GetConnectionString("DigitalOceanConnectionString")!);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Car>()
                .HasOne(b => b.Shop)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Part>()
                .HasOne(b => b.Car)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
