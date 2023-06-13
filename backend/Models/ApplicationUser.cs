using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Driver;
using MongoDbGenericRepository.Attributes;

namespace WebAPI.Models
{
    [CollectionName("users")]
    public class ApplicationUser: MongoIdentityUser<Guid>
    {
        public string FullName { get; set; }
    }
}
