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
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeBtn.textContent = "🌑";
}
