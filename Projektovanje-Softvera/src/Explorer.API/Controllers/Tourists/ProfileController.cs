using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Infrastructure.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Explorer.API.Controllers.Tourists;

[Authorize(Policy = "touristPolicy")]
[Route("api/tourist/profile")]
[ApiController]
public class ProfileController : ControllerBase
{
    private readonly IProfileService _profileService;

    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpGet]
    public ActionResult<ProfileDto> Get()
    {
        var personId = User.PersonId();
        var result = _profileService.GetForCurrentTourist(personId);
        return Ok(result);
    }

    [HttpPut]
    public ActionResult<ProfileDto> Update([FromBody] ProfileDto dto)
    {
        try
        {
            var personId = User.PersonId();
            var result = _profileService.UpdateForCurrentTourist(personId, dto);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
