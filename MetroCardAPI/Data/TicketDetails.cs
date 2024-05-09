using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;          //Adding new comments
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardAPI.Data
{
    [Table("TicketDetails", Schema = "public")]
    public class TicketDetails
    {
        [Key]
        public int TicketID { get; set; }
        public string FromLocation { get; set; }
        public string ToLocation { get; set; }
        public int Fair { get; set; }
        
        
        
        
        
        
    }
}