using Microsoft.AspNetCore.Mvc;
using ProjectApi.Models;
using ProjectApi.Services;
using ProjectApi.Interfaces;

namespace ApiProject.Controllers;

[ApiController]
[Route("[controller]")]

public class NewbornAccessoriesController : ControllerBase

{
    private INewbornService NewbornService;
    public NewbornAccessoriesController(INewbornService newbornService)
    {
        this.NewbornService = newbornService;
    }

    [HttpGet]
    public IEnumerable<NewbornAccessories> Get()
    {
        return NewbornService.GetAll();
    }

    [HttpGet("{id}")]
    public ActionResult<NewbornAccessories> Get(int id)
    {
        var newborn = NewbornService.Get(id);
        if (newborn is null)
            return BadRequest("invalid id");
        return newborn;
    }

    [HttpPost]
    public ActionResult Insert(NewbornAccessories newborn)
    {        
        NewbornService.Add(newborn);
        return CreatedAtAction(nameof(Insert), new { id = newborn.Id }, newborn);
    }  

    
    [HttpPut("{id}")]
    public ActionResult Update(int id, NewbornAccessories newborn)
    { 
        var oldNewBorn = NewbornService.Get(id);
        if (oldNewBorn == null) 
            return BadRequest("invalid id");
        if (newborn.Id != oldNewBorn.Id)
            return BadRequest("id mismatch");

        NewbornService.Update(newborn);
        return NoContent();
    } 

    [HttpDelete("{id}")]
    public ActionResult Delete(int id){
        var oldNewBorn = NewbornService.Get(id);
        if (oldNewBorn is null) 
            return BadRequest("invalid id");
        NewbornService.Delete(id);
        return NoContent();
    }
    
}
