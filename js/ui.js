// ui.js

function updateUI() {
  document.getElementById("gold").textContent = data.gold;
  document.getElementById("level").textContent = data.level;
  document.getElementById("xp").textContent = data.xp;
  document.getElementById("xpMax").textContent = data.xpMax;
  document.getElementById("strength").textContent = data.stats.strength;
  document.getElementById("crit").textContent = data.stats.crit;
  document.getElementById("statPoints").textContent = data.statPoints;

  const inventoryList = document.getElementById("inventoryList");
  inventoryList.innerHTML = "";
  data.inventory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} (Poziom ${item.level})`;
    inventoryList.appendChild(li);
  });

  const skillsList = document.getElementById("skillsList");
  skillsList.innerHTML = "";
  data.skills.forEach(spell => {
    const li = document.createElement("li");
    li.textContent = spell.name;
    skillsList.appendChild(li);
  });
}
