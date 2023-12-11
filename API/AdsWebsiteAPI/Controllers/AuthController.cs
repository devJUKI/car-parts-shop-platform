using AdsWebsiteAPI.Auth;
using AdsWebsiteAPI.Auth.Entities;
using AdsWebsiteAPI.Auth.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.Data;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

namespace AdsWebsiteAPI.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<AdsWebsiteUser> userManager;
        private readonly IJwtTokenService jwtTokenService;
        private readonly IMapper mapper;

        public AuthController(UserManager<AdsWebsiteUser> userManager, IJwtTokenService jwtTokenService, IMapper mapper)
        {
            this.userManager = userManager;
            this.jwtTokenService = jwtTokenService;
            this.mapper = mapper;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(RegisterUserDto registerUserDto)
        {
            var user = await userManager.FindByEmailAsync(registerUserDto.Email);

            if (user != null)
            {
                return Conflict("User with that email already exists.");
            }

            var newUser = new AdsWebsiteUser
            {
                Firstname = registerUserDto.Firstname,
                Lastname = registerUserDto.Lastname,
                PhoneNumber = registerUserDto.PhoneNumber,
                Email = registerUserDto.Email,
                UserName = registerUserDto.Email
            };

            var createUserResult = await userManager.CreateAsync(newUser, registerUserDto.Password);

            if (!createUserResult.Succeeded)
            {
                string errors = string.Join('\n', createUserResult.Errors.Select(e => $"[{e.Code}] {e.Description}"));
                return BadRequest("Could not create a user.\n" + errors);
            }

            await userManager.AddToRoleAsync(newUser, AdsWebsiteRoles.AdsWebsiteUser);

            var accessToken = jwtTokenService.CreateAccessToken(newUser.Email, newUser.Id, new string[] { AdsWebsiteRoles.AdsWebsiteUser });
            var userDto = mapper.Map<UserDto>(newUser);
            var registerResponse = new SuccessfulRegisterDto(userDto, accessToken);

            return CreatedAtAction(nameof(Register), registerResponse);
        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
            {
                return BadRequest("User name or password is invalid.");
            }

            var isPasswordValid = await userManager.CheckPasswordAsync(user, loginDto.Password);

            if (!isPasswordValid)
            {
                return BadRequest("User name or password is invalid.");
            }

            var userDto = mapper.Map<UserDto>(user);
            var roles = await userManager.GetRolesAsync(user);
            var accessToken = jwtTokenService.CreateAccessToken(user.Email, user.Id, roles);

            return Ok(new SuccessfulLoginDto(userDto, accessToken));
        }

        [HttpGet]
        [Route("GetUser")]
        [Authorize(Roles = AdsWebsiteRoles.AdsWebsiteUser)]
        public async Task<ActionResult> GetUser()
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var user = await userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return BadRequest("User was not found");
            }

            return Ok(mapper.Map<UserDto>(user));
        }
    }
}
