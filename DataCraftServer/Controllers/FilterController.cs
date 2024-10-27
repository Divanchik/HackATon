using DataCraftServer.AppContext;
using DataCraftServer.Services;
using DataCraftServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DataCraftServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilterController : Controller
    {
        private readonly IPostgreSQLService _postgreSQLService;
        private readonly ApplicationContext _appContext;

        public FilterController(IPostgreSQLService postgreSQLService, ApplicationContext appContext)
        {
            _postgreSQLService = postgreSQLService;
            _appContext = appContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetFilters()
        {
            return Ok("Filters page");
        }

        [HttpPost]
        public async Task<IActionResult> PostFilters(FilterSettings conf)
        {
            return Ok(conf);
        }
    }
}
