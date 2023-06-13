namespace Project_WebAPI.Models
{
    public class Aired
    {
        public string from { get; set; }
        public string to { get; set; }
        public Prop prop { get; set; }
    }

    public class Broadcast
    {
        public string day { get; set; }
        public string time { get; set; }
        public string timezone { get; set; }
        public string @string { get; set; }
    }

    public class Anime
    {
        [MongoDB.Bson.Serialization.Attributes.BsonId]
        public Nullable<int> mal_id { get; set; }
        public string url { get; set; }
        public Images images { get; set; }
        public Trailer trailer { get; set; }
        public bool approved { get; set; }
        public List<Title> titles { get; set; }
        public string title { get; set; }
        public string title_english { get; set; }
        public string title_japanese { get; set; }
        public List<string> title_synonyms { get; set; }
        public string type { get; set; }
        public string source { get; set; }
        public Nullable<int> episodes { get; set; }
        public string status { get; set; }
        public bool airing { get; set; }
        public Aired aired { get; set; }
        public string duration { get; set; }
        public string rating { get; set; }
        public double score { get; set; }
        public Nullable<int> scored_by { get; set; }
        public Nullable<int> rank { get; set; }
        public Nullable<int> popularity { get; set; }
        public Nullable<int> members { get; set; }
        public Nullable<int> favorites { get; set; }
        public string synopsis { get; set; }
        public string background { get; set; }
        public string season { get; set; }
        Nullable<int> year { get; set; }
        public Broadcast broadcast { get; set; }
        public List<Producer> producers { get; set; }
        public List<Licensor> licensors { get; set; }
        public List<Studio> studios { get; set; }
        public List<Genre> genres { get; set; }
        public List<ExplicitGenre> explicit_genres { get; set; }
        public List<Theme> themes { get; set; }
        public List<Demographic> demographics { get; set; }
    }

    public class Demographic
    {
        public Nullable<int> mal_id { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string url { get; set; }
    }

    public class ExplicitGenre
    {
        public Nullable<int> mal_id { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string url { get; set; }
    }

    public class From
    {
        public Nullable<int> day { get; set; }
        public Nullable<int> month { get; set; }
        public Nullable<int> year { get; set; }
    }

    public class Genre
    {
        public Nullable<int> mal_id { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string url { get; set; }
    }

    public class Images
    {
        public Jpg jpg { get; set; }
        public Webp webp { get; set; }
    }

    public class Items
    {
        public Nullable<int> count { get; set; }
        public Nullable<int> total { get; set; }
        public Nullable<int> per_page { get; set; }
    }

    public class Jpg
    {
        public string image_url { get; set; }
        public string small_image_url { get; set; }
        public string large_image_url { get; set; }
    }

    public class Licensor
    {
        public Nullable<int> mal_id { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string url { get; set; }
    }

    public class Pagination
    {
        public int last_visible_page { get; set; }
        public bool has_next_page { get; set; }
        public Items items { get; set; }
    }

    public class Producer
    {
        public Nullable<int> mal_id { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string url { get; set; }
    }

    public class Prop
    {
        public From from { get; set; }
        public To to { get; set; }
        public string @string { get; set; }
    }

    public class RootAnime
    {
        public List<Anime> data { get; set; }
        public Pagination pagination { get; set; }
    }

    public class Studio
    {
        public Nullable<int> mal_id { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string url { get; set; }
    }

    public class Theme
    {
        public Nullable<int> mal_id { get; set; }
        public string type { get; set; }
        public string name { get; set; }
        public string url { get; set; }
    }

    public class Title
    {
        public string type { get; set; }
        public string title { get; set; }
    }

    public class To
    {
        public Nullable<int> day { get; set; }
        public Nullable<int> month { get; set; }
        public Nullable<int> year { get; set; }
    }

    public class Trailer
    {
        public string youtube_id { get; set; }
        public string url { get; set; }
        public string embed_url { get; set; }
    }

    public class Webp
    {
        public string image_url { get; set; }
        public string small_image_url { get; set; }
        public string large_image_url { get; set; }
    }


}
