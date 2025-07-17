export function updateUI(state) {
  document.getElementById("gold").textContent = state.gold;
  document.getElementById("level").textContent = state.level;
  document.getElementById("xp").textContent = state.xp;
  document.getElementById("xpMax").textContent = state.xpMax;
  document.getElementById("strength").textContent = state.stats.strength;
  document.getElementById("crit").textContent = state.stats.crit;
  document.getElementById("statPoints").textContent = state.statPoints;

  const invList = document.getElementById("inventoryList");
  invList.innerHTML = "";
  state.inventory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    invList.appendChild(li);
  });

  const skillsList = document.getElementById("skillsList");
  skillsList.innerHTML = "";
  state.skills.forEach(spell => {
    const li = document.createElement("li");
    li.textContent = spell.name;
    skillsList.appendChild(li);
  });
}

export function log(msg) {
  const el = document.getElementById("log");
  el.innerHTML += `${msg}<br>`;
  el.scrollTop = el.scrollHeight;
}
