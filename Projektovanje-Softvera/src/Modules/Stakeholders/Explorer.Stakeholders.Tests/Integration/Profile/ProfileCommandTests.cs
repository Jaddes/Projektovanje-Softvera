using System.Linq;
using Explorer.API.Controllers.Author;
using Explorer.API.Controllers.Tourist;
using Explorer.BuildingBlocks.Core.Exceptions;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Infrastructure.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;

namespace Explorer.Stakeholders.Tests.Integration.Profile;

[Collection("Sequential")]
public class ProfileCommandTests : BaseStakeholdersIntegrationTest
{
    public ProfileCommandTests(StakeholdersTestFactory factory) : base(factory) { }

    [Fact]
    public void Gets_existing_profile_for_tourist()
    {
        using var scope = Factory.Services.CreateScope();
        var controller = CreateTouristController(scope);

        var result = (OkObjectResult)controller.Get().Result!;
        var dto = result.Value as ProfileDto;

        dto.ShouldNotBeNull();
        dto.Name.ShouldBe("Pera");
        dto.Surname.ShouldBe("Perić");
        dto.Biography.ShouldBe("Planinar i ljubitelj prirode.");
        dto.Motto.ShouldBe("Carpe diem");
    }

    [Fact]
    public void Updates_profile_for_tourist()
    {
        using var scope = Factory.Services.CreateScope();
        var controller = CreateTouristController(scope);
        var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();
        var updated = new ProfileDto
        {
            Name = "Petar",
            Surname = "Petrović",
            Biography = "Volim planinarenje i nove izazove.",
            Motto = "Uvek spreman",
            ProfilePictureUrl = "http://example.com/petar.jpg"
        };

        var result = (OkObjectResult)controller.Update(updated).Result!;
        var dto = result.Value as ProfileDto;

        dto.ShouldNotBeNull();
        dto.Name.ShouldBe(updated.Name);
        dto.Surname.ShouldBe(updated.Surname);
        dto.Biography.ShouldBe(updated.Biography);
        dto.Motto.ShouldBe(updated.Motto);
        dto.ProfilePictureUrl.ShouldBe(updated.ProfilePictureUrl);

        var stored = dbContext.Profiles.First(p => p.PersonId == -21);
        stored.Name.ShouldBe(updated.Name);
        stored.Surname.ShouldBe(updated.Surname);
        stored.Biography.ShouldBe(updated.Biography);
        stored.Motto.ShouldBe(updated.Motto);
        stored.ProfilePictureUrl.ShouldBe(updated.ProfilePictureUrl);
    }

    [Fact]
    public void Creates_profile_for_author_if_missing()
    {
        using var scope = Factory.Services.CreateScope();
        var controller = CreateAuthorController(scope);
        var dbContext = scope.ServiceProvider.GetRequiredService<StakeholdersContext>();

        var result = (OkObjectResult)controller.Get().Result!;
        var dto = result.Value as ProfileDto;

        dto.ShouldNotBeNull();
        dto.Name.ShouldBe("Ana");
        dto.Surname.ShouldBe("Anić");

        var stored = dbContext.Profiles.FirstOrDefault(p => p.PersonId == -11);
        stored.ShouldNotBeNull();
        stored!.Name.ShouldBe("Ana");
        stored.Surname.ShouldBe("Anić");
    }

    [Fact]
    public void Update_profile_fails_for_invalid_data()
    {
        using var scope = Factory.Services.CreateScope();
        var controller = CreateTouristController(scope);

        var invalid = new ProfileDto
        {
            Name = string.Empty,
            Surname = "Perić"
        };

        Should.Throw<EntityValidationException>(() => controller.Update(invalid));
    }

    private static Tourist.ProfileController CreateTouristController(IServiceScope scope)
    {
        return new Tourist.ProfileController(scope.ServiceProvider.GetRequiredService<IProfileService>())
        {
            ControllerContext = BuildContext("-21")
        };
    }

    private static Author.ProfileController CreateAuthorController(IServiceScope scope)
    {
        return new Author.ProfileController(scope.ServiceProvider.GetRequiredService<IProfileService>())
        {
            ControllerContext = BuildContext("-11")
        };
    }
}
