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
    public class BookDetailsController : ControllerBase
    {
        private readonly ApplicationDBContext _dbContext;
       public BookDetailsController(ApplicationDBContext applicationDBContext)
        {
            _dbContext=applicationDBContext;

        }
        [HttpGet]
         public IActionResult GetBook()
         {
             return Ok(_dbContext.books.ToList());
         }

         [HttpGet("{id}")]
         public IActionResult GetBookByID(int id)
         {
           var book=_dbContext.books.FirstOrDefault(book=>book.BookID==id);
            if(book==null)
            {
                return NotFound();
            }
            return Ok(book);
         }

         [HttpPost]
         public IActionResult PostBook([FromBody] BookDetails book)
         {
           _dbContext.books.Add(book);
            _dbContext.SaveChanges();
            return Ok();

         }

         [HttpPut("{id}")]
         public IActionResult PutBook(int id,[FromBody] BookDetails book)
         {
            var bookOld=_dbContext.books.FirstOrDefault(book=>book.BookID==id);
           if(bookOld==null)
            {
               return NotFound();
            }
            bookOld.BookName=book.BookName;
            bookOld.AuthorName=book.AuthorName;
            bookOld.BookCount=book.BookCount;
           _dbContext.SaveChanges();
            return Ok();
         }

         [HttpDelete("{id}")]
         public IActionResult DeleteBook(int id)
         {
            var book=_dbContext.books.FirstOrDefault(book=>book.BookID==id);
            if(book==null)
            {
                return NotFound();
            }
            _dbContext.books.Remove(book);
            _dbContext.SaveChanges();
            return Ok();
         }
    }
}