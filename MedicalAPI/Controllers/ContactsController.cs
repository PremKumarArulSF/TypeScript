
using Microsoft.AspNetCore.Mvc;

namespace MedicalAPI.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private static List<Contacts> Contacts=new List<Contacts>()
        {
            // new Contacts { ID="1", Name="Ravi" , Email="xyz@gmail.com" ,Phone="9361116244"},
            // new Contacts { ID="2", Name="Baskran" , Email="abc@gmail.com" ,Phone="9361116244"},
            // new Contacts { ID="3", Name="Ravi" , Email="bbb@gmail.com" ,Phone="9361116244"},
            // new Contacts { ID="4", Name="kumar" , Email="aaa@gmail.com" ,Phone="9361116244"},
         };

         //GET :api/Contacts

         [HttpGet]
         public IActionResult GetContacts()
         {
            return Ok(Contacts);
         }

         //GET: api/Contacts/1

         [HttpGet("{id}")]

         public IActionResult GetMedicine(string id)
         {
             var medicine=Contacts.Find(m=>m.ID==id);
             if(medicine==null)
             {
               return NotFound();  
             }
             return Ok(medicine);
         }
    

         //Adding a new medicine

         //POST: api/contacts

         [HttpPost]

         public IActionResult PostMedicine([FromBody] Contacts medicine)
         {
            Contacts.Add(medicine);

            //You might want to return CreatedAtAction or another approriate response
            return Ok();
         }

         //Updating an existing medicine
         //PUT: api/Contacts/1

         [HttpPut("{id}")]

         public IActionResult PutMedicine(string id,[FromBody ]Contacts medicine)
         {
            var index=Contacts.FindIndex(m=>m.ID==id);
            if(index <0)
            {
                return NotFound();
            }
            Contacts[index]=medicine;
            //You might want to return NoContent or another appropriate response
            return Ok();
         }
   

    //Deleting an exsiting medicine
    //DELETE: api/Contacts/1

    [HttpDelete("{id}")]

    public IActionResult DeleteContact(string id)
    {
        var medicine=Contacts.Find(m=>m.ID==id);
        if(medicine==null)

        {
            return NotFound();
        }
        Contacts.Remove(medicine);
         //You might want to return NoContent or another appropriate response
        return Ok();
    }
}
}