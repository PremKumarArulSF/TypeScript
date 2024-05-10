using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace GroceryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroceryDetailsController : ControllerBase
    {
         private readonly ApplicationDBContext _dbContext;
       public GroceryDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;

        }

         [HttpGet]
   
        public IActionResult getgrocery()
        {
            return Ok(_dbContext.groceries.ToList());
        }

         [HttpGet("{id}")]

        public IActionResult getGroceryByID(int id)
        {
            var grocery=_dbContext.groceries.FirstOrDefault(user=>user.GroceryID==id);
            if(grocery==null)
            {
                return NotFound();
            }
            return Ok(grocery);
        }

        [HttpPost]

        public IActionResult PostGrocery([FromBody] GroceryDetails grocery)
         {
           _dbContext.groceries.Add(grocery);
            _dbContext.SaveChanges();
            return Ok();

         }

          [HttpPut("{id}")]
        public IActionResult PutGrocery(int id,[FromBody] GroceryDetails grocery)
         {
            var groceryOld=_dbContext.groceries.FirstOrDefault(user=>user.GroceryID==id);
           if(groceryOld==null)
            {
               return NotFound();
            }
            groceryOld.GroceryName=grocery.GroceryName;
             groceryOld.Count=grocery.Count;
              groceryOld.Price=grocery.Price;
               groceryOld.ExpiryDate=grocery.ExpiryDate;
                groceryOld.PurchaseDate=grocery.PurchaseDate;
                 groceryOld.ItemPhoto=grocery.ItemPhoto;
           _dbContext.SaveChanges();
            return Ok();
         }

         [HttpDelete("{id}")]

         
         public IActionResult DeleteGrocery(int id)
         {
            var grocery=_dbContext.groceries.FirstOrDefault(user=>user.GroceryID==id);
            if(grocery==null)
            {
                return NotFound();
            }
            _dbContext.groceries.Remove(grocery);
            _dbContext.SaveChanges();
            return Ok();
         }
    }
}