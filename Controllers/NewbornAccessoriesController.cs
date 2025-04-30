using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ProjectApi.Models;
using ProjectApi.Interfaces;

namespace ProjectApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Policy = "User")]
    public class NewbornAccessoriesController : ControllerBase
    {
        private INewbornService newbornService;

        public NewbornAccessoriesController(INewbornService newbornService)
        {
            this.newbornService = newbornService;
        }

        private int? UserId
        {
            get
            {
                var idClaim = User.FindFirst("id");
                return idClaim != null && int.TryParse(idClaim.Value, out int userId) ? userId : (int?)null;
            }
        }

        private string? userRole
        {
            get
            {
                var roleClaim = User.FindFirst("type");
                return roleClaim?.Value;
            }
        }

        [HttpGet]
        public ActionResult<List<NewbornAccessories>> GetAll()
        {
            var newbornList = newbornService.GetAll() ?? new List<NewbornAccessories>();

            if (userRole == "Admin")
                return newbornList;
            return newbornList.Where(n => n.UserId == UserId).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<NewbornAccessories> Get(int id)
        {
            var newborn = newbornService.Get(id);
            if (newborn?.UserId != UserId)
                return Unauthorized();

            if (newborn == null)
                return NotFound();
            return newborn;
        }

        [HttpPost]
        public IActionResult Create(NewbornAccessories newborn)
        {
            newbornService.Add(newborn, UserId.GetValueOrDefault());
            return CreatedAtAction(nameof(Create), new { id = newborn.Id }, newborn);
        }


        [HttpPut("{id}")]
        public ActionResult Update(int id, NewbornAccessories newborn)
        {
            if (userRole != "Admin" && id != newborn.Id)
                return Unauthorized();
            var exitingNewborn = newbornService.Get(id);
            if (exitingNewborn is null)
                return NotFound();
            if (userRole != "Admin" && UserId != exitingNewborn.UserId)
                return Unauthorized();
            newbornService.Update(newborn, UserId.GetValueOrDefault());
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var newborn = newbornService.Get(id);
            if (newborn is null)
                return NotFound();

            if (newborn.UserId != UserId && userRole != "Admin")
                return Unauthorized();

            newbornService.Delete(id);
            return Content(newbornService.Count.ToString());

        }
    }
}