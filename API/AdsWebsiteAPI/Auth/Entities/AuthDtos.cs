﻿using System.ComponentModel.DataAnnotations;

namespace AdsWebsiteAPI.Auth.Entities
{
    public record UserDto(string Id, string Firstname, string Lastname, string PhoneNumber, string Email);
    public record RegisterUserDto(string Firstname, string Lastname, string PhoneNumber, [EmailAddress][Required] string Email, [Required] string Password);
    public record LoginDto(string Email, string Password);
    public record SuccessfulLoginDto(string AccessToken);
}
