using AdsWebsiteAPI.Auth;
using AdsWebsiteAPI.Auth.Entities;
using AdsWebsiteAPI.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AdsWebsiteAPI.Data
{
    public class AuthDbSeeder
    {
        private readonly UserManager<AdsWebsiteUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AdsWebsiteDbContext _dbContext;

        public AuthDbSeeder(UserManager<AdsWebsiteUser> userManager, RoleManager<IdentityRole> roleManager, AdsWebsiteDbContext dbContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;
        }

        public async Task SeedAsync()
        {
            await AddDefaultRoles();
            await AddAdminUser();
            //await AddDefaultCarDataEntries();
        }

        private async Task AddAdminUser()
        {
            var newAdminUser = new AdsWebsiteUser()
            {
                UserName = "admin",
                Email = "admin@admin.com"
            };

            var existingAdminUser = await _userManager.FindByNameAsync(newAdminUser.UserName);

            if (existingAdminUser == null)
            {
                var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "VerySafePassword1!");

                if (createAdminUserResult.Succeeded)
                {
                    await _userManager.AddToRolesAsync(newAdminUser, AdsWebsiteRoles.All);
                }
            }
        }

        private async Task AddDefaultRoles()
        {
            foreach (var role in AdsWebsiteRoles.All)
            {
                var roleExists = await _roleManager.RoleExistsAsync(role);

                if (!roleExists)
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }

        private async Task AddDefaultCarDataEntries()
        {
            var makes = await _dbContext.Makes!.ToListAsync();

            if (makes.Where(m => m.Name == "530d").Any() == false)
            {
                _dbContext.Makes!.Add(new Make
                {
                    Name = "BMW",
                });
                await _dbContext.SaveChangesAsync();
            }

            var models = await _dbContext.Models!.ToListAsync();
            var make = await _dbContext.Makes!.Where(m => m.Name == "BMW").FirstAsync();

            if (models.Where(m => m.Name == "530d").Any() == false)
            {
                _dbContext.Models!.Add(new Model
                {
                    Name = "530d",
                    Make = make
                });
                await _dbContext.SaveChangesAsync();

            }

            var fuelTypes = await _dbContext.FuelTypes!.ToListAsync();

            if (fuelTypes.Where(f => f.Name == "Diesel").Any() == false)
            {
                _dbContext.FuelTypes!.Add(new FuelType
                {
                    Name = "Diesel"
                });
                await _dbContext.SaveChangesAsync();

            }

            var bodyTypes = await _dbContext.BodyTypes!.ToListAsync();

            if (bodyTypes.Where(f => f.Name == "Sedan").Any() == false)
            {
                _dbContext.BodyTypes!.Add(new BodyType
                {
                    Name = "Sedan"
                });
                await _dbContext.SaveChangesAsync();

            }

            var gearboxTypes = await _dbContext.GearboxTypes!.ToListAsync();

            if (gearboxTypes.Where(f => f.Name == "Manual").Any() == false)
            {
                _dbContext.GearboxTypes!.Add(new GearboxType
                {
                    Name = "Manual"
                });
                await _dbContext.SaveChangesAsync();

            }

            makes = await _dbContext.Makes!.ToListAsync();
            makes.ForEach(m => Console.WriteLine(m.Name));
            models = await _dbContext.Models!.ToListAsync();
            models.ForEach(m => Console.WriteLine(m.Name + " | " + m.Make!.Name));
            fuelTypes = await _dbContext.FuelTypes!.ToListAsync();
            fuelTypes.ForEach(m => Console.WriteLine(m.Name));
            bodyTypes = await _dbContext.BodyTypes!.ToListAsync();
            bodyTypes.ForEach(m => Console.WriteLine(m.Name));
            gearboxTypes = await _dbContext.GearboxTypes!.ToListAsync();
            gearboxTypes.ForEach(m => Console.WriteLine(m.Name));
        }
    }
}
