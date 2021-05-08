// selecting elements
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

/* const dummyTransactions = [
  {
    id: 1,
    text: "Flower",
    amount: -20,
  },
  {
    id: 2,
    text: "Salary",
    amount: 300,
  },
  {
    id: 3,
    text: "Book",
    amount: -10,
  },
  {
    id: 4,
    text: "Camera",
    amount: 150,
  },
]; */

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// functions
// add transactions
function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("please add a text and amount");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };
    // pushing transaction into array
    transactions.push(transaction);

    // adding to the DOM
    addTransactionDOM(transaction);

    // updating values
    updateValues();

    // updating localStorage
    updateLocalStorage();

    // clearing inputs
    text.value = "";
    amount.value = "";
  }
}

// generate random id
function generateId() {
  return Math.floor(Math.random() * 1000000000);
}

// add transactions to DOM list
function addTransactionDOM(transaction) {
  // getting sign
  const sign = transaction.amount < 0 ? "-" : "+";
  // creating DOM element to transaction
  const item = document.createElement("li");
  // adding class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  // adding dynamic values to DOM element
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">x</button>
  `;
  // adding element to the DOM
  list.appendChild(item);
}

// update the balance, income and expense
function updateValues() {
  // getting amounts
  const amounts = transactions.map((transaction) => transaction.amount);
  //calculating total
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  // filtering income
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  // filtering expenses
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  // adding to the DOM
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// removing transaction by id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  //updating localStorage
  updateLocalStorage();

  init();
}

// update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// init app
function init() {
  // clearing view
  list.innerHTML = "";
  // adding each transaction to the DOM
  transactions.forEach(addTransactionDOM);
  //updating values
  updateValues();
}

init();

// event listeners

form.addEventListener("submit", addTransaction);
