using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;          //Adding new comments
using System.ComponentModel.DataAnnotations.Schema;
namespace OnlineLibaryAPI.Data
{
    [Table("BookDetails", Schema = "public")]
    public class BookDetails
    {
         [Key]
        public int BookID { get; set; }
        public string BookName { get; set; }
        public string AuthorName { get; set; }
        public int BookCount { get; set; }
        
        
        
        
        
    }
}