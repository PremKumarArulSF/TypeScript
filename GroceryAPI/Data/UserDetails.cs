using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;       


namespace GroceryAPI.Data
{
    [Table("UserDetails", Schema = "public")]

    public class UserDetails
    {
        [Key]
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string EmailID { get; set; }
        public string Password { get; set; }
        public int Balance { get; set; }
        public string[] Photo { get; set; }
           
        
        
    }
}