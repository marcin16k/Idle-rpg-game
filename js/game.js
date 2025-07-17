
// Dane gry
let data = JSON.parse(localStorage.getItem("idleRpgData")) || {
  username: "Gość",
  level: 1,
  xp: 0,
  xpMax: 10,
  gold: 0,
  statPoints: 0,
  stats: { strength: 0, crit: 0 },
  inventory: [],
  skills: []
};

// Lista potworów z grafiką i statystykami
const allMonsters = [
  { name: "Potwór 1", img: "assets/monsters/monster_1.png", hp: 30, attack: 5 },
  { name: "Potwór 2", img: "assets/monsters/monster_2.png", hp: 40, attack: 7 },
  { name: "Potwór 3", img: "assets/monsters/monster_3.png", hp: 50, attack: 8 },
  { name: "Potwór 4", img: "assets/monsters/monster_4.png", hp: 60, attack: 10 },
  { name: "Potwór 5", img: "assets/monsters/monster_5.png", hp: 75, attack: 12 },
  { name: "Potwór 6", img: "assets/monsters/monster_6.png", hp: 100, attack: 15 }
];

// Funkcja aktualizacji UI
function updateUI() {
  document.getElementById("level").innerText = data.level;
  document.getElementById("xp").innerText = data.xp;
  document.getElementById("xpMax").innerText = data.xpMax;
  document.getElementById("gold").innerText = data.gold;
  document.getElementById("strength").innerText = data.stats.strength;
  document.getElementById("crit").innerText = data.stats.crit;
  document.getElementById("statPoints").innerText = data.statPoints;

  const invList = document.getElementById("inventoryList");
  invList.innerHTML = "";
  data.inventory.forEach(item => {
    let li = document.createElement("li");
    li.innerText = `${item.name} (Poziom ${item.level})`;
    invList.appendChild(li);
  });

  const skillsList = document.getElementById("skillsList");
  skillsList.innerHTML = "";
  data.skills.forEach(spell => {
    let li = document.createElement("li");
    li.innerText = spell.name;
    skillsList.appendChild(li);
  });
}

// Walka automatyczna z potworem
function fight() {
  const monster = allMonsters[Math.floor(Math.random() * allMonsters.length)];
  document.getElementById("monsterImage").src = monster.img;
  document.getElementById("monsterImage").alt = monster.name;

  let xpGain = Math.floor(Math.random() * 10) + 5 + data.stats.strength;
  let goldGain = Math.floor(Math.random() * 5) + 1;

  if (Math.random() < data.stats.crit * 0.01) xpGain *= 2;

  data.xp += xpGain;
  data.gold += goldGain;

  while (data.xp >= data.xpMax) {
    data.xp -= data.xpMax;
    data.level++;
    data.xpMax = Math.floor(data.xpMax * 1.25);
    data.statPoints += 1;
  }

  updateUI();
  saveGame();
}

// Dodanie punktów statystyk
function addStat(stat) {
  if (data.statPoints > 0) {
    data.stats[stat]++;
    data.statPoints--;
    updateUI();
    saveGame();
  }
}

// Kupowanie przedmiotu
function buyItem() {
  if (data.gold >= 10) {
    const item = {
      name: "Miecz Lv." + data.level,
      level: data.level
    };
    data.inventory.push(item);
    data.gold -= 10;
    updateUI();
    saveGame();
  }
}

// Kupowanie czaru
function buySpell() {
  if (data.gold >= 30) {
    const spell = {
      name: "Czar Lv." + data.level
    };
    data.skills.push(spell);
    data.gold -= 30;
    updateUI();
    saveGame();
  }
}

// Zapisz i wczytaj
function saveGame() {
  localStorage.setItem("idleRpgData", JSON.stringify(data));
}

function loadGame() {
  const saved = localStorage.getItem("idleRpgData");
  if (saved) data = JSON.parse(saved);
  updateUI();
}

// Uruchomienie
window.onload = () => {
  loadGame();
  setInterval(fight, 5000);
};
