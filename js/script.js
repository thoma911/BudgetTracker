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
