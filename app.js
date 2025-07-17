// Zmienna na śledzenie poziomu i ekwipunku gracza
let playerLevel = 1;
let playerGold = 0;

// Funkcja do aktualizacji UI
function updateUI() {
  document.getElementById('level').innerText = `Poziom: ${playerLevel}`;
  document.getElementById('inventory').innerHTML = `Złoto: ${playerGold}`;
}

// Funkcja do symulacji bitwy
function startBattle() {
  // Symulacja walki z potworem
  let damage = Math.floor(Math.random() * 10) + 1; // losowe obrażenia
  playerGold += damage; // dodajemy złoto do ekwipunku
  playerLevel++; // zwiększamy poziom gracza
  updateUI();
}

// Dodanie przycisku walki
document.getElementById('battle').innerHTML = `
  <button onclick="startBattle()">Zacznij walkę</button>
`;

// Początkowa aktualizacja UI
updateUI();
