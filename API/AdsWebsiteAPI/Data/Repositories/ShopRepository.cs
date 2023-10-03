using Microsoft.EntityFrameworkCore;
using AdsWebsiteAPI.Data.Entities;
using AdsWebsiteAPI.Interfaces;

namespace AdsWebsiteAPI.Data.Repositories
{
    public class ShopRepository : IShopRepository
    {
        private readonly AdsWebsiteDbContext context;

        public ShopRepository(AdsWebsiteDbContext context)
        {
            this.context = context;
        }

        public async Task<Shop?> GetAsync(int shopId)
        {
            return await context.Shops!.Include(s => s.User).FirstOrDefaultAsync(s => s.Id == shopId);
        }

        public async Task<Shop?> GetAsync(string shopName)
        {
            return await context.Shops!.Include(s => s.User).FirstOrDefaultAsync(s => s.Name == shopName);
        }

        public async Task<IReadOnlyList<Shop>> GetAllAsync()
        {
            return await context.Shops!.Include(s => s.User).ToListAsync();
        }

        public async Task CreateAsync(Shop shop)
        {
            context.Shops!.Add(shop);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Shop shop)
        {
            context.Shops!.Update(shop);
            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Shop shop)
        {
            context.Shops!.Remove(shop);
            await context.SaveChangesAsync();
        }
    }
}
