const form = document.querySelector("form");
const rows = document.getElementById("rows");
const columns = document.getElementById("columns");
const submitButton = document.querySelector("form button");
const tableContainer = document.getElementById("table-container");

const isOdd = (num) => num % 2;
const isGreaterThan = (num, minNum) => num > minNum;

function allInputsFilled() {
  const inputs = document.querySelectorAll("table input");
  const arrayInputs = [...inputs];
  return arrayInputs.every((inp) => inp.value.trim() !== "");
}
function sortEachRow() {
  const rows = document.querySelectorAll("table tbody tr");
  rows.forEach((row, index) => {
    const inputs = row.querySelectorAll("input");
    const arrayInputs = [...inputs];
    const allFilled = arrayInputs.every((inp) => inp.value.trim() !== "");
    if (allFilled) {
      const numbers = arrayInputs.map((inp) => Number(inp.value));
      const sorted =
        index % 2
          ? numbers.sort((a, b) => b - a)
          : numbers.sort((a, b) => a - b);
      arrayInputs.forEach((inp, i) => (inp.value = sorted[i]));
    }
  });
}

function createTable(rows, columns) {
  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  for (let i = 1; i <= rows.value; i++) {
    const tr = document.createElement("tr");
    for (let j = 1; j <= columns.value; j++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = `rows${i} - columns${j}`;
      input.addEventListener("change", function () {
        if (allInputsFilled()) {
          sortEachRow();
        } else {
          const rowInputs = [...tr.querySelectorAll("input")];
          if (rowInputs.every((inp) => inp.value.trim() !== "")) sortEachRow();
        }
      });
      td.append(input);
      tr.append(td);
    }
    tbody.append(tr);
    table.append(tbody);
  }
  return table;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  tableContainer.innerHTML = "";
  if (rows.value && columns.value) {
    if (isOdd(rows.value) && isOdd(columns.value)) {
      if (!isGreaterThan(rows.value, 3) || !isGreaterThan(columns.value, 3)) {
        alert("rows and columns must be greater than 3");
        return;
      }
      const table = createTable(rows, columns);
      tableContainer.append(table);
    } else {
      alert("both values must be odd");
    }
  } else {
    alert("values are nessaccary");
  }
});
