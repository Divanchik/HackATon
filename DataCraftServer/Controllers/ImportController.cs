using Azure;
using Dapper;
using DataCraftServer.AppContext;
using DataCraftServer.Models;
using DataCraftServer.Services;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using System.Data;
using static System.Net.Mime.MediaTypeNames;

namespace DataCraftServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportController : Controller
    {
        private readonly IPostgreSQLService _postgreSQLService;
        private readonly ApplicationContext _appContext;
        public ImportController(IPostgreSQLService postgreSQLService, ApplicationContext appContext)
        {
            _postgreSQLService = postgreSQLService;
            _appContext = appContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetPoint()
        {
            return Ok("Get endpoint");
        }

        [HttpPost]
        public async Task<IActionResult> UploadFiles([FromForm] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("Файл не загружен.");

            var data = new Dictionary<string, List<string>>();

            var listFiles = new List<FileData>();

            foreach (var file in files)
            {
                if (file.ContentType == "text/csv" || file.ContentType == "application/vnd.ms-excel")
                {
                    using var stream = file.OpenReadStream();

                    var csvService = new CSVService();
                    data = csvService.ReadCsvColumns(stream);

                    var columns = csvService.GetColumnsList(data);

                    var filename = file.FileName.Replace(".csv", "");

                    var exist = _appContext.EntityInfoItems.FirstOrDefault(x => x.FileName == filename);

                    if (exist == null)
                    {
                        _appContext.EntityInfoItems.Add(new EntityInfoItem
                        {
                            FileName = filename,
                            Columns = columns
                        });
                    }
                    await _appContext.SaveChangesAsync();

                    await _postgreSQLService.CreateTableWithColumnsFromCsv(filename, data);
                    await _postgreSQLService.InsertTableData(filename, data);

                    var fileData = await _postgreSQLService.GetPagedData(filename, columns);
                    listFiles.Add(fileData);
                }
            }

            return Ok(listFiles);
        }
    }
}
