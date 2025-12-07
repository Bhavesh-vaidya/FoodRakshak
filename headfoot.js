fetch("header.html")
  .then(res => res.text())
  .then(html => {
    document.querySelector("header").innerHTML = html;

    // VERY IMPORTANT → run menu JS AFTER header loads
    initMenu();
  })
  .catch(err => console.error("Header Load Error:", err));


function initMenu() {
  const openMenu = document.getElementById("openMenu");
  const closeMenu = document.getElementById("closeMenu");
  const menuPanel = document.getElementById("menuPanel");

  if (!openMenu || !closeMenu || !menuPanel) {
    console.warn("Menu elements not found in header.");
    return;
  }

  openMenu.addEventListener("click", () => {
    menuPanel.classList.add("active");
  });

  closeMenu.addEventListener("click", () => {
    menuPanel.classList.remove("active");
  });
}
