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
  depositInput.classList.remove("valid", "error");

  if (balance < GAME_COST) {
    resultNode.textContent = "Недостаточно средств, обновите страницу";
    return;
  }

  balance = balanceNormalize(balance - GAME_COST);
  updatePlayDisable();
  renderBalance();

  setSpinUI(true);
  resultNode.textContent = "Крутим...";

  const win = Math.random() < WIN_CHANCE;

  const [f1, f2, f3] = pickFinalSymbols(win);

  let stopped = 0;
  const onAnyStop = () => {
    stopped += 1;
    if (stopped === reels.length) {
      const reward = win ? WIN_REWARD : 0;
      balance = balanceNormalize(balance + reward);
      setResult((message = win ? "🎰 WIN" : "😔 LOSE"));
      renderBalance();
      updatePlayDisable();
      setSpinUI(false);
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
