// Dominion Hour Ministries — main script

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('is-open');
      const expanded = menu.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  // Form submissions — gentle UX feedback (no backend)
  document.querySelectorAll('form[data-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.querySelector('[data-form-msg]');
      if (msg) {
        msg.textContent = 'Thank you. Your message has been received in the spirit of unity. We will be in touch shortly.';
        msg.style.display = 'block';
      }
      form.reset();
    });
  });

  // Scroll-aware header
  const header = document.querySelector('.header');
  let lastY = 0;
  if (header) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 40) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
      lastY = y;
    }, { passive: true });
  }
});
