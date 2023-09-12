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

            CreateMap<Car, CarDto>()
                .ForPath(dest => dest.Body, opt => opt.MapFrom(src => src.Body!.Name))
                .ForPath(dest => dest.Fuel, opt => opt.MapFrom(src => src.Fuel!.Name))
                .ForPath(dest => dest.Gearbox, opt => opt.MapFrom(src => src.Gearbox!.Name))
                .ForPath(dest => dest.Model, opt => opt.MapFrom(src => src.Model!.Name));

            CreateMap<Part, PartDto>();
        }
    }
}
