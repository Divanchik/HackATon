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
        private readonly IPostgreSQLService _postgreSQLService;
        public TestController(IPostgreSQLService postgreSQLService)
        {
            _postgreSQLService = postgreSQLService;
        }

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

            var data = new Dictionary<string, List<string>>();

            foreach (var file in files)
            {
                if (file.ContentType == "text/csv" || file.ContentType == "application/vnd.ms-excel")
                {
                    using var stream = file.OpenReadStream();

                    var csvService = new CSVService();
                    data = csvService.ReadCsvColumns(stream);
                    await _postgreSQLService.CreateTableWithColumnsFromCsv(file.FileName.Replace(".csv", ""), data);

                    var entryCount = data[data.Keys.First()].Count;
                    var dbName = file.FileName.Replace(".csv", "");
                    using (IDbConnection db = new NpgsqlConnection(DbConnection.ConnectionString))
                    {
                        var query = $"INSERT INTO \"{dbName}\" VALUES(";
                        for (int i=0;i<entryCount;i++)
                        {
                            foreach (string col in data.Keys)
                            {
                                if (_postgreSQLService.DetermineDataType(data[col][i]) == "TEXT")
                                    query += $"\'{data[col][i]}\',";
                                else if (_postgreSQLService.DetermineDataType(data[col][i]) == "TIMESTAMP")
                                    query += $"timestamp \'{data[col][i]}\',";
                                else if (data[col][i] == "")
                                    query += $"NULL,";
                                else
                                    query += data[col][i] + ",";
                            }
                            query = query.Remove(query.Length - 1) + "),(";
                        }
                        query = query.Remove(query.Length-2) + ";";
                        Console.WriteLine(query);
                        db.Execute(query);
                    }
                }
            }
            

            return Ok(data.Take(2));
        }
    }
}
