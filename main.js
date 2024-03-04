import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://expenses-manager-6a8f8-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const ExpensesDataBase = ref(database, "expensesList");

const addButtonEl = document.getElementById("add-btn");

const addExpenseInput = () => {
  const tableBody = document.getElementById("table-body");
  const newRow = document.createElement("tr");
  const newCell1 = document.createElement("td");
  const newCell2 = document.createElement("td");
  const newCell3 = document.createElement("td");
  const newCell4 = document.createElement("td");
  const newSelect = document.createElement("select");
  const newOption0 = document.createElement("option");
  const newOption1 = document.createElement("option");
  const newOption2 = document.createElement("option");
  const newInput1 = document.createElement("input");
  const newInput2 = document.createElement("input");
  const newInput3 = document.createElement("input");

  newOption0.value = "";
  newOption0.textContent = "Select Item";
  newOption1.value = "Item 1";
  newOption1.textContent = "1";
  newOption2.value = "Item 2";
  newOption2.textContent = "2";
  newSelect.appendChild(newOption0);
  newSelect.appendChild(newOption1);
  newSelect.appendChild(newOption2);
  newCell1.appendChild(newSelect);

  newInput1.type = "number";
  newInput1.min = "0";

  newInput1.classList.add("unit-price");
  newCell2.appendChild(newInput1);

  newInput2.type = "number";
  newInput2.min = "0";
  newInput2.classList.add("quantity");
  newCell3.appendChild(newInput2);

  newInput3.type = "text";
  newInput3.classList.add("total");
  newInput3.disabled = true;
  newInput3.value = "0";
  newCell4.appendChild(newInput3);

  newRow.appendChild(newCell1);
  newRow.appendChild(newCell2);
  newRow.appendChild(newCell3);
  newRow.appendChild(newCell4);

  tableBody.appendChild(newRow);
};

addButtonEl.addEventListener("click", addExpenseInput);
