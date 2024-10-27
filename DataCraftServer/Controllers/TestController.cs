using Dapper;
using DataCraftServer.AppContext;
using DataCraftServer.Models;
using DataCraftServer.Services;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using System.Text;

namespace DataCraftServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : Controller
    {
        private readonly IPostgreSQLService _postgreSQLService;
        private readonly ApplicationContext _appContext;
        public TestController(IPostgreSQLService postgreSQLService, ApplicationContext appContext)
        {
            _postgreSQLService = postgreSQLService;
            _appContext = appContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAboba()
        {
            var users = new List<User>();
            
            using (IDbConnection db = new NpgsqlConnection(DbConnection.ConnectionString))
            {
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

                    var columns = csvService.GetColumnsList(data);

                    var filename = file.FileName.Replace(".csv", "");

                    _appContext.EntityInfoItems.Add(new EntityInfoItem 
                    { 
                        FileName = filename,
                        Columns = columns
                    });
                    await _appContext.SaveChangesAsync();

                    await _postgreSQLService.CreateTableWithColumnsFromCsv(filename, data);
                    await _postgreSQLService.InsertTableData(filename, data);

                    var fileData = _postgreSQLService.GetPagedData(filename, columns, 0, 20);

                    return Ok(fileData);
                }
            }

            return Ok(data.Take(2));
        }
    }
}
