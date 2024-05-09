using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MetroCardAPI.Data;
using Microsoft.AspNetCore.Mvc;

namespace MetroCardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
       public TicketDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;

        }

        [HttpGet]
         public IActionResult GetUser()
         {
             return Ok(_dbContext.tickets.ToList());
         }

         [HttpGet("{id}")]
         public IActionResult GetUserByID(int id)
         {
           var ticket=_dbContext.tickets.FirstOrDefault(ticket=>ticket.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
            return Ok(ticket);
         }

         [HttpPost]
         public IActionResult PostUser([FromBody] TicketDetails ticket)
         {
           _dbContext.tickets.Add(ticket);
            _dbContext.SaveChanges();
            return Ok();

         }

          [HttpPut("{id}")]
            public IActionResult PutUser(int id,[FromBody] TicketDetails ticket)
            {
                var ticketOld=_dbContext.tickets.FirstOrDefault(ticket=>ticket.TicketID==id);
            if(ticketOld==null)
                {
                return NotFound();
                }
              ticketOld.FromLocation=ticket.FromLocation;
               ticketOld.ToLocation=ticket.ToLocation; 
               ticketOld.Fair=ticket.Fair; 
             _dbContext.SaveChanges();
                return Ok();
            }

            [HttpDelete("{id}")]
         public IActionResult DeleteUser(int id)
         {
            var ticket=_dbContext.tickets.FirstOrDefault(ticket=>ticket.TicketID==id);
            if(ticket==null)
            {
                return NotFound();
            }
            _dbContext.tickets.Remove(ticket);
            _dbContext.SaveChanges();
            return Ok();
         }
    }
}