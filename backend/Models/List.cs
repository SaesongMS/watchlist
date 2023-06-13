using WebAPI.DTOs;

namespace Project_WebAPI.Models
{
    public class List
    {
        [MongoDB.Bson.Serialization.Attributes.BsonId]
        public string user_id { get; set; } = String.Empty;
        public List<GenreResponse> watched { get; set; } = new List<GenreResponse>();
        public List<GenreResponse> planned { get; set; } = new List<GenreResponse>();
    }
}