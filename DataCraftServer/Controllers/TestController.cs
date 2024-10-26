using Dapper;
using DataCraftServer.AppContext;
using DataCraftServer.Models;
using DataCraftServer.Services;
using Microsoft.AspNetCore.Components.Forms;
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
        public async Task<IActionResult> PostAboba(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Файл не загружен.");

            foreach (var file in files)
            {
                if (file.ContentType == "text/csv")
                {
                    using var stream = file.OpenReadStream();

                    var csvService = new CSVService();
                    var data = await csvService.ParseCsvFile(stream);

                }
            }
            

            

            // Сохранение данных в базу
            // SaveToDatabase(data);

            return Ok("Файл успешно обработан и данные сохранены.");
        }
    }
}
