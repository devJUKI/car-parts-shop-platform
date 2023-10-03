using AdsWebsiteAPI.Auth.Entities;

namespace AdsWebsiteAPI.Data.Dtos
{
    public record ShopDto(int Id, string Name, string Location, UserDto User);

    public record CreateShopResponseDto(int Id, string Name, string Location);

    public record CreateShopRequestDto(string Name, string Location);
    public record UpdateShopRequestDto(int Id, string Name, string Location);
}