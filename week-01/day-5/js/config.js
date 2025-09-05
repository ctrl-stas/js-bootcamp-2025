const GAME_COST = 2.99;
const WIN_CHANCE = 0.1;
const WIN_REWARD = 100;
const IMAGES = ["🍒", "🍋", "🍉", "⭐", "🔔", "7️⃣"];

let balance = 100;

const resultNode = document.getElementById("result");
const balanceNode = document.getElementById("balance");
const playBtn = document.getElementById("playBtn");
const slotsNode = document.getElementById("slots");
const depositInput = document.getElementById("depositAmount");
const depositBtn = document.getElementById("depositBtn");
const themeBtn = document.getElementById("themeToggle");

let isSpinning = false;

renderBalance();
