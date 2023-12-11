using AdsWebsiteAPI.Auth.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace AdsWebsiteAPI.Auth
{
    public class ResourceOwnerAuthorizationHandler : AuthorizationHandler<ResourceOwnerRequirement, IUserOwnedResource>
    {
        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context, 
            ResourceOwnerRequirement requirement,
            IUserOwnedResource resource)
        {
            if (context.User.IsInRole(AdsWebsiteRoles.Admin) ||
                context.User.FindFirstValue(JwtRegisteredClaimNames.Sub) == resource.UserId)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }

    public record ResourceOwnerRequirement : IAuthorizationRequirement;
}
