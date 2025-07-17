// game.js

let data = JSON.parse(localStorage.getItem("idleRpgData")) || {
  username: "Gość",
  level: 1,
  xp: 0,
  xpMax: 10,
  gold: 0,
  statPoints: 0,
  stats: { strength: 0, speed: 0, crit: 0, magic: 0, endurance: 0 },
  inventory: [],
  skills: []
};

const allItems = [
  { name: "Miecz", stat: "strength", img: "graphics/weapon1.png" },
  { name: "Topór", stat: "crit", img: "graphics/weapon2.png" },
  { name: "Laska Maga", stat: "magic", img: "graphics/weapon3.png" }
];

const allSpells = [
  { name: "Ognista Kula", type: "damage", power: 5, img: "graphics/spell1.png" },
  { name: "Magiczna Tarcza", type: "endurance", bonus: 3, img: "graphics/spell2.png" },
  { name: "Przyspieszenie", type: "speed", bonus: 2, img: "graphics/spell3.png" }
];

const allMonsters = [
  { name: "Goblin", hp: 20, attack: 3, img: "graphics/monster1.png" },
  { name: "Wilk", hp: 30, attack: 5, img: "graphics/monster2.png" },
  { name: "Ork", hp: 40, attack: 8, img: "graphics/monster3.png" }
];

function setUsername() {
  const input = document.getElementById("userInput");
  data.username = input.value.trim() || "Gość";
  updateUI();
  saveGame();
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
  const cost = 10;
  if (data.gold < cost) return log("Za mało złota!");

  const available = allItems.filter(item => !data.inventory.some(i => i.name === item.name));
  if (available.length === 0) return log("Masz już wszystkie przedmioty!");

  const chosen = available[Math.floor(Math.random() * available.length)];
  const bonus = Math.floor(Math.random() * 3) + 1;
  const level = Math.floor(Math.random() * 20) + 1;

  const newItem = {
    name: `${chosen.name} Lv.${level}`,
    stat: chosen.stat,
    bonus,
    level,
    img: chosen.img
  };

  data.inventory.push(newItem);
  data.gold -= cost;
  log(`🗡️ Kupiono przedmiot: ${newItem.name} (+${bonus} do ${chosen.stat})`);
  updateUI();
  saveGame();
}

function buySpell() {
  const cost = 30;
  if (data.gold < cost) return log("Za mało złota!");

  const available = allSpells.filter(s => !data.skills.some(sp => sp.name === s.name));
  if (available.length === 0) return log("Masz już wszystkie czary!");

  const spell = available[Math.floor(Math.random() * available.length)];
  data.skills.push(spell);
  data.gold -= cost;

  log(`✨ Nauczono czar: ${spell.name}`);
  updateUI();
  saveGame();
}

function fight() {
  const monster = allMonsters[Math.floor(Math.random() * allMonsters.length)];
  document.getElementById("monsterImage").src = monster.img;
  document.getElementById("monsterImage").alt = monster.name;

  let playerAttack = 5 + data.stats.strength + data.stats.magic;
  data.inventory.forEach(item => {
    if (item.stat === "strength") playerAttack += item.bonus;
    if (item.stat === "crit" && Math.random() < data.stats.crit / 100) playerAttack *= 2;
    if (item.stat === "magic") playerAttack += item.bonus;
  });

  data.skills.forEach(spell => {
    if (spell.type === "damage") playerAttack += spell.power;
    if (spell.type === "endurance") data.stats.endurance += spell.bonus;
    if (spell.type === "speed") data.stats.speed += spell.bonus;
  });

  const damage = Math.min(playerAttack, monster.hp);
  const xpGain = Math.floor(monster.hp / 2) + data.stats.magic;
  const goldGain = Math.floor(monster.attack / 2) + data.stats.speed;

  data.xp += xpGain;
  data.gold += goldGain;

  log(`🧟‍♂️ Walka z ${monster.name}: Zadałeś ${damage} dmg. +${xpGain} XP, +${goldGain} złota.`);

  if (data.xp >= data.xpMax) {
    data.level++;
    data.statPoints += 3;
    data.xp -= data.xpMax;
    data.xpMax = Math.floor(data.xpMax * 1.25);
    log(`🎉 Awans! Masz teraz poziom ${data.level}`);
  }

  updateUI();
  saveGame();
}

function log(msg) {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML += `<p>${msg}</p>`;
  logDiv.scrollTop = logDiv.scrollHeight;
}

function autoFightLoop() {
  setInterval(() => {
    fight();
  }, 4000); // co 4 sekundy
}

function saveGame() {
  localStorage.setItem("idleRpgData", JSON.stringify(data));
}

function loadGame() {
  const saved = localStorage.getItem("idleRpgData");
  if (saved) {
    data = JSON.parse(saved);
    updateUI();
  }
}

window.onload = () => {
  loadGame();
  updateUI();
  autoFightLoop();
};
