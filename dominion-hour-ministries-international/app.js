// Dominion Hour - light interactivity

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.hidden = expanded;
  });
  // Close menu when a link is tapped
  mobileMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menuBtn.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });
}

// Scroll reveal: tag long-form blocks
const revealSelectors = [
  ".section-head",
  ".pillar",
  ".course-card",
  ".event-row",
  ".book-item",
  ".media-card",
  ".testimony-card",
  ".testimony-feature",
  ".split-copy",
  ".split-image",
  ".band-body",
  ".cta-card",
];
const revealEls = document.querySelectorAll(revealSelectors.join(","));
revealEls.forEach((el) => el.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => io.observe(el));
