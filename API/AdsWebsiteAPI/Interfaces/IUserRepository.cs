using AdsWebsiteAPI.Data.Entities;

namespace AdsWebsiteAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> GetAsync(int userId);
        Task<IReadOnlyList<User>> GetAllAsync();
        Task CreateAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(User user);
    }
}
