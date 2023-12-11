using AdsWebsiteAPI.Auth.Entities;
using AdsWebsiteAPI.Data.Dtos;
using AdsWebsiteAPI.Data.Entities;
using AutoMapper;

namespace AdsWebsiteAPI.Data
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Shop, ShopDto>();
            CreateMap<Shop, CreateShopResponseDto>();

            CreateMap<Car, CarDto>()
                .ForPath(dest => dest.Body, opt => opt.MapFrom(src => src.Body!.Name))
                .ForPath(dest => dest.Fuel, opt => opt.MapFrom(src => src.Fuel!.Name))
                .ForPath(dest => dest.Gearbox, opt => opt.MapFrom(src => src.Gearbox!.Name))
                .ForPath(dest => dest.Model, opt => opt.MapFrom(src => src.Model!.Name))
                .ForPath(dest => dest.Make, opt => opt.MapFrom(src => src.Model!.Make!.Name));

            CreateMap<Part, PartDto>();

            CreateMap<AdsWebsiteUser, UserDto>();

            CreateMap<Make, MakeDto>();
            CreateMap<Model, ModelDto>()
                .ForPath(dest => dest.MakeId, opt => opt.MapFrom(src => src.Make!.Id));
        }
    }
}
