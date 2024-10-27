using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataCraftServer.Services;
using DataCraftServer.AppContext;
using DataCraftServer.Models;
using Microsoft.AspNetCore.Http;

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

        [HttpPost]
        public async Task<IActionResult> getTables()
        {
            Dictionary<string, List<string>> res;
            var tables = await _postgreSQLService.getTables();
            return Ok(tables);
        }

    }
}
