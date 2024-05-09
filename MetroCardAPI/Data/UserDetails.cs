using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;          //Adding new comments
using System.ComponentModel.DataAnnotations.Schema;
namespace MetroCardAPI.Data
{
    [Table("UserDetails", Schema = "public")]
    public class UserDetails
    {
        [Key]
        public int CardNumbers { get; set; }
        public string UserName { get; set; }
        public string Phone { get; set; }
        public int Balance { get; set; }
        public string EmailID { get; set; }
        public string Password { get; set; }
        
        
        
        
        
        
        
    }
}