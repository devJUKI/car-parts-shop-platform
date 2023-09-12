using AdsWebsiteAPI.Data.Entities;

namespace AdsWebsiteAPI.Interfaces
{
    public interface IShopRepository
    {
        Task<Shop?> GetAsync(int shopId);
        Task<IReadOnlyList<Shop>> GetAllAsync();
        //Task<PagedList<Topic>> GetManyAsync(TopicSearchParameters topicSearchParameters);
        Task CreateAsync(Shop shop);
        Task UpdateAsync(Shop shop);
        Task DeleteAsync(Shop shop);
    }
}
