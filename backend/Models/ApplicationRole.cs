using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Driver;
using MongoDbGenericRepository.Attributes;
using System.Runtime.Serialization;

namespace WebAPI.Models
{
    [CollectionName("roles")]
    public class ApplicationRole: MongoIdentityRole<Guid>
    {
        
    }
}
