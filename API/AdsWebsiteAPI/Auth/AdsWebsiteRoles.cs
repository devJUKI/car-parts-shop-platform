namespace AdsWebsiteAPI.Auth
{
    public static class AdsWebsiteRoles
    {
        public const string Admin = nameof(Admin);
        public const string AdsWebsiteUser = nameof(AdsWebsiteUser);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, AdsWebsiteUser };
    }
}
