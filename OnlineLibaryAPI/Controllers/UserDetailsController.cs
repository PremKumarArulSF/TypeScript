using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineLibaryAPI.Data;

namespace OnlineLibaryAPI.Controllers
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
         public IActionResult GetUser()
         {
             return Ok(_dbContext.users.ToList());
         }

         [HttpGet("{id}")]
         public IActionResult GetUserByID(int id)
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
            userOld.Gender=user.Gender;
            userOld.Department=user.Department;
            userOld.MobileNumber=user.MobileNumber;
            userOld.MailID=user.MailID;
            userOld.Balance=user.Balance;
            userOld.Password=user.Password;
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