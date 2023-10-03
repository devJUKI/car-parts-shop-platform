using AdsWebsiteAPI.Auth;
using AdsWebsiteAPI.Auth.Entities;
using AdsWebsiteAPI.Auth.Interfaces;
using AdsWebsiteAPI.Auth.Services;
using AdsWebsiteAPI.Data;
using AdsWebsiteAPI.Data.Dtos;
using AdsWebsiteAPI.Data.Validation;
using AdsWebsiteAPI.Data.Repositories;
using AdsWebsiteAPI.Interfaces;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace AdsWebsiteAPI;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

        builder.Services.AddIdentity<AdsWebsiteUser, IdentityRole>()
            .AddEntityFrameworkStores<AdsWebsiteDbContext>()
            .AddDefaultTokenProviders();

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters.ValidAudience = builder.Configuration["JWT:ValidAudience"];
            options.TokenValidationParameters.ValidIssuer = builder.Configuration["JWT:ValidIssuer"];
            options.TokenValidationParameters.IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]));
        });

        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy(PolicyNames.ResourceOwner, policy => policy.Requirements.Add(new ResourceOwnerRequirement()));
        });

        // Add services to the container.

        builder.Services.AddControllers();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<AdsWebsiteDbContext>();
        builder.Services.AddAutoMapper(typeof(Program));
        builder.Services.AddScoped<AuthDbSeeder>();
        builder.Services.AddSingleton<IAuthorizationHandler, ResourceOwnerAuthorizationHandler>();

        builder.Services.AddTransient<IShopRepository, ShopRepository>();
        builder.Services.AddTransient<ICarRepository, CarRepository>();
        builder.Services.AddTransient<IPartRepository, PartRepository>();
        builder.Services.AddTransient<IJwtTokenService, JwtTokenService>();

        builder.Services.AddTransient<IValidator<CreateCarDto>, CreateCarDtoValidator>();
        builder.Services.AddTransient<IValidator<UpdateCarDto>, UpdateCarDtoValidator>();
        builder.Services.AddTransient<IValidator<CreatePartDto>, CreatePartDtoValidator>();
        builder.Services.AddTransient<IValidator<UpdatePartDto>, UpdatePartDtoValidator>();
        builder.Services.AddTransient<IValidator<CreateShopRequestDto>, CreateShopRequestDtoValidator>();
        builder.Services.AddTransient<IValidator<UpdateShopRequestDto>, UpdateShopRequestDtoValidator>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        using var scope = app.Services.CreateScope();
        var dbSeeder = scope.ServiceProvider.GetRequiredService<AuthDbSeeder>();
        await dbSeeder.SeedAsync();

        app.Run();
    }
}
