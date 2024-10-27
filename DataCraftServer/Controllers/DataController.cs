using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataCraftServer.Services;
using DataCraftServer.AppContext;
using DataCraftServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace DataCraftServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IPostgreSQLService _postgreSQLService;
        private readonly ApplicationContext _appContext;

        public DataController(IPostgreSQLService postgreSQLService, ApplicationContext appContext)
        {
            _postgreSQLService = postgreSQLService;
            _appContext = appContext;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllDataTable()
        {
            List<EntityInfoItem> entityInfoList = await _appContext.EntityInfoItems.ToListAsync();
            return Ok(entityInfoList);
        }


        [HttpPost("getTablesData")]
        public async Task<IActionResult> GetTableData([FromBody] List<string> tableName)
        {
            List<EntityInfoItem> entityInfoList = await _appContext.EntityInfoItems.Where(x => tableName.Contains(x.FileName)).ToListAsync();

            var datas = new List<FileData>();
            foreach(var entityInfoItem in entityInfoList)
            {
                var data = await _postgreSQLService.GetPagedData(entityInfoItem.FileName, entityInfoItem.Columns, 0, 200);
                datas.Add(data);
            }
            return Ok(datas);
        }
    }
}
