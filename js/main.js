const menu = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");
const nav = document.querySelector("#site-nav");
const mobileLayout = matchMedia("(max-width: 700px)");

function closeMenu(restoreFocus = false) {
  menu.setAttribute("aria-expanded", "false");
  if (restoreFocus) menu.focus();
}

header.classList.add("has-menu");
menu.hidden = false;
menu.addEventListener("click", () => {
  const isOpen = menu.getAttribute("aria-expanded") === "true";
  menu.setAttribute("aria-expanded", String(!isOpen));
});
header.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.getAttribute("aria-expanded") === "true") {
    closeMenu(true);
  }
});
nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
mobileLayout.addEventListener("change", () => closeMenu());

if (document.body.classList.contains("home")) {
  const updateHeader = () => header.classList.toggle("is-scrolled", scrollY > 24);
  addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.08 });
  document.querySelectorAll("[data-reveal]").forEach((section) => observer.observe(section));
}
