using Microsoft.AspNetCore.Mvc;
using AdsWebsiteAPI.Data.Entities;
using AdsWebsiteAPI.Interfaces;
using AdsWebsiteAPI.Data.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using AdsWebsiteAPI.Auth;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using FluentValidation;

namespace AdsWebsiteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly IShopRepository shopRepository;
        private readonly IAuthorizationService authorizationService;
        private readonly IMapper mapper;

        public ShopsController(IShopRepository shopRepository, IAuthorizationService authorizationService, IMapper mapper)
        {
            this.shopRepository = shopRepository;
            this.authorizationService = authorizationService;
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

        // POST: api/Shops
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = AdsWebsiteRoles.AdsWebsiteUser)]
        public async Task<ActionResult<CreateShopResponseDto>> PostShop(
            CreateShopRequestDto createShopDto,
            [FromServices] IValidator<CreateShopRequestDto> validator)
        {
            var validationResults = await validator.ValidateAsync(createShopDto);

            if (validationResults.IsValid == false)
            {
                return BadRequest(validationResults.ToDictionary());
            }

            var existingShop = await shopRepository.GetAsync(createShopDto.Name);

            if (existingShop != null)
            {
                return Conflict();
            }

            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            var shop = new Shop
            {
                Name = createShopDto.Name,
                Location = createShopDto.Location,
                UserId = userId
            };

            await shopRepository.CreateAsync(shop);

            return CreatedAtAction("GetShop", new { id = shop.Id }, mapper.Map<CreateShopResponseDto>(shop));
        }

        // PUT: api/Shops/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<ShopDto>> PutShop(
            int id,
            UpdateShopRequestDto updateShopDto,
            [FromServices] IValidator<UpdateShopRequestDto> validator)
        {
            if (id != updateShopDto.Id)
            {
                return BadRequest();
            }

            var validationResults = await validator.ValidateAsync(updateShopDto);

            if (validationResults.IsValid == false)
            {
                return BadRequest(validationResults.ToDictionary());
            }

            var existingShop = await shopRepository.GetAsync(updateShopDto.Name);

            if (existingShop != null)
            {
                return Conflict();
            }

            var shop = await shopRepository.GetAsync(id);

            if (shop == null)
            {
                return NotFound();
            }

            var authorizationResult = await authorizationService.AuthorizeAsync(User, shop, PolicyNames.ResourceOwner);

            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            shop.Name = updateShopDto.Name;
            shop.Location = updateShopDto.Location;

            await shopRepository.UpdateAsync(shop);

            return Ok(mapper.Map<ShopDto>(shop));
        }

        // DELETE: api/Shops/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShop(int id)
        {
            // Delete everything associated with that shop (cars, parts, etc...) Cascade

            var shop = await shopRepository.GetAsync(id);

            if (shop == null)
            {
                return NotFound();
            }

            var authorizationResult = await authorizationService.AuthorizeAsync(User, shop, PolicyNames.ResourceOwner);

            if (!authorizationResult.Succeeded)
            {
                return Forbid();
            }

            await shopRepository.DeleteAsync(shop);

            return NoContent();
        }
    }
}
