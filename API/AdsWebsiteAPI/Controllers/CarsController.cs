using AdsWebsiteAPI.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using AdsWebsiteAPI.Data.Dtos;
using AdsWebsiteAPI.Interfaces;
using AutoMapper;

namespace AdsWebsiteAPI.Controllers
{
    [Route("api/shops/{shopId}/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarRepository carRepository;
        private readonly IShopRepository shopRepository;
        private readonly IMapper mapper;

        public CarsController(ICarRepository carRepository, IShopRepository shopRepository, IMapper mapper)
        {
            this.carRepository = carRepository;
            this.shopRepository = shopRepository;
            this.mapper = mapper;
        }

        // GET: api/shops/{shopId}/Cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarDto>>> GetCars(int shopId)
        {
            var shop = await shopRepository.GetAsync(shopId);

            if (shop == null)
            {
                return NotFound();
            }

            var cars = await carRepository.GetAllAsync(shopId);

            return Ok(cars.Select(c => mapper.Map<CarDto>(c)));
        }

        // GET: api/shops/{shopId}/Cars/5
        [HttpGet("{carId}")]
        public async Task<ActionResult<CarDto>> GetCar(int shopId, int carId)
        {
            var car = await carRepository.GetAsync(shopId, carId);

            if (car == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<CarDto>(car));
        }

        // PUT: api/shops/{shopId}/Cars/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{carId}")]
        public async Task<ActionResult<CarDto>> PutCar(int shopId, int carId, UpdateCarDto updateCarDto)
        {
            if (shopId != updateCarDto.ShopId || carId != updateCarDto.Id)
            {
                return BadRequest();
            }

            var car = await carRepository.GetAsync(shopId, carId);

            if (car == null)
            {
                return NotFound();
            }

            var bodyType = await carRepository.GetBodyAsync(updateCarDto.BodyTypeId);
            var fuelType = await carRepository.GetFuelAsync(updateCarDto.FuelTypeId);
            var gearboxType = await carRepository.GetGearboxAsync(updateCarDto.GearboxTypeId);
            var model = await carRepository.GetModelAsync(updateCarDto.ModelId);
            var shop = await shopRepository.GetAsync(updateCarDto.ShopId);

            if (bodyType == null || fuelType == null || gearboxType == null || model == null || shop == null)
            {
                return BadRequest();
            }

            car.FirstRegistration = updateCarDto.FirstRegistration;
            car.Mileage = updateCarDto.Mileage;
            car.Engine = updateCarDto.Engine;
            car.Power = updateCarDto.Power;
            car.Body = bodyType;
            car.Fuel = fuelType;
            car.Gearbox = gearboxType;
            car.Model = model;
            car.Shop = shop;

            await carRepository.UpdateAsync(car);

            return Ok(mapper.Map<CarDto>(car));
        }

        // POST: api/shops/{shopId}/Cars
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CarDto>> PostCar(CreateCarDto createCarDto)
        {
            var bodyType = await carRepository.GetBodyAsync(createCarDto.BodyTypeId);
            var fuelType = await carRepository.GetFuelAsync(createCarDto.FuelTypeId);
            var gearboxType = await carRepository.GetGearboxAsync(createCarDto.GearboxTypeId);
            var model = await carRepository.GetModelAsync(createCarDto.ModelId);
            var shop = await shopRepository.GetAsync(createCarDto.ShopId);

            if (bodyType == null || fuelType == null || gearboxType == null || model == null || shop == null)
            {
                return BadRequest();
            }

            var car = new Car
            {
                FirstRegistration = createCarDto.FirstRegistration,
                Mileage = createCarDto.Mileage,
                Engine = createCarDto.Engine,
                Power = createCarDto.Power,
                Body = bodyType,
                Fuel = fuelType,
                Gearbox = gearboxType,
                Model = model,
                Shop = shop
            };

            await carRepository.CreateAsync(car);

            return CreatedAtAction("GetCar", new { shopId = shop!.Id, carId = car.Id }, mapper.Map<CarDto>(car));
        }

        // DELETE: api/shops/{shopId}/Cars/5
        [HttpDelete("{carId}")]
        public async Task<IActionResult> DeleteCar(int shopId, int carId)
        {
            var car = await carRepository.GetAsync(shopId, carId);

            if (car == null)
            {
                return NotFound();
            }

            await carRepository.DeleteAsync(car);

            return Ok();
        }
    }
}
