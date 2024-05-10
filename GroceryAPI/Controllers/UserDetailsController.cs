using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Npgsql.EntityFrameworkCore.PostgreSQL.Infrastructure.Internal;

namespace GroceryAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserDetailsController : ControllerBase
    {
         private readonly ApplicationDBContext _dbContext;
       public UserDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;

        }
        
        [HttpGet]
   
        public IActionResult getUser()
        {
            return Ok(_dbContext.users.ToList());
        }

        [HttpGet("{id}")]

        public IActionResult getUserByID(int id)
        {
            var user=_dbContext.users.FirstOrDefault(user=>user.UserID==id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]

        public IActionResult PostUser([FromBody] UserDetails user)
         {
           _dbContext.users.Add(user);
            _dbContext.SaveChanges();
            return Ok();

         }

         [HttpPut("{id}")]
        public IActionResult PutUser(int id,[FromBody] UserDetails user)
         {
            var userOld=_dbContext.users.FirstOrDefault(user=>user.UserID==id);
           if(userOld==null)
            {
               return NotFound();
            }
            userOld.UserName=user.UserName;
            userOld.Balance=user.Balance;
            userOld.EmailID=user.EmailID;
            user.Password=user.Password;
            user.Photo=user.Photo;
           _dbContext.SaveChanges();
            return Ok();
         }

         [HttpDelete("{id}")]

         
         public IActionResult DeleteUser(int id)
         {
            var user=_dbContext.users.FirstOrDefault(user=>user.UserID==id);
            if(user==null)
            {
                return NotFound();
            }
            _dbContext.users.Remove(user);
            _dbContext.SaveChanges();
            return Ok();
         }
  
    }
}