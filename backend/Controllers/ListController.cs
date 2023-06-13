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
    [Route("api/list")]
    public class ListController: ControllerBase
    {
        MongoClient mongoClient;
        IMongoDatabase database;

        public ListController(IOptions<UserDatabaseConfiguration> settings)
        {
            mongoClient = new MongoClient(settings.Value.ConnectionString);
            database = mongoClient.GetDatabase(settings.Value.DatabaseName);
        }

        [HttpPost]
        [Route("get/all")]
        public async Task<IActionResult> GetAll([FromBody] LoginResponse user)
        {   
            var user_id = user.UserId;
            var collection = database.GetCollection<List>("list");
            var filter = Builders<List>.Filter.Eq("user_id", user_id);
            var result = await collection.Find(filter).FirstOrDefaultAsync();
            if (result == null){
                var list = new List();
                list.user_id = user_id;
                await collection.InsertOneAsync(list);
                var watched = list.watched;
                var planned = list.planned;
                var concat = watched.Concat(planned);
                return Ok(concat);
            }else{
                var watched = result.watched;
                var planned = result.planned;
                var concat = watched.Concat(planned);
                return Ok(concat);
            }   
        }

        [HttpPost]
        [Route("get/planned")]
        public async Task<IActionResult> GetPlanned([FromBody] LoginResponse user)
        {
            var user_id = user.UserId;
            var collection = database.GetCollection<List>("list");
            var filter = Builders<List>.Filter.Eq("user_id", user_id);
            var result = await collection.Find(filter).FirstOrDefaultAsync();
            if (result == null){
                var list = new List();
                list.user_id = user_id;
                await collection.InsertOneAsync(list);
                return Ok(list.planned);
            }else{
                return Ok(result.planned);
            }   
        }

        [HttpPost]
        [Route("get/watched")]
        public async Task<IActionResult> GetWatched([FromBody] LoginResponse user)
        {
            var user_id = user.UserId;
            var collection = database.GetCollection<List>("list");
            var filter = Builders<List>.Filter.Eq("user_id", user_id);
            var result = await collection.Find(filter).FirstOrDefaultAsync();
            if (result == null){
                var list = new List();
                list.user_id = user_id;
                await collection.InsertOneAsync(list);
                return Ok(list.watched);
            }else{
                return Ok(result.watched);
            }   
        }

        [HttpPost]
        [Route("add/planned")]
        public async Task<IActionResult> AddPlanned(string user_id, [FromBody] GenreResponse subject)
        {
            var collection = database.GetCollection<List>("list");
            var filter = Builders<List>.Filter.Eq("user_id", user_id);
            var result = await collection.Find(filter).FirstOrDefaultAsync();
            if (result == null){
                var list = new List();
                list.user_id = user_id;
                list.planned.Add(subject);
                await collection.InsertOneAsync(list);
                return Ok(list.planned);
            }else{
                result.planned.Add(subject);
                await collection.ReplaceOneAsync(filter, result);
                return Ok(result.planned);
            }   
        }

        [HttpPost]
        [Route("add/watched")]
        public async Task<IActionResult> AddWatched(string user_id, [FromBody] GenreResponse subject)
        {
            var collection = database.GetCollection<List>("list");
            var filter = Builders<List>.Filter.Eq("user_id", user_id);
            var result = await collection.Find(filter).FirstOrDefaultAsync();
            if (result == null){
                var list = new List();
                list.user_id = user_id;
                list.watched.Add(subject);
                await collection.InsertOneAsync(list);
                return Ok(list.watched);
            }else{
                result.watched.Add(subject);
                await collection.ReplaceOneAsync(filter, result);
                return Ok(result.watched);
            }   
        }

        [HttpDelete]
        [Route("delete/planned")]
        public async Task<IActionResult> DeletePlanned(string user_id, [FromBody] GenreResponse subject)
        {
            var collection = database.GetCollection<List>("list");
            var filter = Builders<List>.Filter.Eq("user_id", user_id);
            var result = await collection.Find(filter).FirstOrDefaultAsync();
            if (result == null){
                var list = new List();
                list.user_id = user_id;
                await collection.InsertOneAsync(list);
                return Ok(list.planned);
            }else{
                result.planned.Remove(subject);
                await collection.ReplaceOneAsync(filter, result);
                return Ok(result.planned);
            }   
        }

        [HttpDelete]
        [Route("delete/watched")]
        public async Task<IActionResult> DeleteWatched(string user_id, [FromBody] GenreResponse subject)
        {
            var collection = database.GetCollection<List>("list");
            var filter = Builders<List>.Filter.Eq("user_id", user_id);
            var result = await collection.Find(filter).FirstOrDefaultAsync();
            if (result == null){
                var list = new List();
                list.user_id = user_id;
                await collection.InsertOneAsync(list);
                return Ok(list.watched);
            }else{
                result.watched.Remove(subject);
                await collection.ReplaceOneAsync(filter, result);
                return Ok(result.watched);
            }   
        }

    }
}