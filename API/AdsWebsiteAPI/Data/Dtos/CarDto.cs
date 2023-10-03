using AdsWebsiteAPI.Data.Dtos;
using FluentValidation;

namespace AdsWebsiteAPI.Data.Dtos
{
    public record CarDto(int Id, DateTime FirstRegistration, int Mileage, float Engine, int Power, string Body, string Fuel, string Gearbox, string Model, ShopDto Shop);
    public record CreateCarDto(DateTime FirstRegistration, int Mileage, float Engine, int Power, int BodyTypeId, int FuelTypeId, int GearboxTypeId, int ModelId, int ShopId);
    public record UpdateCarDto(int Id, DateTime FirstRegistration, int Mileage, float Engine, int Power, int BodyTypeId, int FuelTypeId, int GearboxTypeId, int ModelId, int ShopId);
}

namespace AdsWebsiteAPI.Data.Validation
{
    public class CreateCarDtoValidator : AbstractValidator<CreateCarDto>
    {
        public CreateCarDtoValidator()
        {
            RuleFor(dto => dto.FirstRegistration).NotEmpty().GreaterThan(new DateTime(1700, 1, 1));
            RuleFor(dto => dto.Mileage).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.Engine).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.Power).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.BodyTypeId).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.FuelTypeId).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.GearboxTypeId).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.ModelId).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.ShopId).NotEmpty().GreaterThan(0);
        }
    }

    public class UpdateCarDtoValidator : AbstractValidator<UpdateCarDto>
    {
        public UpdateCarDtoValidator()
        {
            RuleFor(dto => dto.Id).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.FirstRegistration).NotEmpty().GreaterThan(new DateTime(1700, 1, 1));
            RuleFor(dto => dto.Mileage).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.Engine).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.Power).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.BodyTypeId).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.FuelTypeId).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.GearboxTypeId).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.ModelId).NotEmpty().GreaterThan(0);
            RuleFor(dto => dto.ShopId).NotEmpty().GreaterThan(0);
        }
    }
}
