namespace AdsWebsiteAPI.Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public bool IsAdmin { get; set; }
    }
}
