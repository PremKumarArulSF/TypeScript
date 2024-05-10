using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GroceryAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace GroceryAPI.Controllers
{
    public class ApplicationDBContext :DbContext,IDisposable
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext>options) : base(options)
          {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
          }
           public DbSet<UserDetails> users {get; set;}
          public DbSet<GroceryDetails> groceries {get; set;}
          public DbSet<OrderDetails> orders {get; set;}
    }
}