using Microsoft.AspNetCore.Mvc;
using AdsWebsiteAPI.Data.Entities;
using AdsWebsiteAPI.Interfaces;
using AdsWebsiteAPI.Data.Dtos;
using AutoMapper;

namespace AdsWebsiteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly IShopRepository shopRepository;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public ShopsController(IShopRepository shopRepository, IUserRepository userRepository, IMapper mapper)
        {
            this.shopRepository = shopRepository;
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        // GET: api/Shops
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShopDto>>> GetShops()
        {
            var shops = await shopRepository.GetAllAsync();
            return Ok(shops.Select(s => mapper.Map<ShopDto>(s)));
        }

        // GET: api/Shops/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShopDto>> GetShop(int id)
        {
            var shop = await shopRepository.GetAsync(id);
            
            if (shop == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<ShopDto>(shop));
        }

        // PUT: api/Shops/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<ShopDto>> PutShop(int id, UpdateShopDto updateShopDto)
        {
            if (id != updateShopDto.Id)
            {
                return BadRequest();
            }

            var shop = await shopRepository.GetAsync(id);

            if (shop == null)
            {
                return NotFound();
            }

            shop.Name = updateShopDto.Name;
            shop.Location = updateShopDto.Location;

            await shopRepository.UpdateAsync(shop);

            return Ok(mapper.Map<ShopDto>(shop));
        }

        // POST: api/Shops
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ShopDto>> PostShop(CreateShopDto createShopDto)
        {
            var owner = await userRepository.GetAsync(createShopDto.OwnerId);

            if (owner == null)
            {
                return BadRequest();
            }

            var shop = new Shop
            {
                Name = createShopDto.Name,
                Location = createShopDto.Location,
                Owner = owner
            };

            await shopRepository.CreateAsync(shop);

            return CreatedAtAction("GetShop", new { id = shop.Id }, mapper.Map<ShopDto>(shop));
        }

        // DELETE: api/Shops/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShop(int id)
        {
            var shop = await shopRepository.GetAsync(id);

            if (shop == null)
            {
                return NotFound();
            }

            await shopRepository.DeleteAsync(shop);

            return Ok();
        }
    }
}
