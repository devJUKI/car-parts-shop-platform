using AdsWebsiteAPI.Data.Dtos;
using FluentValidation;

namespace AdsWebsiteAPI.Data.Dtos
{
    public record PartDto(int Id, string Name, double Price, CarDto Car);
    public record CreatePartDto(string Name, double Price, int CarId, int ShopId);
    public record UpdatePartDto(int Id, string Name, double Price, int CarId, int ShopId);
}

namespace AdsWebsiteAPI.Data.Validation
{
    public class CreatePartDtoValidator : AbstractValidator<CreatePartDto>
    {
        public CreatePartDtoValidator()
        {
            RuleFor(dto => dto.Name).NotEmpty();
            RuleFor(dto => dto.Price).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.CarId).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.ShopId).NotEmpty().GreaterThan(0);
        }
    }

    public class UpdatePartDtoValidator : AbstractValidator<UpdatePartDto>
    {
        public UpdatePartDtoValidator()
        {
            RuleFor(dto => dto.Id).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.Name).NotEmpty();
            RuleFor(dto => dto.Price).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.CarId).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.ShopId).NotEmpty().GreaterThan(0);
        }
    }
}
