namespace AdsWebsiteAPI.Data.Dtos
{
    public record CarDto(int Id, DateTime FirstRegistration, int Mileage, float Engine, int Power, string Body, string Fuel, string Gearbox, string Model, ShopDto Shop);
    public record CreateCarDto(DateTime FirstRegistration, int Mileage, float Engine, int Power, int BodyTypeId, int FuelTypeId, int GearboxTypeId, int ModelId, int ShopId);
    public record UpdateCarDto(int Id, DateTime FirstRegistration, int Mileage, float Engine, int Power, int BodyTypeId, int FuelTypeId, int GearboxTypeId, int ModelId, int ShopId);
}
