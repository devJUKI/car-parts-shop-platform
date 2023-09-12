using Microsoft.EntityFrameworkCore;
using AdsWebsiteAPI.Data.Entities;
using AdsWebsiteAPI.Interfaces;

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
                .Where(c => c.Shop!.Id == shopId)
                .ToListAsync();
        }

        public async Task<Car?> GetAsync(int shopId, int carId)
        {
            return await context
                .Cars!
                .Include(c => c.Body)
                .Include(c => c.Fuel)
                .Include(c => c.Gearbox)
                .Include(c => c.Model)
                .Include(c => c.Shop)
                .FirstOrDefaultAsync(c => c.Shop!.Id == shopId && c.Id == carId);
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
    }
}
