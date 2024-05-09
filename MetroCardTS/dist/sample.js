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
let emailStatus = false;
let passwordStatus = false;
let phonenumberStatus = false;
let nameStatus = false;
let editingId;
let currentUser;
let userList = [];
let travelList = [];
let ticketList = [];
function validateUser() {
    let name = document.getElementById("username-field");
    let show = document.getElementById("username-error");
    let regx = /^[a-zA-z]/;
    if (regx.test(name.value)) {
        show.innerHTML = "valid";
        show.style.color = "green";
        nameStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid email";
        show.style.color = "red";
    }
}
function validateEmail() {
    let email = document.getElementById("email-field");
    let show = document.getElementById("email-error");
    let regx = /^([\w\.-]+)@([\w-]+)\.([a-z])/;
    if (regx.test(email.value)) {
        show.innerHTML = "valid";
        show.style.color = "green";
        emailStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid email";
        show.style.color = "red";
    }
}
function validatePassword() {
    let password = document.getElementById("password-field");
    let show = document.getElementById("password-error");
    let regx = /\d{5,10}/;
    if (regx.test(password.value)) {
        show.innerHTML = "valid";
        show.style.color = "green";
    }
    else {
        show.innerHTML = "Please enter a valid password";
        show.style.color = "red";
    }
}
function validateConfirmPwd() {
    let confirmpwd = document.getElementById("confirm-password-field");
    let show = document.getElementById("confirm-password-error");
    let password = document.getElementById("password-field");
    if (password.value === confirmpwd.value) {
        show.innerHTML = "valid";
        show.style.color = "green";
        passwordStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid password";
        show.style.color = "red";
    }
}
function validatePhone() {
    let phone = document.getElementById("phonenumber-field");
    let show = document.getElementById("phonenumber-error");
    let regx = /^[8-9]\d{9}/;
    if (regx.test(phone.value)) {
        show.innerHTML = "valid";
        show.style.color = "green";
        phonenumberStatus = true;
    }
    else {
        show.innerHTML = "Please enter a valid phonenumber";
        show.style.color = "red";
    }
}
function homepage() {
    let homePage = document.getElementById("homepage");
    homePage.style.display = "block";
    let signUpPage = document.getElementById("sign-up");
    signUpPage.style.display = "none";
}
function SignUp() {
    let homePage = document.getElementById("homepage");
    homePage.style.display = "none";
    let signUpPage = document.getElementById("sign-up");
    signUpPage.style.display = "block";
}
function SignIn() {
    let homePage = document.getElementById("homepage");
    homePage.style.display = "none";
    document.getElementById("sign-in").style.display = "block";
    renderUser();
}
function renderUser() {
    return __awaiter(this, void 0, void 0, function* () {
        let userTable = document.getElementById("user-table");
        userTable.innerHTML = " ";
        const users = yield fetchUser();
        users.forEach((list) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td> ${list.userName}</td>
            <td> ${list.emailID}</td>
            
            `;
            userTable.appendChild(row);
        });
    });
}
function SignUpSubmit() {
    if (emailStatus == true && phonenumberStatus == true && passwordStatus == true && nameStatus == true) {
        let UserName = document.getElementById("username-field");
        let email = document.getElementById("email-field");
        let phoneNumber = document.getElementById("phonenumber-field");
        let pwd = document.getElementById("confirm-password-field");
        const newUser = {
            cardNumbers: undefined,
            userName: UserName.value,
            balance: 0,
            emailID: email.value,
            phone: phoneNumber.value,
            password: pwd.value
        };
        addUser(newUser);
        homepage();
    }
}
function SignInSubmit() {
    return __awaiter(this, void 0, void 0, function* () {
        let userEmail = document.getElementById("useremail-field1");
        let userpwd = document.getElementById("password-field1");
        let flag = true;
        const users = yield fetchUser();
        users.forEach(list => {
            if (userEmail.value == list.emailID && userpwd.value == list.password) {
                flag = false;
                currentUser = list;
                alert("Heading into methods");
                navbar();
            }
        });
        if (flag) {
            alert("Enter valid datas");
        }
    });
}
function navbar() {
    let signInPage = document.getElementById("sign-in");
    signInPage.style.display = "none";
    let navBar = document.getElementById("nav-bar");
    navBar.style.display = "block";
    let showName = document.getElementById("showName");
    showName.innerHTML = `Welcome <h4>${currentUser.userName}</h4>`;
}
function modify() {
    document.getElementById("modify").style.display = "block";
    document.getElementById("ticket-fair").style.display = "none";
    document.getElementById("travel-histroy").style.display = "none";
    document.getElementById("recharge").style.display = "none";
    document.getElementById("balance").style.display = "none";
    renderModifyTicket();
}
function renderModifyTicket() {
    return __awaiter(this, void 0, void 0, function* () {
        document.getElementById("edit-tickets").style.display = "none";
        let modifyTable = document.getElementById("modify-table");
        modifyTable.innerHTML = "";
        const tickets = yield fetchTicket();
        tickets.forEach((list) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td> ${list.ticketID}</td>
            <td> ${list.fromLocation}</td>
            <td> ${list.toLocation}</td>
            <td> ${list.fair}</td>
            <td><button onclick="Edit('${list.ticketID}')">Edit</button>
            <button onclick="deleteTicket('${list.ticketID}')">Delete</button></td>
            
            `;
            modifyTable.appendChild(row);
        });
    });
}
function deleteTicket(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5016/api/TicketDetails/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to deleteMedicine');
        }
        renderModifyTicket();
    });
}
function Edit(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let show = document.getElementById("edit-tickets");
        show.style.display = "block";
        let FromLocation = document.getElementById("from-location");
        let ToLocation = document.getElementById("to-location");
        let fairModify = document.getElementById("fair");
        editingId = id;
        const tickets = yield fetchTicket();
        tickets.forEach(list => {
            if (list.ticketID == id) {
                FromLocation.value = list.fromLocation;
                ToLocation.value = list.toLocation;
                fairModify.value = String(list.fair);
            }
        });
    });
}
function checkModify() {
    let FromLocation = document.getElementById("from-location");
    let ToLocation = document.getElementById("to-location");
    let fairModify = document.getElementById("fair");
    const newTicket = {
        ticketID: editingId,
        fromLocation: FromLocation.value,
        toLocation: ToLocation.value,
        fair: Number(fairModify.value)
    };
    updateTicket(editingId, newTicket);
}
function ticketFair() {
    document.getElementById("modify").style.display = "none";
    document.getElementById("ticket-fair").style.display = "block";
    document.getElementById("travel-histroy").style.display = "none";
    document.getElementById("recharge").style.display = "none";
    document.getElementById("balance").style.display = "none";
    renderTicket();
}
function renderTicket() {
    return __awaiter(this, void 0, void 0, function* () {
        let ticketTable = document.getElementById("ticket-table");
        ticketTable.innerHTML = "";
        const tickets = yield fetchTicket();
        tickets.forEach((list) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td> ${list.ticketID}</td>
            <td> ${list.fromLocation}</td>
            <td> ${list.toLocation}</td>
            <td> ${list.fair}</td>
            <td><button onclick="enter('${list.ticketID}')">Book</button></td>
            `;
            ticketTable.appendChild(row);
        });
    });
}
function enter(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const tickets = yield fetchTicket();
        tickets.forEach((list) => {
            if (list.ticketID == id) {
                if (currentUser.balance >= list.fair) {
                    const newTravel = {
                        travelID: undefined,
                        cardNumber: currentUser.cardNumbers,
                        fromLocation: list.fromLocation,
                        toLocation: list.toLocation,
                        date: new Date(),
                        travelCost: list.fair
                    };
                    addTravel(newTravel);
                    currentUser.balance -= list.fair;
                    updateUser(currentUser.cardNumbers, currentUser);
                    alert("Travel Booked..");
                }
                else {
                    alert("You have low balance..");
                }
            }
        });
    });
}
function travelHistroy() {
    document.getElementById("modify").style.display = "none";
    document.getElementById("ticket-fair").style.display = "none";
    document.getElementById("travel-histroy").style.display = "block";
    document.getElementById("recharge").style.display = "none";
    document.getElementById("balance").style.display = "none";
    renderTravel();
}
function renderTravel() {
    return __awaiter(this, void 0, void 0, function* () {
        let travelTable = document.getElementById("travel-table");
        travelTable.innerHTML = "";
        const travels = yield fetchTravel();
        travels.forEach((list) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td> ${list.travelID}</td>
            <td> ${list.cardNumber}</td>
            <td> ${list.fromLocation}</td>
            <td> ${list.toLocation}</td>
            <td> ${list.date}</td>
            <td> ${list.travelCost}</td>
             `;
            travelTable.appendChild(row);
        });
    });
}
function recharge() {
    document.getElementById("modify").style.display = "none";
    document.getElementById("ticket-fair").style.display = "none";
    document.getElementById("travel-histroy").style.display = "none";
    document.getElementById("recharge").style.display = "block";
    document.getElementById("balance").style.display = "none";
}
function amount() {
    let rechargeAmount = document.getElementById("recharge-amount");
    currentUser.balance += Number(rechargeAmount.value);
    alert(`Amount ${rechargeAmount.value} added to your balance`);
    updateUser(currentUser.cardNumbers, currentUser);
}
function balance() {
    document.getElementById("modify").style.display = "none";
    document.getElementById("ticket-fair").style.display = "none";
    document.getElementById("travel-histroy").style.display = "none";
    document.getElementById("recharge").style.display = "none";
    document.getElementById("balance").style.display = "block";
    let showBalance = document.getElementById("show-balance");
    showBalance.innerHTML = `The User ${currentUser.userName} balance is ${currentUser.balance}`;
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const respone = yield fetch('http://localhost:5016/api/userDetails', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!respone.ok) {
            throw new Error('Failed to add UserDetails ');
        }
    });
}
function addTravel(travel) {
    return __awaiter(this, void 0, void 0, function* () {
        const respone = yield fetch('http://localhost:5016/api/TravelDetails', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(travel)
        });
        if (!respone.ok) {
            throw new Error('Failed to add travelDetails ');
        }
    });
}
function addticket(ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const respone = yield fetch('http://localhost:5016/api/TicketDetails', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });
        if (!respone.ok) {
            throw new Error('Failed to add travelDetails ');
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = `http://localhost:5016/api/userDetails`;
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return yield response.json();
    });
}
function fetchTravel() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = `http://localhost:5016/api/TravelDetails`;
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch travels');
        }
        return yield response.json();
    });
}
function fetchTicket() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiURL = `http://localhost:5016/api/TicketDetails`;
        const response = yield fetch(apiURL);
        if (!response.ok) {
            throw new Error('Failed to fetch tickets');
        }
        return yield response.json();
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5016/api/userDetails/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to Update medicineDetails ');
        }
    });
}
function updateTicket(id, ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5016/api/ticketDetails/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });
        if (!response.ok) {
            throw new Error('Failed to Update medicineDetails ');
        }
        renderModifyTicket();
    });
}
//# sourceMappingURL=sample.js.map