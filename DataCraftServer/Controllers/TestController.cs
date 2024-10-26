using Dapper;
using DataCraftServer.AppContext;
using DataCraftServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;

namespace DataCraftServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : Controller
    {
        [HttpGet]
        public async Task<IActionResult> GetAboba()
        {
            var users = new List<User>();
            
            using (IDbConnection db = new NpgsqlConnection(DbConnection.ConnectionString))
            {//\"{EntityName}\"
                var usersDb =  await db.QueryAsync<User>("Select * from \"Users\"");
                users = usersDb.ToList<User>();
            }
            
            return Ok(users);
        }

        [HttpPost]
        public IActionResult PostAboba([FromForm] IFormFile file)
        {
            Console.WriteLine(Request.ContentType);
            Console.WriteLine(Request.Form.Files.ToArray().Length);
            var file0 = Request.Form.Files[0];
            Console.WriteLine(file0.FileName);
            var respObj = Json(new DataCraftServer.Models.Tag()
            {
                Id = 1, Value = "FRONT"
            });
            return Ok(respObj);
        }
    }
}
