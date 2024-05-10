"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let currentUser;
let editingCardID;
let confirmOrderList = [];
let cartList = [];
function signIn() {
    document.getElementById("sign-in").style.display = "block";
    document.getElementById("sign-up").style.display = "none";
}
function signUp() {
    document.getElementById("sign-up").style.display = "block";
    document.getElementById("sign-in").style.display = "none";
}
function signInSubmit() {
    var _a;
    let uName = document.getElementById("name-field");
    let uEmail = document.getElementById("email-field");
    let pwd = document.getElementById("confirm-password-field");
    let uphoto = document.getElementById("photo-field");
    const photoCard = (_a = uphoto.files) === null || _a === void 0 ? void 0 : _a[0];
    let base64String = "";
    if (photoCard) {
        const reader = new FileReader();
        reader.readAsDataURL(photoCard);
        reader.onload = function (events) {
            var _a;
            base64String = (_a = events.target) === null || _a === void 0 ? void 0 : _a.result;
            const newuser = {
                userID: undefined,
                userName: uName.value,
                emailID: uEmail.value,
                password: pwd.value,
                balance: 0,
                photo: [base64String]
            };
            addUser(newuser);
            alert("Successfully Sign in");
        };
    }
}
function signUpSubmit() {
    return __awaiter(this, void 0, void 0, function* () {
        let flag = true;
        let email1 = document.getElementById("email-field1");
        let password1 = document.getElementById("password-field1");
        const users = yield fetchUser();
        users.forEach(list => {
            if (list.emailID == email1.value && list.password == password1.value) {
                flag = false;
                currentUser = list;
                alert("Succesffuly Sign-in");
                navbar();
            }
        });
        if (flag) {
            alert("Invalid datas");
        }
    });
}
function navbar() {
    document.getElementById("homepage").style.display = "none";
    document.getElementById("menu-bar").style.display = "block";
}
function home() {
    document.getElementById("home-div").style.display = "block";
    document.getElementById("grocery-div").style.display = "none";
    document.getElementById("purchase-div").style.display = "none";
    document.getElementById("histroy-div").style.display = "none";
    document.getElementById("recharge-div").style.display = "none";
    document.getElementById("balance-div").style.display = "none";
    document.getElementById("card-div").style.display = "none";
    let msg = document.getElementById("msg");
    msg.innerHTML = `<h2>Welcome to Grocery Online Shop ${currentUser.userName}</h2>`;
    let photoAdd = document.getElementById("photo-add");
    photoAdd.innerHTML = `<img src=${currentUser.photo[0]} class="img-photo">`;
}
function groceryList() {
    document.getElementById("home-div").style.display = "none";
    document.getElementById("grocery-div").style.display = "block";
    document.getElementById("purchase-div").style.display = "none";
    document.getElementById("histroy-div").style.display = "none";
    document.getElementById("recharge-div").style.display = "none";
    document.getElementById("balance-div").style.display = "none";
    document.getElementById("card-div").style.display = "none";
    renderGrocery();
}
function renderGrocery() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("add-item").style.display = "none";
        let productTable = document.getElementById("product-table");
        productTable.innerHTML = "";
        const grocery = yield fetchGrocery();
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
        });
    });
}
function addItems() {
    document.getElementById("add-item").style.display = "block";
}
function enter() {
    var _a;
    let groceryname = document.getElementById("grocery-name");
    let grocerycount = document.getElementById("grocery-count");
    let groceryprice = document.getElementById("grocery-price");
    let grocerymanufacture = document.getElementById("grocery-purchase");
    let groceryexpiry = document.getElementById("grocery-expiry");
    let productphoto = document.getElementById("product-photo");
    const itemCard = (_a = productphoto.files) === null || _a === void 0 ? void 0 : _a[0];
    let base64String = "";
    if (itemCard) {
        const reader = new FileReader();
        reader.readAsDataURL(itemCard);
        reader.onload = function (events) {
            var _a;
            base64String = (_a = events.target) === null || _a === void 0 ? void 0 : _a.result;
            const newGrocery = {
                groceryID: undefined,
                groceryName: groceryname.value,
                count: Number(grocerycount.value),
                price: Number(groceryprice.value),
                purchaseDate: grocerymanufacture.value,
                expiryDate: groceryexpiry.value,
                itemPhoto: [base64String]
            };
            addGrocery(newGrocery);
            alert("Grocery details added..");
            renderGrocery();
        };
    }
}
function purchase() {
    document.getElementById("home-div").style.display = "none";
    document.getElementById("grocery-div").style.display = "none";
    document.getElementById("purchase-div").style.display = "block";
    document.getElementById("card-div").style.display = "none";
    document.getElementById("histroy-div").style.display = "none";
    document.getElementById("recharge-div").style.display = "none";
    document.getElementById("balance-div").style.display = "none";
    renderPurchase();
}
function renderPurchase() {
    return __awaiter(this, void 0, void 0, function* () {
        let purchaseTable = document.getElementById("purchase-table");
        purchaseTable.innerHTML = "";
        const grocery = yield fetchGrocery();
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
        });
    });
}
function addToCart(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const details = yield fetchGrocery();
        editingCardID = id;
        details.forEach(list => {
            if (list.groceryID == id) {
                const newCart = {
                    groceryID: list.groceryID,
                    groceryName: list.groceryName,
                    quantity: list.count,
                    totalPrice: list.price,
                    count: 0
                };
                cartList.push(newCart);
                alert("Added to cart");
            }
        });
    });
}
function renderCard() {
    document.getElementById("count-div").style.display = "none";
    let cardTable = document.getElementById("card-table");
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
    });
}
function addCount(id) {
    document.getElementById("count-div").style.display = "block";
    editingCardID = id;
}
function addCardCount() {
    let count = document.getElementById("count-histroy");
    confirmOrderList.length = 0;
    cartList.forEach(list => {
        if (list.groceryID == editingCardID) {
            if (list.quantity >= Number(count.value)) {
                let balance = list.totalPrice * Number(count.value);
                if (currentUser.balance >= balance) {
                    list.count = Number(count.value);
                    list.quantity -= Number(count.value);
                    count.value = "";
                    const newConfirmOrder = {
                        groceryID: list.groceryID,
                        groceryName: list.groceryName,
                        groceryCount: list.count,
                        price: balance
                    };
                    confirmOrderList.push(newConfirmOrder);
                    renderCard();
                }
                else {
                    alert("Low balance");
                }
            }
            else {
                alert("Insuuficient Count");
            }
        }
    });
}
function buyItem() {
    return __awaiter(this, void 0, void 0, function* () {
        const groceries = yield fetchGrocery();
        let groceryIDs = [];
        let groceryNames = [];
        let groceryCounts = [];
        let groceryprice = [];
        let totalPriceAmount = 0;
        confirmOrderList.forEach(list => {
            groceryIDs.push(list.groceryID);
            groceryNames.push(list.groceryName);
            groceryCounts.push(list.groceryCount);
            groceryprice.push(list.price);
            totalPriceAmount += list.price;
        });
        if (currentUser.balance >= totalPriceAmount) {
            const newOrder = {
                orderID: undefined,
                groceryID: groceryIDs,
                userName: currentUser.userName,
                date: new Date(),
                groceryName: groceryNames,
                quantity: groceryCounts,
                pricePerQuantity: groceryprice,
                totalPrice: totalPriceAmount
            };
            addOrder(newOrder);
            currentUser.balance -= totalPriceAmount;
            updateUser(currentUser.userID, currentUser);
            groceries.forEach(list1 => {
                for (let i = 0; i < groceryIDs.length; i++) {
                    if (groceryIDs[i] == list1.groceryID) {
                        const uGrocery = {
                            groceryID: groceryIDs[i],
                            groceryName: list1.groceryName,
                            count: groceryCounts[i],
                            price: list1.price,
                            purchaseDate: list1.purchaseDate,
                            expiryDate: list1.expiryDate,
                            itemPhoto: list1.itemPhoto
                        };
                        updateGrocery(list1.groceryID, uGrocery);
                    }
                }
            });
        }
        else {
            alert("Insufficient balance to order..");
        }
    });
}
function showhistroy() {
    document.getElementById("home-div").style.display = "none";
    document.getElementById("grocery-div").style.display = "none";
    document.getElementById("purchase-div").style.display = "none";
    document.getElementById("card-div").style.display = "none";
    document.getElementById("histroy-div").style.display = "block";
    document.getElementById("recharge-div").style.display = "none";
    document.getElementById("balance-div").style.display = "none";
    renderHistroy();
}
function renderHistroy() {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield fetchOrder();
        const cardView = document.getElementById("card-view");
        cardView.innerHTML = "";
        orders.forEach(list => {
            cardView.innerHTML += `
      <div id=card-views>
         <h2>${list.orderID}</h2>
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
    `;
            const orderHistroyTable = document.getElementById(`${list.orderID}`);
            orderHistroyTable.innerHTML = "";
            orders.forEach(list => {
                orderHistroyTable.innerHTML += `<tr>
                   <td>${list.groceryName}</td>
                   <td>${list.quantity}</td>
                   <td>${list.pricePerQuantity}</td>
                   </tr>
                     `;
            });
        });
    });
}
function cart() {
    document.getElementById("home-div").style.display = "none";
    document.getElementById("grocery-div").style.display = "none";
    document.getElementById("purchase-div").style.display = "none";
    document.getElementById("histroy-div").style.display = "none";
    document.getElementById("recharge-div").style.display = "none";
    document.getElementById("balance-div").style.display = "none";
    document.getElementById("card-div").style.display = "block";
    renderCard();
}
function recharge() {
    document.getElementById("home-div").style.display = "none";
    document.getElementById("grocery-div").style.display = "none";
    document.getElementById("purchase-div").style.display = "none";
    document.getElementById("histroy-div").style.display = "none";
    document.getElementById("recharge-div").style.display = "block";
    document.getElementById("balance-div").style.display = "none";
    document.getElementById("card-div").style.display = "none";
}
function pay() {
    let amount = document.getElementById("recharge-amount");
    currentUser.balance += Number(amount.value);
    updateUser(currentUser.userID, currentUser);
    alert(`Amount ${amount.value} added to balance`);
}
function balance() {
    document.getElementById("home-div").style.display = "none";
    document.getElementById("grocery-div").style.display = "none";
    document.getElementById("purchase-div").style.display = "none";
    document.getElementById("histroy-div").style.display = "none";
    document.getElementById("recharge-div").style.display = "none";
    document.getElementById("balance-div").style.display = "block";
    document.getElementById("card-div").style.display = "none";
    let showBalance = document.getElementById("show-balance");
    showBalance.innerHTML = `The Current balance is ${currentUser.balance}`;
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const respone = yield fetch('http://localhost:5104/api/userDetails', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!respone.ok) {
            throw new Error('Failed to add userDetails ');
        }
    });
}
function addGrocery(grocery) {
    return __awaiter(this, void 0, void 0, function* () {
        const respone = yield fetch('http://localhost:5104/api/groceryDetails', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(grocery)
        });
        if (!respone.ok) {
            throw new Error('Failed to add groceryDetails ');
        }
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const respone = yield fetch('http://localhost:5104/api/orderDetails', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!respone.ok) {
            throw new Error('Failed to add orderDetails ');
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = `http://localhost:5104/api/userDetails`;
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function fetchGrocery() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = `http://localhost:5104/api/groceryDetails`;
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch groceries');
        }
        return yield response.json();
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = `http://localhost:5104/api/orderDetails`;
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }
        return yield response.json();
    });
}
function updateGrocery(id, grocery) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5104/api/groceryDetails/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(grocery)
        });
        if (!response.ok) {
            throw new Error('Failed to Update groceryDetails ');
        }
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5104/api/userDetails/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to Update groceryDetails ');
        }
    });
}
//# sourceMappingURL=sample.js.map