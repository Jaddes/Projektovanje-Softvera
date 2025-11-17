namespace Explorer.Stakeholders.API.Dtos;

public class ProfileDto
{
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string? Biography { get; set; }
    public string? Motto { get; set; }
    public string? ProfilePictureUrl { get; set; }
}
