namespace Project_WebAPI.Models
{
    public class Genres
    {
        public MongoDB.Bson.ObjectId _id { get; set; }
        public string name { get; set; }
        public int value { get; set; }
    }
}
