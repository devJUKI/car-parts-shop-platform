namespace AdsWebsiteAPI.Data.Dtos
{
    public record PartDto(int Id, string Name, double Price, CarDto Car);
    public record UpdatePartDto(int Id, string Name, double Price, int CarId, int ShopId);
    public record CreatePartDto(string Name, double Price, int CarId, int ShopId);
}
