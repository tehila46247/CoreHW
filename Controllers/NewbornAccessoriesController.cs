using Microsoft.AspNetCore.Mvc;
using Lesson1.Models;

namespace Lesson1.Controllers;

[ApiController]
[Route("[controller]")]
public class NewbornAccessoriesController : ControllerBase
{
    private static List<NewbornAccessories> list;
    static NewbornAccessoriesController()
    {
        list = new List<NewbornAccessories>
        {
            new NewbornAccessories { Id = 1, Name = "Soft carpet" },
            new NewbornAccessories { Id = 2, Name = "Basket of keys", IsInUse = true }
        };
    }

    [HttpGet]
    public IEnumerable<NewbornAccessories> Get()
    {
        return list;
    }
    [HttpGet("{id}")]
    public ActionResult<NewbornAccessories> Get(int id)
    {
        var newborn = list.FirstOrDefault(p => p.Id == id);
        if (newborn == null)
            return BadRequest("invalid id");
        return newborn;
    }

    [HttpPost]
    public ActionResult Insert(NewbornAccessories newborn)
    {
        var maxId = list.Max(p => p.Id);
        newborn.Id = maxId + 1;
        list.Add(newborn);

        return CreatedAtAction(nameof(Insert), new { id = newborn.Id }, newborn);
    }


    [HttpPut("{id}")]
    public ActionResult Update(int id, NewbornAccessories newborn)
    {
        var oldNewborn = list.FirstOrDefault(p => p.Id == id);
        if (oldNewborn == null)
            return BadRequest("invalid id");
        if (oldNewborn.Id != newborn.Id)
            return BadRequest("id mismatch");

        oldNewborn.Name = newborn.Name;
        oldNewborn.IsInUse = newborn.IsInUse;
        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var oldNewborn = list.FirstOrDefault(p => p.Id == id);
        if (oldNewborn == null)
            return BadRequest("invalid id");
        list.Remove(oldNewborn);
        return NoContent();
    }
}
