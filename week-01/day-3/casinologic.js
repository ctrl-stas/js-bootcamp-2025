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

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeBtn.textContent = isLight ? "🌑" : "🌕";
  localStorage.setItem("theme", isLight ? "light" : "dark");

  if (document.body.classList.contains("light")) {
    themeBtn.textContent = "🌑";
  } else {
    themeBtn.textContent = "🌕";
  }
});

function renderBalance() {
  balanceNode.textContent = "Баланс: " + balance.toFixed(2);
}

function setResult(message) {
  resultNode.textContent = message;
}

const reels = createReels(3);

function createReels(n) {
  slotsNode.innerHTML = "";
  const arr = [];
  for (let i = 0; i < n; i++) {
    const div = document.createElement("div");
    div.className = "reel";
    div.textContent = "?";
    slotsNode.appendChild(div);
    arr.push(div);
  }
  return arr;
}

function spinReel(
  node,
  finalSymbol,
  { startDelayMs = 50, steps = 35, decelFactor = 1.08, onStop = () => {} } = {}
) {
  let idx = 0;
  let step = 0;
  let delay = startDelayMs;
  let timerId = null;

  function tick() {
    node.textContent = IMAGES[idx];
    idx = (idx + 1) % IMAGES.length;
    step++;

    if (step >= steps) {
      node.textContent = finalSymbol;
      onStop();
      return;
    }

    delay = delay * decelFactor;
    timerId = setTimeout(tick, delay);
  }

  tick();
  return () => clearTimeout(timerId);
}

function randSymbol() {
  return IMAGES[Math.floor(Math.random() * IMAGES.length)];
}

function pickFinalSymbols(win) {
  if (!win && IMAGES.length < 2) {
    return [randSymbol(), randSymbol(), randSymbol()];
  }

  if (win) {
    const s = randSymbol();
    return [s, s, s];
  } else {
    let s1 = randSymbol();
    let s2 = randSymbol();
    let s3 = randSymbol();

    if (s1 === s2 && s2 === s3) {
      const others = IMAGES.filter((x) => x !== s1);
      s3 = others[Math.floor(Math.random() * others.length)];
    }
    return [s1, s2, s3];
  }
}

playBtn.onclick = function () {
  if (balance < GAME_COST) {
    resultNode.textContent = "Недостаточно средств, обновите страницу";
    return;
  }

  balance = balanceNormalize(balance - GAME_COST);
  updatePlayDisable();
  renderBalance();
  updatePlayDisable();

  playBtn.disabled = true;
  resultNode.textContent = "Крутим...";

  const win = Math.random() < WIN_CHANCE;

  const [f1, f2, f3] = pickFinalSymbols(win);

  let stopped = 0;
  const onAnyStop = () => {
    stopped += 1;
    if (stopped === reels.length) {
      const reward = win ? WIN_REWARD : 0;
      balance = balanceNormalize(balance + reward);
      updatePlayDisable();
      setResult((message = win ? "🎰 WIN" : "😔 LOSE"));
      renderBalance();
      updatePlayDisable();
      playBtn.disabled = false;
    }
  };

  spinReel(reels[0], f1, {
    startDelayMs: 40,
    steps: 17,
    decelFactor: 1.08,
    onStop: onAnyStop,
  });
  spinReel(reels[1], f2, {
    startDelayMs: 50,
    steps: 20,
    decelFactor: 1.09,
    onStop: onAnyStop,
  });
  spinReel(reels[2], f3, {
    startDelayMs: 60,
    steps: 20,
    decelFactor: 1.1,
    onStop: onAnyStop,
  });
};

depositBtn.addEventListener("click", () => {
  const raw = depositInput.value.trim();
  const parsed = Number(raw.replace(",", "."));

  if (!Number.isFinite(parsed) || parsed <= 0) {
    setResult("Введите корректную сумму");
    depositInput.focus();
    return;
  }

  const amount = Math.round(parsed * 100) / 100;

  balance = balanceNormalize(balance + amount);
  renderBalance();
  updatePlayDisable();
  setResult(`Пополнение: +${amount}`);

  depositInput.value = "";
  depositInput.focus();
});

depositInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    depositBtn.click();
  }
});

function updatePlayDisable() {
  playBtn.disabled = balance < GAME_COST;
}

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeBtn.textContent = "🌑";
}

function balanceNormalize(num) {
  return Math.round(num * 100) / 100;
}
