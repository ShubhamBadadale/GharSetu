/*********************************
 * SIDEBAR + BACKDROP
 *********************************/
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
const backdrop = document.getElementById("backdrop");

menuBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
  backdrop.classList.add("show");
});

function closeSidebar() {
  sidebar.classList.remove("open");
  backdrop.classList.remove("show");
}

closeBtn.addEventListener("click", closeSidebar);
backdrop.addEventListener("click", closeSidebar);

/*********************************
 * GREETING (Home page only)
 *********************************/
const greeting = document.getElementById("greeting");
const username = localStorage.getItem("username");

if (greeting && username) {
  greeting.textContent = `Hello ${username}`;
}

/*********************************
 * FINAL TABLE + TOTAL LOGIC
 *********************************/
const finalTableBody = document.getElementById("finalTableBody");
const totalAmountEl = document.getElementById("totalAmount");

/* Build table ONLY when selection / qty changes */
function buildFinalTable() {
  const tbody = document.getElementById("finalTableBody");
  tbody.innerHTML = "";

  let index = 1;

  document.querySelectorAll(".grocery-item").forEach(item => {
    const checkbox = item.querySelector(".item-check");
    if (!checkbox.checked) return;

    const name = item.querySelector(".item-name").innerText;
    const qty = Number(item.querySelector(".qty-wheel").value) || 0;

    // 👇 THIS is the key line
    const plannedPrice =
      Number(item.querySelector(".price-input").value) || 0;

    const tr = document.createElement("tr");
    tr.dataset.qty = qty;

    tr.innerHTML = `
      <td><input type="checkbox" class="purchased-check"></td>
      <td>${index}</td>
      <td class="item-cell">${name}</td>
      <td>${qty}</td>
      <td>
        <input
          type="number"
          class="table-price"
          value="${plannedPrice}"
          min="0"
        >
      </td>
      <td class="row-total">
        ₹ ${(qty * plannedPrice).toFixed(2)}
      </td>
    `;

    // Purchased toggle
    tr.querySelector(".purchased-check").addEventListener("change", e => {
      tr.classList.toggle("purchased", e.target.checked);
    });

    // Update price at shop
    tr.querySelector(".table-price").addEventListener("input", e => {
      const newPrice = Number(e.target.value) || 0;

      tr.querySelector(".row-total").textContent =
        `₹ ${(qty * newPrice).toFixed(2)}`;

      recalculateTotalOnly();
    });

    tbody.appendChild(tr);
    index++;
  });

  recalculateTotalOnly();
}


/* Recalculate total ONLY (no DOM rebuild) */
function recalculateTotalOnly() {
  let total = 0;

  document.querySelectorAll("#finalTableBody tr").forEach(row => {
    const qty = Number(row.dataset.qty) || 0;
    const price =
      Number(row.querySelector(".table-price").value) || 0;

    total += qty * price;
  });

  document.getElementById("totalAmount").textContent =
    total.toFixed(2);
}


/*********************************
 * INPUT LISTENERS
 *********************************/
document.querySelectorAll(".item-check, .qty-wheel").forEach(el => {
  el.addEventListener("change", buildFinalTable);
  el.addEventListener("input", buildFinalTable);
});

/*********************************
 * DISABLE FIELDS UNTIL CHECKED
 *********************************/
document.querySelectorAll(".grocery-item").forEach(item => {
  const checkbox = item.querySelector(".item-check");
  const qty = item.querySelector(".qty-wheel");
  const price = item.querySelector(".price-input");

  function toggleFields() {
    qty.disabled = !checkbox.checked;
    price.disabled = !checkbox.checked;
  }

  checkbox.addEventListener("change", toggleFields);
  toggleFields();
});
