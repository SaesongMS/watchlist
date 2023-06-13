using MongoDB.Bson;

namespace Project_WebAPI.Models
{
    public class UserDatabaseConfiguration
    {
        public string ConnectionString { get; set; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    
    }
}