import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://expenses-manager-6a8f8-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const expensesRef = ref(database, "expensesList");

const addButtonEl = document.getElementById("add-btn");
const tableBody = document.getElementById("table-body");
const logBtnEl = document.getElementById("log-btn");
const removeBtnEl = document.getElementById("remove-btn");
let sumTotal = 0;

const addExpenseInput = () => {
  const newRow = tableBody.insertRow();

  const cells = Array.from({ length: 4 }, () => newRow.insertCell());

  cells[0].innerHTML = `<input type='text' class='item-name'>`;
  cells[1].innerHTML = "<input type='number' min='0' class='unit-price'>";
  cells[2].innerHTML = "<input type='number' min='0' class='quantity'>";
  cells[3].innerHTML = "<input type='text' class='total' disabled value='0'>";
};

const calculateTotal = () => {
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row) => {
    const unitPrice = parseFloat(row.querySelector(".unit-price").value);
    const quantity = parseInt(row.querySelector(".quantity").value);
    const total = unitPrice * quantity;
    row.querySelector(".total").value = total.toFixed(3);
  });

  const overallTotal = Array.from(rows).reduce((sum, row) => {
    return sum + parseFloat(row.querySelector(".total").value);
  }, 0);

  sumTotal = +overallTotal.toFixed(3);
  document.getElementById("total-result").textContent = overallTotal.toFixed(3);
};

const clearTable = () => {
  tableBody.innerHTML = "";
  sumTotal = 0;
  document.getElementById("total-result").textContent = sumTotal;
};

const detailedExpenses = () => {
  const rows = tableBody.querySelectorAll("tr");
  const detailedExpenses = [];
  rows.forEach((row) => {
    const expense = {
      item: row.querySelector(".item-name").value,
      unitPrice: row.querySelector(".unit-price").value,
      quantity: row.querySelector(".quantity").value,
      total: row.querySelector(".total").value,
    };
    detailedExpenses.push(expense);
  });
  return detailedExpenses;
};

const logExpenses = () => {
  const currentDate = new Date().toLocaleDateString();
  const total = document.getElementById("total-result").textContent;
  const expense = {
    date: currentDate,
    total: total,
    expenses: detailedExpenses(),
  };

  push(expensesRef, expense);
  clearTable();
};

const removeLastRow = () => {
  tableBody.deleteRow(-1);
  calculateTotal();
};

tableBody.addEventListener("input", calculateTotal);
addButtonEl.addEventListener("click", addExpenseInput);
logBtnEl.addEventListener("click", logExpenses);
removeBtnEl.addEventListener("click", removeLastRow);
