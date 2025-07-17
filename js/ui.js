
// ui.js — aktualizacja interfejsu z podziałem na strony
let invPage = 0;
let spellPage = 0;
const ITEMS_PER_PAGE = 5;

function updateInventoryUI() {
  const invList = document.getElementById("inventoryList");
  invList.innerHTML = "";

  const start = invPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const visibleItems = data.inventory.slice(start, end);

  visibleItems.forEach(item => {
    let li = document.createElement("li");
    li.innerHTML = `<img src="${item.img}" class="item-icon" alt="${item.name}" />
      <strong>${item.name}</strong> (Lv. ${item.level}) +${item.bonus} ${item.stat || ""}`;
    invList.appendChild(li);
  });

  let nav = document.createElement("div");
  nav.innerHTML = `
    <button onclick="invPage = Math.max(invPage - 1, 0); updateInventoryUI()">« Poprzednia</button>
    <span> Strona ${invPage + 1} </span>
    <button onclick="if ((invPage + 1) * ITEMS_PER_PAGE < data.inventory.length) { invPage++; updateInventoryUI(); }">Następna »</button>
  `;
  invList.appendChild(nav);
}

function updateSpellsUI() {
  const skillsList = document.getElementById("skillsList");
  skillsList.innerHTML = "";

  const start = spellPage * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const visibleSpells = data.skills.slice(start, end);

  visibleSpells.forEach(spell => {
    let li = document.createElement("li");
    li.innerHTML = `<img src="${spell.img}" class="item-icon" alt="${spell.name}" />
      <strong>${spell.name}</strong>${spell.effect ? ' - bonus XP' : ''}${spell.bonusCrit ? ' +' + spell.bonusCrit + ' Krytyk' : ''}${spell.bonusEndurance ? ' +' + spell.bonusEndurance + ' Wytrzymałość' : ''}`;
    skillsList.appendChild(li);
  });

  let nav = document.createElement("div");
  nav.innerHTML = `
    <button onclick="spellPage = Math.max(spellPage - 1, 0); updateSpellsUI()">« Poprzednia</button>
    <span> Strona ${spellPage + 1} </span>
    <button onclick="if ((spellPage + 1) * ITEMS_PER_PAGE < data.skills.length) { spellPage++; updateSpellsUI(); }">Następna »</button>
  `;
  skillsList.appendChild(nav);
}

function updateUI() {
  document.getElementById("username").innerText = data.username;
  document.getElementById("level").innerText = data.level;
  document.getElementById("xp").innerText = data.xp;
  document.getElementById("xpMax").innerText = data.xpMax;
  document.getElementById("gold").innerText = data.gold;
  document.getElementById("strength").innerText = data.stats.strength;
  document.getElementById("speed")?.innerText = data.stats.speed || 0;
  document.getElementById("crit").innerText = data.stats.crit;
  document.getElementById("magic")?.innerText = data.stats.magic || 0;
  document.getElementById("endurance")?.innerText = data.stats.endurance || 0;
  document.getElementById("statPoints").innerText = data.statPoints;

  updateInventoryUI();
  updateSpellsUI();
}
