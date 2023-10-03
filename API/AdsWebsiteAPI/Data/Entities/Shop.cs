using AdsWebsiteAPI.Auth.Entities;
using AdsWebsiteAPI.Auth.Interfaces;

namespace AdsWebsiteAPI.Data.Entities
{
    public class Shop : IUserOwnedResource
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public string? UserId { get; set; }
        public AdsWebsiteUser? User { get; set; }
    }
}
