const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
const submenuParents = document.querySelectorAll(".submenu-parent");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// მობილურზე submenu-ს toggle
submenuParents.forEach(parent => {
  parent.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // ბმული არ გაიხსნას
      parent.classList.toggle("active");
    }
  });
});

