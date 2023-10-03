using AdsWebsiteAPI.Auth.Entities;
using AdsWebsiteAPI.Data.Dtos;
using FluentValidation;

namespace AdsWebsiteAPI.Data.Dtos
{
    public record ShopDto(int Id, string Name, string Location, UserDto User);
    public record CreateShopResponseDto(int Id, string Name, string Location);
    public record CreateShopRequestDto(string Name, string Location);
    public record UpdateShopRequestDto(int Id, string Name, string Location);
}

namespace AdsWebsiteAPI.Data.Validation
{
    public class CreateShopRequestDtoValidator : AbstractValidator<CreateShopRequestDto>
    {
        public CreateShopRequestDtoValidator()
        {
            RuleFor(dto => dto.Name).NotEmpty();
            RuleFor(dto => dto.Location).NotEmpty();
        }
    }

    public class UpdateShopRequestDtoValidator : AbstractValidator<UpdateShopRequestDto>
    {
        public UpdateShopRequestDtoValidator()
        {
            RuleFor(dto => dto.Id).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.Name).NotEmpty();
            RuleFor(dto => dto.Location).NotEmpty();
        }
    }
}
