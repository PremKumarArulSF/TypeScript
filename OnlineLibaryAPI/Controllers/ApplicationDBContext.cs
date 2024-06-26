using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using OnlineLibaryAPI.Data;

using Microsoft.EntityFrameworkCore;
namespace OnlineLibaryAPI.Controllers
{
    public class ApplicationDBContext : DbContext,IDisposable
    {
         public ApplicationDBContext(DbContextOptions<ApplicationDBContext>options) : base(options)
          {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
          }

           public DbSet<UserDetails> users {get; set;}
        public DbSet<BookDetails>  books {get; set;}
          public DbSet<BorrowDetails>  borrows {get; set;}
    }
}