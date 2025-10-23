// ===== Navbar Toggle & Sticky Navbar =====
window.onscroll = function () {
  const ud_header = document.querySelector(".ud-header");
  const sticky = ud_header.offsetTop;
  const logo = document.querySelector(".header-logo");
  const backToTop = document.querySelector(".back-to-top");

  if (window.pageYOffset > sticky) {
    ud_header.classList.add("sticky");
    // LOGO TETAP SAMA (no filter changes)
    if (logo) {
      logo.style.filter = "none";
    }
  } else {
    ud_header.classList.remove("sticky");
    if (logo) {
      logo.style.filter = "none";
    }
  }

  // Back to Top button
  if (backToTop) {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  }
};

// ===== Mobile Menu Toggle =====
const navbarToggler = document.querySelector("#navbarToggler");
const navbarCollapse = document.querySelector("#navbarCollapse");

navbarToggler?.addEventListener("click", () => {
  navbarToggler.classList.toggle("navbarTogglerActive");
  navbarCollapse.classList.toggle("hidden");
});

// ===== Close Mobile Menu When Link Clicked =====
const navbarLinks = document.querySelectorAll(
  "#navbarCollapse ul li:not(.submenu-item) a"
);
navbarLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbarToggler.classList.remove("navbarTogglerActive");
    navbarCollapse.classList.add("hidden");
  });
});

// ===== Sub Menu Dropdown =====
const submenuItems = document.querySelectorAll(".submenu-item");
submenuItems.forEach((el) => {
  el.querySelector("a")?.addEventListener("click", () => {
    el.querySelector(".submenu").classList.toggle("hidden");
  });
});

// ===== Back to Top Button =====
const backToTop = document.querySelector(".back-to-top");
backToTop?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===== Smooth Scroll for Menu Links =====
const pageLinks = document.querySelectorAll(".ud-menu-scroll");
pageLinks.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = elem.getAttribute("href");
    if (targetId && targetId !== "#") {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

console.log("✅ Main.js loaded successfully!");
