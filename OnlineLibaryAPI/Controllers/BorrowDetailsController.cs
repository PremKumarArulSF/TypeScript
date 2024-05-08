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
    public class BorrowDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
       public BorrowDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;

        }

        [HttpGet]
         public IActionResult GetBorrow()
         {
             return Ok(_dbContext.borrows.ToList());
         }

         [HttpGet("{id}")]
         public IActionResult GetBorrowByID(int id)
         {
           var borrow=_dbContext.borrows.FirstOrDefault(borrow=>borrow.BorrowID==id);
            if(borrow==null)
            {
                return NotFound();
            }
            return Ok(borrow);
         }

         [HttpPost]
         public IActionResult PostBorrow([FromBody] BorrowDetails borrow)
         {
           _dbContext.borrows.Add(borrow);
            _dbContext.SaveChanges();
            return Ok();

         }

         [HttpPut("{id}")]
         public IActionResult PutBorrow(int id,[FromBody] BorrowDetails borrow)
         {
            var borrowOld=_dbContext.borrows.FirstOrDefault(borrow=>borrow.BorrowID==id);
           if(borrowOld==null)
            {
               return NotFound();
            }
            borrowOld.BookID=borrow.BookID;
            borrowOld.UserID=borrow.UserID;
            borrowOld.BorrowedDate=borrow.BorrowedDate;
            borrowOld.BorrowBookCount=borrow.BorrowBookCount;
            borrowOld.Status=borrow.Status;
            borrowOld.PaidFineAmount=borrow.PaidFineAmount;
           _dbContext.SaveChanges();
            return Ok();
         }

         [HttpDelete("{id}")]
         public IActionResult DeleteUser(int id)
         {
            var borrow=_dbContext.borrows.FirstOrDefault(borrow=>borrow.BorrowID==id);
            if(borrow==null)
            {
                return NotFound();
            }
            _dbContext.borrows.Remove(borrow);
            _dbContext.SaveChanges();
            return Ok();
         }

    }
}