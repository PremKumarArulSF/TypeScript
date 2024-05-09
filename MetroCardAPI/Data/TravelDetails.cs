using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using System.ComponentModel.DataAnnotations;          //Adding new comments
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardAPI.Data
{
    [Table("TravelDetails", Schema = "public")]

    public class TravelDetails
    {
        [Key]
        public int TravelID { get; set; }

        public int CardNumber { get; set; }

        public string FromLocation { get; set; }

        public string ToLocation { get; set; }

        public DateTime Date { get; set; }

        public int TravelCost { get; set; }
        
        
        
        
        
        
        
    }
}