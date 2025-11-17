using System.Collections.Generic;
using AutoMapper;
using Explorer.Stakeholders.API.Dtos;
using Explorer.Stakeholders.API.Public;
using Explorer.Stakeholders.Core.Domain;
using Explorer.Stakeholders.Core.Domain.RepositoryInterfaces;
using ProfileEntity = Explorer.Stakeholders.Core.Domain.Profile;

namespace Explorer.Stakeholders.Core.UseCases;

public class ProfileService : IProfileService
{
    private readonly IProfileRepository _profileRepository;
    private readonly IPersonRepository _personRepository;
    private readonly IMapper _mapper;

    public ProfileService(IProfileRepository profileRepository, IPersonRepository personRepository, IMapper mapper)
    {
        _profileRepository = profileRepository;
        _personRepository = personRepository;
        _mapper = mapper;
    }

    public ProfileDto GetForCurrentTourist(long personId)
    {
        var profile = EnsureProfileExists(personId);
        return _mapper.Map<ProfileDto>(profile);
    }

    public ProfileDto UpdateForCurrentTourist(long personId, ProfileDto profileDto)
    {
        var profile = EnsureProfileExists(personId);
        profile.Update(profileDto.Name, profileDto.Surname, profileDto.Biography, profileDto.Motto, profileDto.ProfilePictureUrl);
        _profileRepository.Update(profile);
        return _mapper.Map<ProfileDto>(profile);
    }

    private ProfileEntity EnsureProfileExists(long personId)
    {
        var profile = _profileRepository.GetByPersonId(personId);
        if (profile != null) return profile;

        var person = _personRepository.Get(personId) ?? throw new KeyNotFoundException("Person not found.");
        var newProfile = new ProfileEntity(person.Name, person.Surname, person.Id, null, null, null);
        return _profileRepository.Create(newProfile);
    }

    public ProfileDto GetForCurrentAuthor(long personId)
    {
        var profile = EnsureProfileExists(personId);
        return _mapper.Map<ProfileDto>(profile);
    }

    public ProfileDto UpdateForCurrentAuthor(long personId, ProfileDto profileDto)
    {
        var profile = EnsureProfileExists(personId);
        profile.Update(profileDto.Name, profileDto.Surname, profileDto.Biography, profileDto.Motto, profileDto.ProfilePictureUrl);
        _profileRepository.Update(profile);
        return _mapper.Map<ProfileDto>(profile);
    }

}