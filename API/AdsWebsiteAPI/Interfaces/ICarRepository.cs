using AdsWebsiteAPI.Data.Entities;

namespace AdsWebsiteAPI.Interfaces
{
    public interface ICarRepository
    {
        Task<Car?> GetAsync(int shopId, int carId);
        Task<IReadOnlyList<Car>> GetAllAsync(int shopId);
        Task CreateAsync(Car car);
        Task UpdateAsync(Car car);
        Task DeleteAsync(Car car);
        Task<IReadOnlyList<Make>> GetAllMakesAsync();
        Task<IReadOnlyList<Model>> GetAllModelsAsync(int makeId);
        Task<Make?> GetMakeAsync(int makeId);
        Task<Model?> GetModelAsync(int modelId);
        Task<BodyType?> GetBodyAsync(int bodyId);
        Task<FuelType?> GetFuelAsync(int fuelId);
        Task<GearboxType?> GetGearboxAsync(int gearboxId);
        Task<List<BodyType>> GetAllBodiesAsync();
        Task<List<FuelType>> GetAllFuelsAsync();
        Task<List<GearboxType>> GetAllGearboxesAsync();
    }
}
