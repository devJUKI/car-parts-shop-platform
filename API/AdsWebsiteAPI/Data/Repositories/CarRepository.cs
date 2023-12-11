using Microsoft.EntityFrameworkCore;
using AdsWebsiteAPI.Data.Entities;
using AdsWebsiteAPI.Interfaces;
using AdsWebsiteAPI.Data.Dtos;

namespace AdsWebsiteAPI.Data.Repositories
{
    public class CarRepository : ICarRepository
    {
        private readonly AdsWebsiteDbContext context;

        public CarRepository(AdsWebsiteDbContext context)
        {
            this.context = context;
        }

        public async Task<IReadOnlyList<Car>> GetAllAsync(int shopId)
        {
            return await context
                .Cars!
                .Include(c => c.Body)
                .Include(c => c.Fuel)
                .Include(c => c.Gearbox)
                .Include(c => c.Model)
                .Include(c => c.Shop)
                .Include(c => c.Model!.Make)
                .Where(c => c.Shop!.Id == shopId)
                .ToListAsync();
        }

        public async Task<Car?> GetAsync(int shopId, int carId)
        {
            var result = await context
                .Cars!
                .Include(c => c.Body)
                .Include(c => c.Fuel)
                .Include(c => c.Gearbox)
                .Include(c => c.Model)
                .Include(c => c.Shop)
                .Include(c => c.Shop!.User)
                .Include(c => c.Model!.Make)
                .FirstOrDefaultAsync(c => c.Shop!.Id == shopId && c.Id == carId);
            return result;
        }

        public async Task DeleteAsync(Car car)
        {
            context.Cars!.Remove(car);
            await context.SaveChangesAsync();
        }

        public async Task CreateAsync(Car car)
        {
            context.Cars!.Add(car);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Car car)
        {
            context.Cars!.Update(car);
            await context.SaveChangesAsync();
        }

        public async Task<IReadOnlyList<Make>> GetAllMakesAsync()
        {
            return await context
                .Makes!
                .ToListAsync();
        }

        public async Task<IReadOnlyList<Model>> GetAllModelsAsync(int makeId)
        {
            return await context
                .Models!
                .Where(m => m.Make!.Id == makeId)
                .Include(m => m.Make)
                .ToListAsync();
        }

        public async Task<Make?> GetMakeAsync(int makeId)
        {
            return await context.Makes!.FirstOrDefaultAsync(m => m.Id == makeId);
        }

        public async Task<Model?> GetModelAsync(int modelId)
        {
            return await context.Models!.Include(m => m.Make).FirstOrDefaultAsync(m => m.Id == modelId);
        }

        public async Task<BodyType?> GetBodyAsync(int bodyId)
        {
            return await context.BodyTypes!.FirstOrDefaultAsync(b => b.Id == bodyId);
        }

        public async Task<FuelType?> GetFuelAsync(int fuelId)
        {
            return await context.FuelTypes!.FirstOrDefaultAsync(f => f.Id == fuelId);
        }

        public async Task<GearboxType?> GetGearboxAsync(int gearboxId)
        {
            return await context.GearboxTypes!.FirstOrDefaultAsync(g => g.Id == gearboxId);
        }

        public async Task<List<BodyType>> GetAllBodiesAsync()
        {
            return await context.BodyTypes!.ToListAsync();
        }

        public async Task<List<FuelType>> GetAllFuelsAsync()
        {
            return await context.FuelTypes!.ToListAsync();
        }

        public async Task<List<GearboxType>> GetAllGearboxesAsync()
        {
            return await context.GearboxTypes!.ToListAsync();
        }
    }
}
