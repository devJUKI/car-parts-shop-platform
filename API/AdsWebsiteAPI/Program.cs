using AdsWebsiteAPI.Data;
using AdsWebsiteAPI.Data.Repositories;
using AdsWebsiteAPI.Interfaces;
using Microsoft.AspNetCore.Hosting;
using System.Diagnostics;

namespace AdsWebsiteAPI;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddDbContext<AdsWebsiteDbContext>();
        builder.Services.AddAutoMapper(typeof(Program));
        builder.Services.AddTransient<IShopRepository, ShopRepository>();
        builder.Services.AddTransient<ICarRepository, CarRepository>();
        builder.Services.AddTransient<IUserRepository, UserRepository>();
        builder.Services.AddTransient<IPartRepository, PartRepository>();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
