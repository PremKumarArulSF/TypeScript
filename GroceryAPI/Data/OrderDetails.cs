using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GroceryAPI.Data
{
     [Table("OrderDetails", Schema = "public")]
    public class OrderDetails
    {
        [Key]
        public int  OrderID { get; set; }
        public string UserName { get; set; }
        public int[] GroceryID{get;set;}
        public string[] GroceryName { get; set; }
        public DateTime Date { get; set; }
        public int[] Quantity { get; set; }
        public int[] PricePerQuantity { get; set; }
        public int TotalPrice { get; set; }
        
        
        
        
        
        
        
    }
}