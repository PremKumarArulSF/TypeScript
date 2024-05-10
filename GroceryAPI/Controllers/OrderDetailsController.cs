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
    public class OrderDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
       public OrderDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;

        }


        [HttpGet]
   
        public IActionResult getOrder()
        {
            return Ok(_dbContext.orders.ToList());
        }

         [HttpGet("{id}")]

        public IActionResult getOrderByID(int id)
        {
            var order=_dbContext.orders.FirstOrDefault(order=>order.OrderID==id);
            if(order==null)
            {
                return NotFound();
            }
            return Ok(order);
        }

        [HttpPost]

        public IActionResult PostUser([FromBody] OrderDetails order)
         {
           _dbContext.orders.Add(order);
            _dbContext.SaveChanges();
            return Ok();

         }

          [HttpPut("{id}")]
        public IActionResult PutOrder(int id,[FromBody] OrderDetails order)
         {
            var orderOld=_dbContext.orders.FirstOrDefault(order=>order.OrderID==id);
           if(orderOld==null)
            {
               return NotFound();
            }
           orderOld.UserName=order.UserName;
           orderOld.GroceryID=order.GroceryID;
           orderOld.GroceryName=order.GroceryName;
            orderOld.Date=order.Date;
             orderOld.Quantity=order.Quantity;
              orderOld.PricePerQuantity=order.PricePerQuantity;
               orderOld.TotalPrice=order.TotalPrice;
           _dbContext.SaveChanges();
            return Ok();
         }

          [HttpDelete("{id}")]

         
         public IActionResult DeleteOrder(int id)
         {
            var order=_dbContext.orders.FirstOrDefault(order=>order.OrderID==id);
            if(order==null)
            {
                return NotFound();
            }
            _dbContext.orders.Remove(order);
            _dbContext.SaveChanges();
            return Ok();
         }
  
    }
}