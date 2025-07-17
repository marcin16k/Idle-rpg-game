// save.js

function saveGame() {
  localStorage.setItem("idleRpgData", JSON.stringify(data));
}

function loadGame() {
  const saved = localStorage.getItem("idleRpgData");
  if (saved) {
    data = JSON.parse(saved);
  }
  updateUI();
}
