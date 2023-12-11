using AutoMapper;
using AdsWebsiteAPI.Data.Dtos;
using AdsWebsiteAPI.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AdsWebsiteAPI.Controllers;

[Route("api/CarData")]
public class CarDataController : ControllerBase
{
    private readonly ICarRepository carRepository;
    private readonly IMapper mapper;

    public CarDataController(ICarRepository carRepository, IMapper mapper)
    {
        this.carRepository = carRepository;
        this.mapper = mapper;
    }

    // GET: api/CarData/Makes
    [HttpGet("Makes")]
    public async Task<ActionResult<IEnumerable<MakeDto>>> GetMakes()
    {
        var makes = await carRepository.GetAllMakesAsync();
        return Ok(makes.Select(m => mapper.Map<MakeDto>(m)));
    }

    // GET: api/CarData/Models
    [HttpGet("Models")]
    public async Task<ActionResult<IEnumerable<ModelDto>>> GetModels(int makeId)
    {
        var models = await carRepository.GetAllModelsAsync(makeId);
        return Ok(models.Select(m => mapper.Map<ModelDto>(m)));
    }

    [HttpGet("Fuels")]
    public async Task<ActionResult<IEnumerable<MakeDto>>> GetFuelTypes()
    {
        var fuels = await carRepository.GetAllFuelsAsync();
        return Ok(fuels);
    }

    [HttpGet("Bodies")]
    public async Task<ActionResult<IEnumerable<MakeDto>>> GetBodyTypes()
    {
        var bodies = await carRepository.GetAllBodiesAsync();
        return Ok(bodies);
    }

    [HttpGet("Gearboxes")]
    public async Task<ActionResult<IEnumerable<MakeDto>>> GetGearboxTypes()
    {
        var gearboxes = await carRepository.GetAllGearboxesAsync();
        return Ok(gearboxes);
    }
}
