const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const modal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginBtn.addEventListener("click", () => {
  //здесь будет проверка пользователя из БД
  modal.style.display = "flex";
});

registerBtn.addEventListener("click", () => {
  //здесь будет логика регистрации
  modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerTab.classList.add("active");
  loginForm.classList.remove("active");
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Пароли не совпадают");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Регистрация прошла успешно, войдите с помощью пароля");
  registerTab.classList.remove("active");
  loginTab.classList.add("active");
  registerForm.classList.remove("active");
  loginForm.classList.add("active");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.username === username && user.password === password) {
    alert("Вход выполнен");
    modal.style.display = "none";

    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "game.html";
  } else {
    alert("Неверный логин/пароль");
  }
});
