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


    }
}
