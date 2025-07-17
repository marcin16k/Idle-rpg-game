let level = 1, gold = 0, xp = 0, xpMax = 10;
let inventory = [], skills = [];
let stats = { strength: 0, crit: 0, points: 5 };

function updateUI() {
  document.getElementById("level").innerText = level;
  document.getElementById("gold").innerText = gold;
  document.getElementById("xp").innerText = xp;
  document.getElementById("xpMax").innerText = xpMax;
  document.getElementById("strength").innerText = stats.strength;
  document.getElementById("crit").innerText = stats.crit;
  document.getElementById("points").innerText = stats.points;
  document.getElementById("inventory").innerText = "Ekwipunek: " + (inventory.join(", ") || "(pusty)");
  document.getElementById("skills").innerText = "Czary: " + (skills.join(", ") || "(brak)");
}

function log(msg) {
  const el = document.getElementById("log");
  el.innerHTML += msg + "<br>";
  el.scrollTop = el.scrollHeight;
}

function addStat(stat) {
  if (stats.points > 0) {
    stats[stat]++;
    stats.points--;
    updateUI();
    save();
  }
}

function buyItem() {
  if (gold < 10) return log("Za mało złota!");
  const item = "Miecz Lv1";
  if (!inventory.includes(item)) {
    inventory.push(item);
    gold -= 10;
    log("Kupiono: " + item);
    updateUI();
    save();
  } else {
    log("Masz już ten przedmiot.");
  }
}

function buySpell() {
  if (gold < 30) return log("Za mało złota!");
  const spell = "Ognista Kula";
  if (!skills.includes(spell)) {
    skills.push(spell);
    gold -= 30;
    log("Nauczono: " + spell);
    updateUI();
    save();
  } else {
    log("Znasz już ten czar.");
  }
}

function fight() {
  let baseXP = Math.floor(Math.random() * 10) + 3 + stats.strength;
  let baseGold = Math.floor(Math.random() * 5) + 1;

  if (Math.random() < stats.crit * 0.01) baseXP *= 2;

  xp += baseXP;
  gold += baseGold;

  log(`Walka! +${baseXP} XP, +${baseGold} złota`);

  if (xp >= xpMax) {
    xp -= xpMax;
    level++;
    xpMax = Math.floor(xpMax * 1.2);
    stats.points += 2;
    log(`<strong>Awansowałeś na poziom ${level}!</strong>`);
  }

  updateUI();
  save();
}

function save() {
  const data = { level, gold, xp, xpMax, inventory, skills, stats };
  localStorage.setItem("idleRPG", JSON.stringify(data));
}

function load() {
  const data = JSON.parse(localStorage.getItem("idleRPG"));
  if (data) {
    ({ level, gold, xp, xpMax, inventory, skills, stats } = data);
  }
  updateUI();
}

load();
