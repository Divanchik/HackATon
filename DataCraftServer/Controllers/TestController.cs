using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing.Constraints;

namespace DataCraftServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : Controller
    {
        [HttpGet]
        public IActionResult GetAboba()
        {
            var dickPick = "dickPick0";
            return Ok(dickPick);
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
