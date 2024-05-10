using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace GroceryAPI.Data
{
     [Table("GroceryDetails", Schema = "public")]
    public class GroceryDetails
    {
        [Key]
        public int GroceryID { get; set; }
        public string GroceryName { get; set; }
        public int Count { get; set; }
        public int Price { get; set; }
        public DateTime PurchaseDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public string[] ItemPhoto { get; set; }
        
        
        
        
        
        
        
        
        
    }
}