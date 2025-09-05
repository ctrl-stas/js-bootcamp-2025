depositBtn.addEventListener("click", () => {
  const parsedNum = parseDeposit(depositInput.value);

  if (parsedNum === null) {
    setResult("Введите корректную сумму");
    depositInput.classList.remove("valid");
    depositInput.classList.add("error");
    depositInput.focus();
    return;
  }

  const amount = parsedNum;

  balance = balanceNormalize(balance + amount);
  renderBalance();
  updatePlayDisable();
  setResult(`Пополнение: +${amount.toFixed(2)}`);

  depositInput.value = "";
  depositInput.classList.remove("error", "valid");
  depositInput.focus();
});

depositInput.addEventListener("input", () => {
  if (isSpinning) return;
  const parsedNum = parseDeposit(depositInput.value);

  if (parsedNum !== null) {
    depositInput.classList.remove("error");
    depositInput.classList.add("valid");
  } else {
    depositInput.classList.remove("valid");
    depositInput.classList.add("error");
  }
});

depositInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (isSpinning) {
      e.preventDefault();
      return;
    }
    depositBtn.click();
  }
});
