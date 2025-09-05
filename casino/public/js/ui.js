function renderBalance() {
  balanceNode.textContent = "Баланс: " + balance.toFixed(2) + " €";
}

function setResult(message) {
  resultNode.textContent = message;
}

function depositBtnDisable() {
  // depositBtn.disabled =
}

function updatePlayDisable() {
  playBtn.disabled = isSpinning;
}

function setSpinUI(spinning) {
  isSpinning = spinning;

  playBtn.disabled = isSpinning || balance < GAME_COST;
  depositBtn.disabled = isSpinning;
  depositInput.disabled = isSpinning;

  if (isSpinning) {
    depositInput.classList.remove("valid", "error");
  }
}

function balanceNormalize(num) {
  return Math.round(num * 100) / 100;
}

function parseDeposit(rawStr) {
  if (rawStr == null) return null;
  const s = String(rawStr);
  const m = s.match(/^(?:\d+)(?:\.(\d{1,2}))?$/);
  if (!m) return null;

  const num = Number(s);
  if (!Number.isFinite(num) || num <= 0) return null;

  return num;
}

renderBalance();
