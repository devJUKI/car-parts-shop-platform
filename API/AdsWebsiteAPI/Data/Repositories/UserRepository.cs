using AdsWebsiteAPI.Data.Entities;
using AdsWebsiteAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AdsWebsiteAPI.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AdsWebsiteDbContext context;

        public UserRepository(AdsWebsiteDbContext context)
        {
            this.context = context;
        }

        public async Task<User?> GetAsync(int userId)
        {
            return await context.Users!.FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<IReadOnlyList<User>> GetAllAsync()
        {
            return await context.Users!.ToListAsync();
        }

        public async Task CreateAsync(User user)
        {
            context.Users!.Add(user);
            await context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            context.Users!.Update(user);
            await context.SaveChangesAsync();
        }

        public async Task DeleteAsync(User user)
        {
            context.Users!.Remove(user);
            await context.SaveChangesAsync();
        }
    }
}
