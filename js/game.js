// game.js

let data = JSON.parse(localStorage.getItem("idleRpgData")) || {
  level: 1,
  xp: 0,
  xpMax: 10,
  gold: 0,
  statPoints: 0,
  stats: { strength: 0, crit: 0 },
  inventory: [],
  skills: []
};

function saveGame() {
  localStorage.setItem("idleRpgData", JSON.stringify(data));
}

function addStat(stat) {
  if (data.statPoints > 0) {
    data.stats[stat]++;
    data.statPoints--;
    updateUI();
    saveGame();
  }
}

function buyItem() {
  if (data.gold >= 10) {
    data.gold -= 10;
    const item = { name: "Miecz Lv." + data.level, level: data.level };
    data.inventory.push(item);
    log(`Kupiono przedmiot: ${item.name}`);
    updateUI();
    saveGame();
  } else {
    log("Za mało złota!");
  }
}

function buySpell() {
  if (data.gold >= 30) {
    data.gold -= 30;
    const spell = { name: "Czar Lv." + data.level };
    data.skills.push(spell);
    log(`Nauczono czar: ${spell.name}`);
    updateUI();
    saveGame();
  } else {
    log("Za mało złota!");
  }
}

function fight() {
  let baseXP = 5 + data.stats.strength;
  let baseGold = 2 + Math.floor(Math.random() * 5);

  if (Math.random() < data.stats.crit * 0.01) {
    baseXP *= 2;
    log("Krytyczne trafienie!");
  }

  data.xp += baseXP;
  data.gold += baseGold;
  log(`Zwycięstwo! +${baseXP} XP, +${baseGold} złota.`);

  while (data.xp >= data.xpMax) {
    data.xp -= data.xpMax;
    data.level++;
    data.xpMax = Math.floor(data.xpMax * 1.2);
    data.statPoints += 1;
    log(`Awans na poziom ${data.level}!`);
  }

  updateUI();
  saveGame();
}

function log(msg) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += msg + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}
