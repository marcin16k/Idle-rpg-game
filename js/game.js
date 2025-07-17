let data = JSON.parse(localStorage.getItem("idleRpgData")) || {
  level: 1,
  xp: 0,
  xpMax: 10,
  gold: 0,
  points: 0,
  stats: { strength: 0, crit: 0 },
  inventory: [],
  skills: []
};

const items = ["Miecz", "Tarcza", "Zbroja"];
const spells = ["Ognista Kula", "Magiczna Tarcza"];

function updateUI() {
  document.getElementById("level").innerText = data.level;
  document.getElementById("xp").innerText = data.xp;
  document.getElementById("xpMax").innerText = data.xpMax;
  document.getElementById("gold").innerText = data.gold;
  document.getElementById("strength").innerText = data.stats.strength;
  document.getElementById("crit").innerText = data.stats.crit;
  document.getElementById("points").innerText = data.points;

  document.getElementById("inventory").innerHTML = data.inventory.map(i => `<li>${i}</li>`).join("");
  document.getElementById("skills").innerHTML = data.skills.map(s => `<li>${s}</li>`).join("");
}

function log(msg) {
  document.getElementById("log").innerHTML += msg + "<br>";
}

function save() {
  localStorage.setItem("idleRpgData", JSON.stringify(data));
}

function fight() {
  let xpGain = 5 + Math.floor(Math.random() * 5) + data.stats.strength;
  let goldGain = 3 + Math.floor(Math.random() * 5);

  if (Math.random() < data.stats.crit * 0.01) {
    xpGain *= 2;
    log("<b>Krytyczny cios!</b>");
  }

  data.xp += xpGain;
  data.gold += goldGain;
  log(`+${xpGain} XP, +${goldGain} złota`);

  if (data.xp >= data.xpMax) {
    data.level++;
    data.xp -= data.xpMax;
    data.xpMax = Math.floor(data.xpMax * 1.2);
    data.points += 2;
    log(`<b>Awansowałeś na poziom ${data.level}!</b>`);
  }

  updateUI();
  save();
}

function addStat(stat) {
  if (data.points > 0) {
    data.stats[stat]++;
    data.points--;
    updateUI();
    save();
  }
}

function buyItem() {
  if (data.gold < 10) return log("Za mało złota!");
  const item = items[Math.floor(Math.random() * items.length)];
  if (!data.inventory.includes(item)) {
    data.inventory.push(item);
    data.gold -= 10;
    log("Kupiono przedmiot: " + item);
    updateUI();
    save();
  } else {
    log("Masz już ten przedmiot");
  }
}

function buySpell() {
  if (data.gold < 30) return log("Za mało złota!");
  const spell = spells[Math.floor(Math.random() * spells.length)];
  if (!data.skills.includes(spell)) {
    data.skills.push(spell);
    data.gold -= 30;
    log("Nauczono czaru: " + spell);
    updateUI();
    save();
  } else {
    log("Masz już ten czar");
  }
}

updateUI();
setInterval(fight, 3000); // automatyczna walka co 3 sekundy
