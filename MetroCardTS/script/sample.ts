let emailStatus: boolean = false;
let passwordStatus: boolean = false;
let phonenumberStatus: boolean = false;
let nameStatus: boolean = false;

let editingId:number;
let currentUser:UserDetails;
interface UserDetails
{
    cardNumbers:any;
    userName:string;
    balance:number;
    emailID:string;
    phone:string;
    password:string
}

let userList:UserDetails[]=[];

interface TravelDetails
{
    travelID:any;
    cardNumber:number;
    fromLocation:string;
    toLocation:string;
    date:Date;
    travelCost:number;
}

let travelList:TravelDetails[]=[];


interface TicketDetails
{
    ticketID:any;
    fromLocation:string;
    toLocation:string;
    fair:number;
}

let ticketList:TicketDetails[]=[];


//Adding validation

function validateUser() {
    let name = document.getElementById("username-field") as HTMLInputElement;
    let show = document.getElementById("username-error") as HTMLInputElement;
    let regx = /^[a-zA-z]/;
    if (regx.test(name.value)) {
        show.innerHTML = "valid";
        show.style.color = "green"
        nameStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid email"
        show.style.color = "red";
    }
}

function validateEmail() {
    let email = document.getElementById("email-field") as HTMLInputElement;
    let show = document.getElementById("email-error") as HTMLInputElement;
    let regx = /^([\w\.-]+)@([\w-]+)\.([a-z])/;
    if (regx.test(email.value)) {
        show.innerHTML = "valid";
        show.style.color = "green"
        emailStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid email"
        show.style.color = "red";
    }
}

function validatePassword() {
    let password = document.getElementById("password-field") as HTMLInputElement;
    let show = document.getElementById("password-error") as HTMLInputElement;
    let regx = /\d{5,10}/;
    if (regx.test(password.value)) {
        show.innerHTML = "valid";
        show.style.color = "green"

    }
    else {
        show.innerHTML = "Please enter a valid password"
        show.style.color = "red";
    }
}

function validateConfirmPwd() {
    let confirmpwd = document.getElementById("confirm-password-field") as HTMLInputElement
    let show = document.getElementById("confirm-password-error") as HTMLInputElement
    let password = document.getElementById("password-field") as HTMLInputElement;

    if (password.value === confirmpwd.value) {
        show.innerHTML = "valid";
        show.style.color = "green"
        passwordStatus = true
    }
    else {
        show.innerHTML = "Please enter a valid password"
        show.style.color = "red";
    }
}

function validatePhone() {
    let phone = document.getElementById("phonenumber-field") as HTMLInputElement;
    let show = document.getElementById("phonenumber-error") as HTMLInputElement;
    let regx = /^[8-9]\d{9}/;
    if (regx.test(phone.value)) {
        show.innerHTML = "valid";
        show.style.color = "green"
        phonenumberStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid phonenumber"
        show.style.color = "red";
    }
}

function homepage()
{
    let homePage=document.getElementById("homepage") as HTMLDivElement;
    homePage.style.display="block";
    let signUpPage=document.getElementById("sign-up") as HTMLDivElement;
    signUpPage.style.display="none";
}
function SignUp()
{
    let homePage=document.getElementById("homepage") as HTMLDivElement;
    homePage.style.display="none";
    let signUpPage=document.getElementById("sign-up") as HTMLDivElement;
    signUpPage.style.display="block";

}
function SignIn()
{
    let homePage=document.getElementById("homepage") as HTMLDivElement;
    homePage.style.display="none";
    // let signInPage=document.getElementById("sign-in") as HTMLDivElement;
    // signInPage.style.display="block";
    (document.getElementById("sign-in") as HTMLDivElement).style.display="block";
    renderUser();
}
async function renderUser()
{ 
    let userTable=document.getElementById("user-table") as HTMLTableSectionElement;
    userTable.innerHTML=" ";
        const users=await fetchUser();
       
       users.forEach((list)=>
        {
            const row=document.createElement('tr');
            row.innerHTML=`
            <td> ${list.userName}</td>
            <td> ${list.emailID}</td>
            
            `;
            userTable.appendChild(row);
        }
       );
}
function SignUpSubmit()
{
    if (emailStatus == true && phonenumberStatus == true && passwordStatus == true && nameStatus == true) 
    {
       let UserName=document.getElementById("username-field") as HTMLInputElement;
       let email=document.getElementById("email-field") as HTMLInputElement;
       let phoneNumber=document.getElementById("phonenumber-field") as HTMLInputElement;
       let pwd=document.getElementById("confirm-password-field") as HTMLInputElement;
       const newUser:UserDetails={
        cardNumbers:undefined,
        userName:UserName.value,
        balance:0,
        emailID:email.value,
        phone:phoneNumber.value,
        password:pwd.value
       };
       addUser(newUser);
       homepage();
    }
    
}
async function SignInSubmit()
{
   let userEmail=document.getElementById("useremail-field1") as HTMLInputElement;
   let userpwd=document.getElementById("password-field1") as HTMLInputElement;
   let flag:boolean=true;
   const users=await fetchUser();
   users.forEach(list=>
    {
        if(userEmail.value==list.emailID && userpwd.value==list.password)
            {
               flag=false;
               currentUser=list;
               alert("Heading into methods");
               navbar();
            }
    }
    
   ) 
   if(flag)
    { 
       alert("Enter valid datas")
    }  
}

function navbar()
{
    let signInPage=document.getElementById("sign-in") as HTMLDivElement;
    signInPage.style.display="none";
    let navBar=document.getElementById("nav-bar") as HTMLDivElement;
    navBar.style.display="block";
    let showName=document.getElementById("showName") as HTMLDivElement;
    showName.innerHTML=`Welcome <h4>${currentUser.userName}</h4>`
}

function modify()
{
    (document.getElementById("modify") as HTMLDivElement).style.display="block";
  
    (document.getElementById("ticket-fair") as HTMLDivElement).style.display="none";
    (document.getElementById("travel-histroy") as HTMLDivElement).style.display="none";
    (document.getElementById("recharge") as HTMLDivElement).style.display="none";
    (document.getElementById("balance") as HTMLDivElement).style.display="none";
    renderModifyTicket(); 
}

async function renderModifyTicket()
{
    (document.getElementById("edit-tickets") as HTMLDivElement).style.display="none"
    let modifyTable=document.getElementById("modify-table") as HTMLTableSectionElement;
    modifyTable.innerHTML="";
    const tickets=await fetchTicket();
    tickets.forEach((list)=>
    {
        const row=document.createElement('tr');
            row.innerHTML=`
            <td> ${list.ticketID}</td>
            <td> ${list.fromLocation}</td>
            <td> ${list.toLocation}</td>
            <td> ${list.fair}</td>
            <td><button onclick="Edit('${list.ticketID}')">Edit</button>
            <button onclick="deleteTicket('${list.ticketID}')">Delete</button></td>
            
            `;
            modifyTable.appendChild(row);
    })
} 

async function deleteTicket(id:number):Promise<void> 
{
     const response=await fetch(`http://localhost:5016/api/TicketDetails/${id}`,{
        method:'DELETE'
     });
     

     if(!response.ok)
        {
            throw new Error('Failed to deleteMedicine')
        }
        renderModifyTicket();
        
}


async function Edit(id:any)
{
let show=(document.getElementById("edit-tickets") as HTMLDivElement)
 show.style.display="block";   
 let FromLocation=document.getElementById("from-location") as HTMLInputElement;
 let ToLocation=document.getElementById("to-location") as HTMLInputElement;
 let fairModify=document.getElementById("fair") as HTMLInputElement;
  editingId=id;
  const tickets=await fetchTicket();
 tickets.forEach(list=>
    {
        if(list.ticketID==id)
            {
               FromLocation.value=list.fromLocation;
               ToLocation.value=list.toLocation;
               fairModify.value=String(list.fair)
            }
    }
   )
}
function checkModify()
{
    let FromLocation=document.getElementById("from-location") as HTMLInputElement;
    let ToLocation=document.getElementById("to-location") as HTMLInputElement;
    let fairModify=document.getElementById("fair") as HTMLInputElement;
    const newTicket:TicketDetails={
        ticketID:editingId,
        fromLocation:FromLocation.value,
        toLocation:ToLocation.value,
        fair:Number(fairModify.value)
    };
    updateTicket(editingId,newTicket)
    
}

function ticketFair()
{
    (document.getElementById("modify") as HTMLDivElement).style.display="none";
  
  (document.getElementById("ticket-fair") as HTMLDivElement).style.display="block";
  (document.getElementById("travel-histroy") as HTMLDivElement).style.display="none";
  (document.getElementById("recharge") as HTMLDivElement).style.display="none";
  (document.getElementById("balance") as HTMLDivElement).style.display="none";
  renderTicket();

}

async function renderTicket()
{
    let ticketTable=document.getElementById("ticket-table") as HTMLTableSectionElement;
    ticketTable.innerHTML="";
    const tickets=await fetchTicket();
    tickets.forEach((list)=>
        {
            const row=document.createElement('tr');
            row.innerHTML=`
            <td> ${list.ticketID}</td>
            <td> ${list.fromLocation}</td>
            <td> ${list.toLocation}</td>
            <td> ${list.fair}</td>
            <td><button onclick="enter('${list.ticketID}')">Book</button></td>
            `;
            ticketTable.appendChild(row);
        }
    )
}

async function enter(id:any)
{
    const tickets=await fetchTicket();
    tickets.forEach((list)=>
        {
            if(list.ticketID==id)
                {
                    if(currentUser.balance>=list.fair)
                        {
                           const newTravel:TravelDetails=
                           {
                             travelID:undefined,
                             cardNumber:currentUser.cardNumbers,
                             fromLocation:list.fromLocation,
                             toLocation:list.toLocation,
                             date:new Date(),
                             travelCost:list.fair
                           };
                           addTravel(newTravel);
                           currentUser.balance-=list.fair;
                           updateUser(currentUser.cardNumbers,currentUser);
                           alert("Travel Booked..")
                        }
                        else{
                            alert("You have low balance..")
                        }
                }
        }
    )
}

function travelHistroy()
{
    (document.getElementById("modify") as HTMLDivElement).style.display="none";
  
    (document.getElementById("ticket-fair") as HTMLDivElement).style.display="none";
    (document.getElementById("travel-histroy") as HTMLDivElement).style.display="block";
    (document.getElementById("recharge") as HTMLDivElement).style.display="none";
    (document.getElementById("balance") as HTMLDivElement).style.display="none";
     renderTravel();
}

async function renderTravel()
{
    let travelTable=document.getElementById("travel-table") as HTMLTableSectionElement;
    travelTable.innerHTML="";
    const travels=await fetchTravel();
    travels.forEach((list)=>
        {
            const row=document.createElement('tr');
            row.innerHTML=`
            <td> ${list.travelID}</td>
            <td> ${list.cardNumber}</td>
            <td> ${list.fromLocation}</td>
            <td> ${list.toLocation}</td>
            <td> ${list.date}</td>
            <td> ${list.travelCost}</td>
             `;
            travelTable.appendChild(row);
        }
    )
}

function recharge()
{
    (document.getElementById("modify") as HTMLDivElement).style.display="none";
    
  (document.getElementById("ticket-fair") as HTMLDivElement).style.display="none";
  (document.getElementById("travel-histroy") as HTMLDivElement).style.display="none";
  (document.getElementById("recharge") as HTMLDivElement).style.display="block";
  (document.getElementById("balance") as HTMLDivElement).style.display="none";
  
}
function amount()
{
    let rechargeAmount=document.getElementById("recharge-amount") as HTMLInputElement;
    currentUser.balance+=Number(rechargeAmount.value);
    alert(`Amount ${rechargeAmount.value} added to your balance`);
    updateUser(currentUser.cardNumbers,currentUser);
}

function balance()
{
    (document.getElementById("modify") as HTMLDivElement).style.display="none";
  (document.getElementById("ticket-fair") as HTMLDivElement).style.display="none";
  (document.getElementById("travel-histroy") as HTMLDivElement).style.display="none";
  (document.getElementById("recharge") as HTMLDivElement).style.display="none";
  (document.getElementById("balance") as HTMLDivElement).style.display="block";
  let showBalance=document.getElementById("show-balance") as HTMLLabelElement;
  showBalance.innerHTML=`The User ${currentUser.userName} balance is ${currentUser.balance}`;
  
}
//Adding Details



async function addUser(user:UserDetails):Promise<void> 
{
     const respone=await fetch ('http://localhost:5016/api/userDetails',{
        method:'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(user)
     });
     if(!respone.ok)
        {
            throw new Error('Failed to add UserDetails ');
        }
}

async function addTravel(travel:TravelDetails):Promise<void> 
{
     const respone=await fetch ('http://localhost:5016/api/TravelDetails',{
        method:'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(travel)
     });
     if(!respone.ok)
        {
            throw new Error('Failed to add travelDetails ');
        }
}

async function addticket(ticket:TicketDetails):Promise<void> 
{
     const respone=await fetch ('http://localhost:5016/api/TicketDetails',{
        method:'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(ticket)
     });
     if(!respone.ok)
        {
            throw new Error('Failed to add travelDetails ');
        }
}


//Fetching Details

async function fetchUser():Promise<UserDetails[]> 
{
    const apiURL=`http://localhost:5016/api/userDetails` ;
    const response =await fetch(apiURL);
    if(!response.ok)
        {
            throw new Error('Failed to fetch users');
        }
        return await response.json();

}

async function fetchTravel():Promise<TravelDetails[]> 
{
    const apiURL=`http://localhost:5016/api/TravelDetails` ;
    const response =await fetch(apiURL);
    if(!response.ok)
        {
            throw new Error('Failed to fetch travels');
        }
        return await response.json();

}

async function fetchTicket():Promise<TicketDetails[]> 
{
    const apiURL=`http://localhost:5016/api/TicketDetails` ;
    const response =await fetch(apiURL);
    if(!response.ok)
        {
            throw new Error('Failed to fetch tickets');
        }
        return await response.json();

}

async function updateUser(id:number,user:UserDetails):Promise<void> 
{
    const response=await fetch(`http://localhost:5016/api/userDetails/${id}`,{
       method:'PUT',
       headers:{
        'content-type': 'application/json'
       },
       body:JSON.stringify(user)
    });
  if(!response.ok)

    {
        throw new Error('Failed to Update medicineDetails ');
    }
   
}
async function updateTicket(id:number,ticket:TicketDetails):Promise<void> 
{
    const response=await fetch(`http://localhost:5016/api/ticketDetails/${id}`,{
       method:'PUT',
       headers:{
        'content-type': 'application/json'
       },
       body:JSON.stringify(ticket)
    });
  if(!response.ok)

    {
        throw new Error('Failed to Update medicineDetails ');
    }
    renderModifyTicket()
   
}
