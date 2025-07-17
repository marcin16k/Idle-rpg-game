import { saveGame, loadGame } from "./save.js";
import { updateUI, log } from "./ui.js";

const state = loadGame();

// Dostępne czary i itemy
const spells = [
  { name: "Ognista Kula", effect: () => 5 },
  { name: "Magiczna Tarcza", bonusCrit: 5 }
];

const items = [
  { name: "Miecz +1", bonus: 1 },
  { name: "Zbroja +2", bonus: 2 }
];

// Automatyczna walka co 3s
setInterval(() => {
  let xpGain = 5 + state.stats.strength;
  let goldGain = 2;

  if (Math.random() < state.stats.crit * 0.01) {
    xpGain *= 2;
    log("🔥 Krytyczny cios!");
  }

  state.skills.forEach(spell => {
    if (spell.effect) xpGain += spell.effect();
    if (spell.bonusCrit) state.stats.crit += spell.bonusCrit;
  });

  state.xp += xpGain;
  state.gold += goldGain;
  log(`+${xpGain} XP, +${goldGain} złota`);

  // Level up
  while (state.xp >= state.xpMax) {
    state.xp -= state.xpMax;
    state.level++;
    state.statPoints += 1;
    state.xpMax = Math.floor(state.xpMax * 1.2);
    log(`🆙 Awans na poziom ${state.level}`);
  }

  saveGame(state);
  updateUI(state);
}, 3000);

// Dodanie punktu statystyki
window.addStat = function(stat) {
  if (state.statPoints > 0) {
    state.stats[stat]++;
    state.statPoints--;
    saveGame(state);
    updateUI(state);
  }
};

// Kupowanie czaru
window.buySpell = function() {
  if (state.gold < 30) return log("❌ Za mało złota");
  const spell = spells.find(s => !state.skills.some(h => h.name === s.name));
  if (!spell) return log("✅ Masz już wszystkie czary");
  state.gold -= 30;
  state.skills.push(spell);
  saveGame(state);
  updateUI(state);
  log(`📜 Nauczono czaru: ${spell.name}`);
};

// Kupowanie przedmiotu
window.buyItem = function() {
  if (state.gold < 10) return log("❌ Za mało złota");
  const item = items.find(i => !state.inventory.some(h => h.name === i.name));
  if (!item) return log("✅ Masz już wszystkie przedmioty");
  state.gold -= 10;
  state.inventory.push(item);
  saveGame(state);
  updateUI(state);
  log(`🛡️ Kupiono przedmiot: ${item.name}`);
};
