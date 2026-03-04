// ===============================
// Budget Tracker – Week 4 START
// Onderwerp: Tabs (navigatie)
// ===============================
//
// In dit startbestand:
// - De HTML-structuur met tabs is al aanwezig
// - Je kunt wisselen tussen:
//   * Transacties
//   * Abonnementen
//   * Komende betalingen
//
// JIJ gaat in week 4:
// - functionaliteit toevoegen per tab
// - abonnementen opslaan
// - datumlogica maken
// - komende betalingen berekenen




// storage helpers
const storage_key = "budgetTrackerState";

function saveState(state) {
    try {
        localStorage.setItem(storage_key, JSON.stringify(state));
    } catch (err) {
        console.warn("Opslaan mislukt:", err);
        // setnotice is not defined yet; log to console instead
        console.warn("Opslaan mislukt: (localstorage niet beschikbaar).");
    }
}

function loadState() {
    try {
        const raw = localStorage.getItem(storage_key);
        if (!raw) return createDefaultState();
        return JSON.parse(raw);
    } catch (err) {
        console.warn("Inladen mislukt:", err);
        return createDefaultState();
    }
}

function createDefaultState() {
    // placeholder for default structure
    return {
        transactions: [],
        subscriptions: []
    };
}

// try loading state now (for possible future use)
const state = loadState();

// start with transactions from state if available
const transactions = state.transactions || [];

// Select elements
const form = document.getElementById("txForm");
const listEl = document.getElementById("txList");

const dateInput = document.getElementById("date");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const categoryInput = document.getElementById("category");

// Handle form submit
form.addEventListener("submit", (e) => {
  e.preventDefault(); // voorkomt pagina refresh

  // basic validation
  if (
    !dateInput.value ||
    !amountInput.value ||
    !categoryInput.value.trim()
  ) {
    return;
  }
// Maak een nieuw transactie-object
  const newTransaction = {
    id: "tx_" + Date.now(),
    date: dateInput.value,
    amount: Number(amountInput.value),
    type: typeInput.value,
    category: categoryInput.value.trim()
  };

  // Voeg toe aan de transacties array
  transactions.push(newTransaction);

  // Update de UI
  renderTransactions();

  // clear form
  form.reset();
});

// Render transactions to the list
function renderTransactions() {
  listEl.innerHTML = ""; // maak lijst eerst leeg

  transactions.forEach((tx) => {
    const li = document.createElement("li");

    li.textContent = `${tx.date} — ${tx.category} — ${tx.type} — €${tx.amount}`;

    // ✏️ Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      editTransaction(tx.id);
    });

    // 🗑 Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteTransaction(tx.id);
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    listEl.appendChild(li);
  });
}
// Delete function
function deleteTransaction(id) {
  const index = transactions.findIndex((tx) => tx.id === id);

  if (index !== -1) {
    transactions.splice(index, 1);
    renderTransactions();
  }
}

// Edit function
function editTransaction(id) {
  const tx = transactions.find((tx) => tx.id === id);

  if (!tx) return;

  // Fill form with existing values
  dateInput.value = tx.date;
  amountInput.value = tx.amount;
  typeInput.value = tx.type;
  categoryInput.value = tx.category;

  // Remove old transaction (will be re-added when form is submitted)
  deleteTransaction(id);
}

// Initial render
renderTransactions();

// Alle tab-knoppen ophalen
const tabButtons = document.querySelectorAll("nav button");

// Alle tab-secties ophalen
const tabs = document.querySelectorAll(".tab");

// Functie om een tab actief te maken
function showTab(tabName) {
  tabs.forEach(tab => {
    // Toon alleen de gekozen tab
    tab.hidden = tab.id !== tabName;
  });
}

// Event listeners toevoegen aan de knoppen
tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    const tabName = button.dataset.tab;
    showTab(tabName);
  });
});

// Start standaard op transacties
showTab("transactions");

