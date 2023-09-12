﻿using AdsWebsiteAPI.Data.Entities;
using AdsWebsiteAPI.Interfaces;
using AdsWebsiteAPI.Data.Dtos;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace AdsWebsiteAPI.Controllers
{
    [Route("/api/shops/{shopId}/cars/{carId}/[controller]")]
    [ApiController]
    public class PartsController : ControllerBase
    {
        private readonly IPartRepository partRepository;
        private readonly IShopRepository shopRepository;
        private readonly ICarRepository carRepository;
        private readonly IMapper mapper;

        public PartsController(IPartRepository partRepository, ICarRepository carRepository, IShopRepository shopRepository, IMapper mapper)
        {
            this.partRepository = partRepository;
            this.shopRepository = shopRepository;
            this.carRepository = carRepository;
            this.mapper = mapper;
        }

        // GET: api/Parts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PartDto>>> GetParts(int shopId, int carId)
        {
            var parts = await partRepository.GetAllAsync(shopId, carId);
            return Ok(parts.Select(p => mapper.Map<PartDto>(p)));
        }

        //// GET: api/Parts/5
        [HttpGet("{partId}")]
        public async Task<ActionResult<PartDto>> GetPart(int shopId, int carId, int partId)
        {
            var part = await partRepository.GetAsync(shopId, carId, partId);

            if (part == null)
            {
                return NotFound();
            }

            return mapper.Map<PartDto>(part);
        }

        //// PUT: api/Parts/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{partId}")]
        public async Task<ActionResult<PartDto>> PutPart(int shopId, int carId, int partId, UpdatePartDto updatePartDto)
        {
            if (shopId != updatePartDto.ShopId || carId != updatePartDto.CarId || partId != updatePartDto.Id)
            {
                return BadRequest();
            }

            var part = await partRepository.GetAsync(shopId, carId, partId);

            if (part == null)
            {
                return NotFound();
            }

            var car = await carRepository.GetAsync(shopId, carId);

            part.Name = updatePartDto.Name;
            part.Price = updatePartDto.Price;
            part.Car = car;

            await partRepository.UpdateAsync(part);

            return Ok(mapper.Map<PartDto>(part));
        }

        //// POST: api/Parts
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PartDto>> PostPart(CreatePartDto createPartDto)
        {
            var shop = await shopRepository.GetAsync(createPartDto.ShopId);

            if (shop == null)
            {
                return BadRequest();
            }

            var car = await carRepository.GetAsync(createPartDto.ShopId, createPartDto.CarId);

            if (car == null)
            {
                return BadRequest();
            }

            var part = new Part
            {
                Name = createPartDto.Name,
                Price = createPartDto.Price,
                Car = car
            };

            return CreatedAtAction("GetPart", new { shopId = createPartDto.ShopId, carId = createPartDto.CarId, partId = part.Id }, mapper.Map<PartDto>(part));
        }

        //// DELETE: api/Parts/5
        [HttpDelete("{partId}")]
        public async Task<IActionResult> DeletePart(int shopId, int carId, int partId)
        {
            var part = await partRepository.GetAsync(shopId, carId, partId);

            if (part == null)
            {
                return NotFound();
            }

            await partRepository.DeleteAsync(part);

            return Ok();
        }
    }
}