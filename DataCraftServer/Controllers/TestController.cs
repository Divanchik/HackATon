using Dapper;
using DataCraftServer.AppContext;
using DataCraftServer.Models;
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
        public IActionResult PostAboba(List<IFormFile> files)
        {
            long size = files.Sum(f => f.Length);
            return Ok(new { count = files.Count, size });
        }
    }
}
