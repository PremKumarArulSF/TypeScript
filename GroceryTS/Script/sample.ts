let currentUser: UserDetails;
let editingCardID: number;
interface UserDetails {
    userID: any;
    userName: string;
    emailID: string;
    password: string;
    photo: string[];
    balance: number;
}


interface GroceryDetails {
    groceryID: any;
    groceryName: string;
    count: number;
    price: number;
    purchaseDate: any;
    expiryDate: any;
    itemPhoto: string[]
}
interface OrderDetails {
    orderID: any;
    groceryID: number[]
    date: any;
    userName: string;
    groceryName: string[];
    quantity: number[];
    pricePerQuantity: number[],
    totalPrice: number;
}


interface Cart {
    groceryID: number
    groceryName: string;
    quantity: number;
    totalPrice: number;
    count: number;
}


interface ConfirmOrder {
    groceryID: number;
    groceryName: string;
    groceryCount: number;
    price: number;

}


let confirmOrderList: ConfirmOrder[] = [];

let cartList: Cart[] = [];


// function homepage()
// {
//     (document.getElementById("sign-in") as HTMLDivElement).style.display="none";
//     (document.getElementById("sign-up") as HTMLDivElement).style.display="none";

// }

function signIn() {
    (document.getElementById("sign-in") as HTMLDivElement).style.display = "block";
    (document.getElementById("sign-up") as HTMLDivElement).style.display = "none";

}

function signUp() {
    (document.getElementById("sign-up") as HTMLDivElement).style.display = "block";
    (document.getElementById("sign-in") as HTMLDivElement).style.display = "none";

}

function signInSubmit() {
    let uName = document.getElementById("name-field") as HTMLInputElement;
    let uEmail = document.getElementById("email-field") as HTMLInputElement;
    let pwd = document.getElementById("confirm-password-field") as HTMLInputElement;
    let uphoto = document.getElementById("photo-field") as HTMLInputElement;
    const photoCard = uphoto.files?.[0];
    let base64String: any = "";
    if (photoCard) {
        const reader = new FileReader();
        reader.readAsDataURL(photoCard);
        reader.onload = function (events) {
            base64String = events.target?.result as string;
            const newuser: UserDetails = {
                userID: undefined,
                userName: uName.value,
                emailID: uEmail.value,
                password: pwd.value,
                balance: 0,
                photo: [base64String]
            }
            addUser(newuser);
            alert("Successfully Sign in");
            // homepage();
        }
    }

}

async function signUpSubmit() {
    let flag: boolean = true;
    let email1 = document.getElementById("email-field1") as HTMLInputElement;
    let password1 = document.getElementById("password-field1") as HTMLInputElement;
    const users = await fetchUser();
    users.forEach(list => {
        if (list.emailID == email1.value && list.password == password1.value) {
            flag = false;
            currentUser = list;
            alert("Succesffuly Sign-in")
            navbar()
        }
    }
    )
    if (flag) {
        alert("Invalid datas")
    }
}

function navbar() {
    (document.getElementById("homepage") as HTMLDivElement).style.display = "none";
    (document.getElementById("menu-bar") as HTMLDivElement).style.display = "block";

}

function home() {
    (document.getElementById("home-div") as HTMLDivElement).style.display = "block";
    (document.getElementById("grocery-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("purchase-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("histroy-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("balance-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("card-div") as HTMLDivElement).style.display = "none";

    let msg = document.getElementById("msg") as HTMLLabelElement;
    msg.innerHTML = `<h2>Welcome to Grocery Online Shop ${currentUser.userName}</h2>`;
    let photoAdd = document.getElementById("photo-add") as HTMLDivElement;
    photoAdd.innerHTML = `<img src=${currentUser.photo[0]} class="img-photo">`;
}

function groceryList() {
    (document.getElementById("home-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("grocery-div") as HTMLDivElement).style.display = "block";
    (document.getElementById("purchase-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("histroy-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("balance-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("card-div") as HTMLDivElement).style.display = "none";

    renderGrocery();
}

async function renderGrocery() {
    (document.getElementById("add-item") as HTMLDivElement).style.display = "none";
    let productTable = document.getElementById("product-table") as HTMLLabelElement;
    productTable.innerHTML = "";
    const grocery = await fetchGrocery();
    grocery.forEach(list => {
        const row = document.createElement('tr');
        row.innerHTML = `
                   <td>${list.groceryName}</td>
                   <td>${list.count}</td>
                   <td>${list.price}</td>
                   <td>${list.purchaseDate.split("T")[0].split("-").reverse().join("/")}</td>
                   <td>${list.expiryDate.split("T")[0].split("-").reverse().join("/")}</td>
                   <td><img src="${list.itemPhoto[0]}" class="item-photo"></td>
                 `;
        productTable.appendChild(row);
    }
    )
}

function addItems() {
    (document.getElementById("add-item") as HTMLDivElement).style.display = "block";


}
function enter() {
    let groceryname = document.getElementById("grocery-name") as HTMLInputElement;
    let grocerycount = document.getElementById("grocery-count") as HTMLInputElement;
    let groceryprice = document.getElementById("grocery-price") as HTMLInputElement;
    let grocerymanufacture = document.getElementById("grocery-purchase") as HTMLInputElement;
    let groceryexpiry = document.getElementById("grocery-expiry") as HTMLInputElement;
    let productphoto = document.getElementById("product-photo") as HTMLInputElement;
    const itemCard = productphoto.files?.[0];
    let base64String: any = "";
    if (itemCard) {
        const reader = new FileReader();
        reader.readAsDataURL(itemCard);
        reader.onload = function (events) {
            base64String = events.target?.result as string;
            const newGrocery: GroceryDetails = {
                groceryID: undefined,
                groceryName: groceryname.value,
                count: Number(grocerycount.value),
                price: Number(groceryprice.value),
                purchaseDate: grocerymanufacture.value,
                expiryDate: groceryexpiry.value,
                itemPhoto: [base64String]
            }
            addGrocery(newGrocery);
            alert("Grocery details added..");
            renderGrocery();
        }
    }
}

function purchase() {
    (document.getElementById("home-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("grocery-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("purchase-div") as HTMLDivElement).style.display = "block";
    (document.getElementById("card-div") as HTMLDivElement).style.display = "none";

    (document.getElementById("histroy-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("balance-div") as HTMLDivElement).style.display = "none";
    renderPurchase();
}

async function renderPurchase() {
    let purchaseTable = document.getElementById("purchase-table") as HTMLLabelElement;
    purchaseTable.innerHTML = "";
    const grocery = await fetchGrocery();
    grocery.forEach(list => {
        const row = document.createElement('tr');
        row.innerHTML = `
                   <td>${list.groceryName}</td>
                   <td>${list.count}</td>
                   <td>${list.price}</td>
                   <td>${list.purchaseDate.split("T")[0].split("-").reverse().join("/")}</td>
                   <td>${list.expiryDate.split("T")[0].split("-").reverse().join("/")}</td>
                   <td><img src="${list.itemPhoto[0]}" class="item-photo"></td>
                   <td><button onclick="addToCart('${list.groceryID}')">Add to cart</button></td>
                 `;
        purchaseTable.appendChild(row);
    }
    )
}

async function addToCart(id: number) {
    const details = await fetchGrocery();
    editingCardID = id;
    details.forEach(list => {
        if (list.groceryID == id) {
            const newCart: Cart = {
                groceryID: list.groceryID,
                groceryName: list.groceryName,
                quantity: list.count,
                totalPrice: list.price,
                count: 0
            }
            cartList.push(newCart);
            alert("Added to cart")
        }
    }
    )
}
function renderCard() {
    (document.getElementById("count-div") as HTMLDivElement).style.display = "none";

    let cardTable = document.getElementById("card-table") as HTMLLabelElement;
    cardTable.innerHTML = "";

    cartList.forEach(list => {
        const row = document.createElement('tr');
        row.innerHTML = `
                   <td>${list.groceryName}</td>
                   <td>${list.quantity}</td>
                   <td>${list.totalPrice}</td>
                   <td><button onclick="addCount('${list.groceryID}')">count to add</button></td>
                   <td>${list.count}</td>
                     `;
        cardTable.appendChild(row);
    }
    )
}

function addCount(id: number) {
    (document.getElementById("count-div") as HTMLDivElement).style.display = "block";

    editingCardID = id;
}

function addCardCount() {
    let count = document.getElementById("count-histroy") as HTMLInputElement;
    confirmOrderList.length = 0;
    cartList.forEach(list => {
        if (list.groceryID == editingCardID) {
            if (list.quantity >= Number(count.value)) {
                let balance = list.totalPrice * Number(count.value)
                if (currentUser.balance >= balance) {
                    list.count = Number(count.value);
                    list.quantity -= Number(count.value);
                    count.value = "";
                    const newConfirmOrder: ConfirmOrder = {
                        groceryID: list.groceryID,
                        groceryName: list.groceryName,
                        groceryCount: list.count,
                        price: balance
                    }
                    confirmOrderList.push(newConfirmOrder);

                    renderCard();
                }
                else {
                    alert("Low balance")
                }
            }
            else {
                alert("Insuuficient Count");
            }
        }
    }
    )
}


async function buyItem() {
    const groceries = await fetchGrocery();
    let groceryIDs: number[] = [];
    let groceryNames: string[] = [];
    let groceryCounts: number[] = [];
    let groceryprice: number[] = [];
    let totalPriceAmount: number = 0;
    confirmOrderList.forEach(list => {
        groceryIDs.push(list.groceryID);
        groceryNames.push(list.groceryName);
        groceryCounts.push(list.groceryCount);
        groceryprice.push(list.price);
        totalPriceAmount += list.price;
    }
    )
    if (currentUser.balance >= totalPriceAmount) {
        const newOrder: OrderDetails =
        {
            orderID: undefined,
            groceryID: groceryIDs,
            userName: currentUser.userName,
            date: new Date(),
            groceryName: groceryNames,
            quantity: groceryCounts,
            pricePerQuantity: groceryprice,
            totalPrice: totalPriceAmount
        }
        addOrder(newOrder);
        currentUser.balance -= totalPriceAmount;
        updateUser(currentUser.userID, currentUser);
        groceries.forEach(list1 => {
            for (let i = 0; i < groceryIDs.length; i++) {
                if (groceryIDs[i] == list1.groceryID) {
                    const uGrocery: GroceryDetails = {
                        groceryID: groceryIDs[i],
                        groceryName: list1.groceryName,
                        count: groceryCounts[i],
                        price: list1.price,
                        purchaseDate: list1.purchaseDate,
                        expiryDate: list1.expiryDate,
                        itemPhoto: list1.itemPhoto
                    }
                    updateGrocery(list1.groceryID, uGrocery);
                }
            }
        }
        )

    }
    else {
        alert("Insufficient balance to order..");
    }
}

function showhistroy() {
    (document.getElementById("home-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("grocery-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("purchase-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("card-div") as HTMLDivElement).style.display = "none";

    (document.getElementById("histroy-div") as HTMLDivElement).style.display = "block";
    (document.getElementById("recharge-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("balance-div") as HTMLDivElement).style.display = "none";
    renderHistroy();

}
async function renderHistroy() {
   
    const orders = await fetchOrder()
    const cardView = document.getElementById("card-view") as HTMLInputElement;
    cardView.innerHTML="";
    orders.forEach(list => 
        {
        cardView.innerHTML += `
       <div id=card-views>
         <h2>OrderID: ${list.orderID}</h2>
         <h3>UserName : ${currentUser.userName}</h3>
         <table border="3">
          <thead>
            <th>GroceryName</th>
            <th>Quantity</th>
            <th>PricePerQunatity</th>
          </thead>
          <tbody id="${list.orderID}">
            
          <tbody>
         </table>
        <h5>${list.date}</h5>
        <h5>TotalPrice is :${list.totalPrice}</h5>
     </div>
    `
    const orderHistroyTable=document.getElementById(`${list.orderID}`) as HTMLTableSectionElement;
    orderHistroyTable.innerHTML="";
    orders.forEach(list=>
        {
        
             orderHistroyTable.innerHTML+= `<tr>
                   <td>${list.groceryName}</td>
                   <td>${list.quantity}</td>
                   <td>${list.pricePerQuantity}</td>
                   </tr>
                     `;
      
        }
    )
    }
    );
}




// async function addHistroy()
// {
//     const grocery=await fetchGrocery();

//     let count=document.getElementById("count-histroy") as HTMLInputElement;
//     cartList.forEach(list=>
//         {
//             if(list.groceryID==editingCardID)
//                 {
//                     if(list.quantity>=Number(count.value))
//                         {
//                              if(currentUser.balance>=list.totalPrice)
//                                 {
//                                     const newOrder:OrderDetails=
//                                     {
//                                         orderID:undefined,
//                                         userName:currentUser.userName,
//                                         groceryName:list.groceryName,
//                                         quantity:list.quantity,
//                                         totalPrice:list.totalPrice,
//                                         date:new Date()
//                                     };
//                                     addOrder(newOrder);
//                                     alert("Ordered an item Successfully...");
//                                     list.quantity-=Number(count.value)
//                                     grocery.forEach(list1=>
//                                         {
//                                             if(list1.groceryID==list.groceryID)
//                                                 {
//                                                     let newCount=list1.count-Number(count.value);
//                                                     const uGrocery:GroceryDetails={
//                                                         groceryID:list.groceryID,
//                                                         groceryName:list1.groceryName,
//                                                         count:newCount,
//                                                         price:list1.price,
//                                                         purchaseDate:list1.purchaseDate,
//                                                         expiryDate:list1.expiryDate,
//                                                         itemPhoto:list1.itemPhoto
//                                                     }
//                                                     updateGrocery(list1.groceryID,uGrocery);
//                                                 }
//                                         }
//                                     )
//                                 }
//                                 else{
//                                     alert("Insufficent balance to buy..")
//                                 }
//                         }
//                         else{
//                             alert("Not Available Count")
//                         }
//                 }
//         }
//     )
// }



function cart() {
    (document.getElementById("home-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("grocery-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("purchase-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("histroy-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("balance-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("card-div") as HTMLDivElement).style.display = "block";
    renderCard();


}

function recharge() {
    (document.getElementById("home-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("grocery-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("purchase-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("histroy-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge-div") as HTMLDivElement).style.display = "block";
    (document.getElementById("balance-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("card-div") as HTMLDivElement).style.display = "none";

}

function pay() {
    let amount = document.getElementById("recharge-amount") as HTMLInputElement;
    currentUser.balance += Number(amount.value);
    updateUser(currentUser.userID, currentUser);
    alert(`Amount ${amount.value} added to balance`);

}

function balance() {
    (document.getElementById("home-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("grocery-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("purchase-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("histroy-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("recharge-div") as HTMLDivElement).style.display = "none";
    (document.getElementById("balance-div") as HTMLDivElement).style.display = "block";
    (document.getElementById("card-div") as HTMLDivElement).style.display = "none";
    let showBalance = document.getElementById("show-balance") as HTMLLabelElement;
    showBalance.innerHTML = `The Current balance is ${currentUser.balance}`;

}

async function addUser(user: UserDetails): Promise<void> {
    const respone = await fetch('http://localhost:5104/api/userDetails', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!respone.ok) {
        throw new Error('Failed to add userDetails ');
    }
}

async function addGrocery(grocery: GroceryDetails): Promise<void> {
    const respone = await fetch('http://localhost:5104/api/groceryDetails', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(grocery)
    });
    if (!respone.ok) {
        throw new Error('Failed to add groceryDetails ');
    }
}

async function addOrder(order: OrderDetails): Promise<void> {
    const respone = await fetch('http://localhost:5104/api/orderDetails', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!respone.ok) {
        throw new Error('Failed to add orderDetails ');
    }
}


async function fetchUser(): Promise<UserDetails[]> {
    const apiURL = `http://localhost:5104/api/userDetails`;
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return await response.json();

}

async function fetchGrocery(): Promise<GroceryDetails[]> {
    const apiURL = `http://localhost:5104/api/groceryDetails`;
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error('Failed to fetch groceries');
    }
    return await response.json();

}

async function fetchOrder(): Promise<OrderDetails[]> {
    const apiURL = `http://localhost:5104/api/orderDetails`;
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return await response.json();

}

async function updateGrocery(id: number, grocery: GroceryDetails): Promise<void> {
    const response = await fetch(`http://localhost:5104/api/groceryDetails/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(grocery)
    });
    if (!response.ok) {
        throw new Error('Failed to Update groceryDetails ');
    }


}
async function updateUser(id: number, user: UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5104/api/userDetails/${id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error('Failed to Update groceryDetails ');
    }


}



