using AdsWebsiteAPI.Data.Entities;

namespace AdsWebsiteAPI.Data.Dtos
{
    public record ShopDto(int Id, string Name, string Location, User Owner);
    public record CreateShopDto(string Name, string Location, int OwnerId);
    public record UpdateShopDto(int Id, string Name, string Location);
}
