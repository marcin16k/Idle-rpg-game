export function saveGame(state) {
  localStorage.setItem("idleRPG", JSON.stringify(state));
}

export function loadGame() {
  const saved = localStorage.getItem("idleRPG");
  return saved
    ? JSON.parse(saved)
    : {
        gold: 0,
        level: 1,
        xp: 0,
        xpMax: 10,
        statPoints: 0,
        stats: { strength: 0, crit: 0 },
        inventory: [],
        skills: [],
      };
}
