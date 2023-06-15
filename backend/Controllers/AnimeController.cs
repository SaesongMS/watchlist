using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using MongoDB.Driver;
using Newtonsoft.Json;
using Project_WebAPI.Models;
using RestSharp;
using System.Text;
using System.Xml.Linq;
using System.Xml.Serialization;
using System.Xml;
using WebAPI.DTOs;

namespace Project_WebAPI.Controllers
{
    [ApiController]
    [Route("api/anime")]
    public class AnimeController : ControllerBase
    {
        MongoClient mongoClient;
        IMongoDatabase database;

        public AnimeController(IOptions<UserDatabaseConfiguration> settings)
        {
            mongoClient = new MongoClient(settings.Value.ConnectionString);
            database = mongoClient.GetDatabase(settings.Value.DatabaseName);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("top_api")]
        public async Task<IActionResult> GetTop100_API()
        {
            var uri = "https://api.jikan.moe/v4/top/anime?page=";
            var request = new RestRequest("", Method.Get);
            RootAnime items;
            Dictionary<string, int> genres = new Dictionary<string, int>();
            List<Anime> animes = new List<Anime>();
            for (int i = 1; i < 5; i++)
            {
                var url = uri + i;
                var client = new RestClient(url);
                var response = (RestResponse)client.Execute(request);
                items = JsonConvert.DeserializeObject<RootAnime>(response.Content);
                foreach (var item in items.data)
                {
                    if (!genres.ContainsKey(item.genres[0].name))
                        genres.Add(item.genres[0].name, 1);
                    else
                        genres[item.genres[0].name] += 1;
                    animes.Add(item);
                }
                if (i == 3)
                    Thread.Sleep(1000);
            }

            List<Genres> genresList = new List<Genres>();
            foreach (var item in genres)
            {
                genresList.Add(new Genres { name = item.Key, value = item.Value });
            }

            animes.Sort((x, y) => x.rank.Value.CompareTo(y.rank.Value));

            var anime_collection = database.GetCollection<Anime>("animes");
            await anime_collection.DeleteManyAsync(x => true);
            await anime_collection.InsertManyAsync(animes);

            var genres_collection = database.GetCollection<Genres>("top_genres_anime");
            await genres_collection.DeleteManyAsync(x => true);
            await genres_collection.InsertManyAsync(genresList);

            return Ok(genresList);
        }

        [HttpGet]
        [Route("top_db")]
        public async Task<IActionResult> GetTop100_Db()
        {
            var collection = database.GetCollection<Genres>("top_genres_anime");
            var genres = await collection.Find(x => true).ToListAsync();


            return Ok(genres);
        }

        [HttpGet]
        [Route("animes-by-genre")]
        public async Task<IActionResult> GetAnimesByGenre(string genre)
        {
            var collection = database.GetCollection<Anime>("animes");
            var moviesCollection = collection.Find(x => x.genres[0].name == genre).ToList();

            var movies = new List<GenreResponse>();

            foreach (var item in moviesCollection)
            {
                movies.Add(new GenreResponse
                {
                    id = item.mal_id.ToString(),
                    url = item.images.jpg.image_url,
                    tittle = item.title,
                    year = item.aired.from.Substring(0, 4),
                    genre = genre
                });
            }

            return Ok(movies);
        }

        [HttpGet]
        [Route("top3")]
        public async Task<IActionResult> GetTop3()
        {
            var collection = database.GetCollection<Anime>("animes");
            var animes = await collection.Find(x => true).ToListAsync();

            animes.Sort((x, y) => x.rank.Value.CompareTo(y.rank.Value));

            var top3 = new List<GenreResponse>();
            for (int i = 0; i < 3; i++)
            {
                top3.Add(new GenreResponse
                {
                    id = animes[i].mal_id.ToString(),
                    url = animes[i].images.jpg.large_image_url,
                    tittle = animes[i].title,
                    year = animes[i].aired.from.Substring(0, 4),
                    genre = animes[i].genres[0].name
                });
            }

            return Ok(top3);
        }

        public class animesList
        {
            public List<Anime> animes { get; set; } = new List<Anime>();
        }

        public sealed class Utf8StringWriter : StringWriter
        {
            public override Encoding Encoding => Encoding.UTF8;
        }

        [Authorize (Roles = "Admin")]
        [HttpGet]
        [Route("getXML")]
        public IActionResult GetXML()
        {
            ;
            var collection = database.GetCollection<Anime>("anmes");
            var animes = collection.Find(x => true).ToList();

            var animesList = new animesList();
            animesList.animes = animes;

            var x = new XmlSerializer(typeof(animesList));

            string xml;
            using (var sww = new Utf8StringWriter())
            {
                using (XmlWriter writer = XmlWriter.Create(sww))
                {
                    x.Serialize(writer, animesList);
                    xml = sww.ToString(); // Your XML
                }
            }

            return Ok(xml);
        }

        [Authorize (Roles = "Admin")]
        [HttpPost]
        [Route("addXML")]
        public async Task<IActionResult> AddXML(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("error with file upload");

            var AnimeList = new animesList();
            var serializer = new XmlSerializer(typeof(animesList));
            using (var reader = new XmlTextReader(file.OpenReadStream()))
            {
                AnimeList = (animesList)serializer.Deserialize(reader);
            }

            var Anime_collection = database.GetCollection<Anime>("animes");
            await Anime_collection.DeleteManyAsync(x => true);
            await Anime_collection.InsertManyAsync(AnimeList.animes);


            return Ok();
        }

        [Authorize (Roles = "Admin")]
        [HttpGet]
        [Route("getJSON")]
        public async Task<IActionResult> GetJSON()
        {
            var collection = database.GetCollection<Anime>("animes");
            var animes = await collection.Find(x => true).ToListAsync();

            return Ok(animes);
        }

        [Authorize (Roles = "Admin")]
        [HttpPost]
        [Route("addJSON")]
        public async Task<IActionResult> AddJSON(IFormFile file)
        {
            Console.WriteLine("here");
            if (file == null || file.Length == 0)
                return BadRequest("error with file upload");

            var animes = new List<Anime>();
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                var json = await reader.ReadToEndAsync();
                animes = JsonConvert.DeserializeObject<List<Anime>>(json);
            }

            var Anime_collection = database.GetCollection<Anime>("animes");
            await Anime_collection.DeleteManyAsync(x => true);
            await Anime_collection.InsertManyAsync(animes);

            return Ok();
        }

    }
}
