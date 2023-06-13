using Microsoft.AspNetCore.Mvc;
using RestSharp;
using ZstdSharp.Unsafe;
using Project_WebAPI.Models;
using Newtonsoft.Json;
using MongoDB.Driver;
using System.Xml;
using MongoDB.Bson;
using System.Xml.Serialization;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using WebAPI.DTOs;

namespace Project_WebAPI.Controllers
{
    [ApiController]
    [Route("api/movies")]
    public class MovieController : ControllerBase
    {
        MongoClient mongoClient;
        IMongoDatabase database;

        public MovieController(IOptions<UserDatabaseConfiguration> settings)
        {
            mongoClient = new MongoClient(settings.Value.ConnectionString);
            database = mongoClient.GetDatabase(settings.Value.DatabaseName);
        }
        
        [Authorize]
        [HttpGet]
        [Route("top_api")]
        public async Task<IActionResult> GetTop250_API()
        {
            var uri = "https://moviesdatabase.p.rapidapi.com/titles?list=top_rated_250&info=base_info&page=";
            var request = new RestRequest("", Method.Get);
            request.AddHeader("X-RapidAPI-Key", "c9560836dfmsha01b265259d902dp1423f9jsn96aae854499a");
            request.AddHeader("X-RapidAPI-Host", "moviesdatabase.p.rapidapi.com");
            MovieRoot items;
            Dictionary<string, int> genres = new Dictionary<string, int>();
            List<Movie> movies = new List<Movie>();
            int i = 1;
            do
            {
                var url = uri + i;
                var client = new RestClient(url);
                var response = (RestResponse)client.Execute(request);
                items = JsonConvert.DeserializeObject<MovieRoot>(response.Content);
                foreach (var item in items.results)
                {
                    if (!genres.ContainsKey(item.genres.genres[0].text))
                        genres.Add(item.genres.genres[0].text, 1);
                    else
                        genres[item.genres.genres[0].text] += 1;

                    movies.Add(item);
                }
                i++;
            } while (items.next != null);

            List<Genres> genresList = new List<Genres>();
            foreach (var item in genres)
            {
                genresList.Add(new Genres { name = item.Key, value = item.Value });
            }

            movies.Sort((x, y) => x.position.Value.CompareTo(y.position.Value));
            //MongoClient mongoClient = new MongoClient(settings.MongoDB.ConnectionString);
            //var database = mongoClient.GetDatabase(settings.MongoDB.DatabaseName);
            var movie_collection = database.GetCollection<Movie>("movies");
            await movie_collection.DeleteManyAsync(x => true);
            await movie_collection.InsertManyAsync(movies);

            var genres_collection = database.GetCollection<Genres>("top_genres");
            await genres_collection.DeleteManyAsync(x => true);
            await genres_collection.InsertManyAsync(genresList);


            return Ok(genresList);
        }

        [HttpGet]
        [Route("top_db")]
        public async Task<IActionResult> GetTop250_Db()
        {
            // MongoClient mongoClient = new MongoClient(settings.MongoDB.ConnectionString);
            // var database = mongoClient.GetDatabase(settings.MongoDB.DatabaseName);
            var collection = database.GetCollection<Genres>("top_genres");
            var genres = await collection.Find(x => true).ToListAsync();


            return Ok(genres);
        }

        [HttpGet]
        [Route("movies-by-genre")]
        public async Task<IActionResult> GetMoviesByGenre(string genre)
        {
            var collection = database.GetCollection<Movie>("movies");
            //var moviesCollection = await collection.Find(x => x.genres.genres[0].text == genre).ToListAsync();
            //check all genres in movie
            var moviesCollection = await collection.Find(x => x.genres.genres.Any(x => x.text == genre)).ToListAsync();

            var movies = new List<GenreResponse>();

            foreach (var item in moviesCollection)
            {
                movies.Add(new GenreResponse
                {
                    id = item.id,
                    url = item.primaryImage.url,
                    tittle = item.titleText.text,
                    year = item.releaseYear.year.ToString(),
                    genre = genre
                });
            }

            return Ok(movies);
        }

        [HttpGet]
        [Route("top3")]
        public async Task<IActionResult> GetTop3()
        {
            // MongoClient mongoClient = new MongoClient(settings.MongoDB.ConnectionString);
            // var database = mongoClient.GetDatabase(settings.MongoDB.DatabaseName);
            var collection = database.GetCollection<Movie>("movies");
            var movies = await collection.Find(x => true).ToListAsync();

            movies.Sort((x, y) => x.position.Value.CompareTo(y.position.Value));

            var moviesList = new List<GenreResponse>();

            for (int i = 0; i < 3; i++)
            {
                moviesList.Add(new GenreResponse
                {
                    id = movies[i].id,
                    url = movies[i].primaryImage.url,
                    tittle = movies[i].titleText.text,
                    year = movies[i].releaseYear.year.ToString(),
                    genre = movies[i].genres.genres[0].text
                });
            }

            return Ok(moviesList);
        }

        public class MoviesList
        {
            public List<Movie> movies { get; set; } = new List<Movie>();
        }

        public sealed class Utf8StringWriter : StringWriter
        {
            public override Encoding Encoding => Encoding.UTF8;
        }

        [Authorize]
        [HttpGet]
        [Route("getXML")]
        public IActionResult GetXML()
        {
            // MongoClient mongoClient = new MongoClient(settings.MongoDB.ConnectionString);
            // var database = mongoClient.GetDatabase(settings.MongoDB.DatabaseName);
            var collection = database.GetCollection<Movie>("movies");
            var movies = collection.Find(x => true).ToList();

            var moviesList = new MoviesList();
            moviesList.movies = movies;

            var x = new XmlSerializer(typeof(MoviesList));

            string xml;
            using (var sww = new Utf8StringWriter())
            {
                using (XmlWriter writer = XmlWriter.Create(sww))
                {
                    x.Serialize(writer, moviesList);
                    xml = sww.ToString(); // Your XML
                }
            }

            return Ok(xml);
        }

        [Authorize]
        [HttpPost]
        [Route("addXML")]
        public async Task<IActionResult> AddXML(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("error with file upload");

            var movieList = new MoviesList();
            var serializer = new XmlSerializer(typeof(MoviesList));
            using (var reader = new XmlTextReader(file.OpenReadStream()))
            {
                movieList = (MoviesList)serializer.Deserialize(reader);
            }

            // MongoClient mongoClient = new MongoClient(settings.MongoDB.ConnectionString);
            // var database = mongoClient.GetDatabase(settings.MongoDB.DatabaseName);
            var movie_collection = database.GetCollection<Movie>("movies");
            await movie_collection.DeleteManyAsync(x => true);
            await movie_collection.InsertManyAsync(movieList.movies);


            return Ok();
        }
    }
}
