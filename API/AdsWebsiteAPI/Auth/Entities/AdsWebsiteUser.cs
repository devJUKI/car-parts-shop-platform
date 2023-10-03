using Microsoft.AspNetCore.Identity;

namespace AdsWebsiteAPI.Auth.Entities
{
    public class AdsWebsiteUser : IdentityUser
    {
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
    }
}
