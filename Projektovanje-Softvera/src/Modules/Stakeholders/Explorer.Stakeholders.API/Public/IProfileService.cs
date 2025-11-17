using Explorer.Stakeholders.API.Dtos;

namespace Explorer.Stakeholders.API.Public;

public interface IProfileService
{
    ProfileDto GetForCurrentTourist(long personId);
    ProfileDto UpdateForCurrentTourist(long personId, ProfileDto profile);
    ProfileDto GetForCurrentAuthor(long personId);
    ProfileDto UpdateForCurrentAuthor(long personId, ProfileDto profile);
}
