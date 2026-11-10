// Drawer toggle
const openDrawer = () => document.body.classList.add('drawer-open');
const closeDrawer = () => document.body.classList.remove('drawer-open');

document.querySelectorAll('[data-open-drawer]').forEach(el => el.addEventListener('click', openDrawer));
document.querySelectorAll('[data-close-drawer]').forEach(el => el.addEventListener('click', closeDrawer));

// Toast
function showToast(message) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = message;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2600);
}

// Forms
document.querySelectorAll('form[data-handle]').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const kind = form.dataset.handle;
    if (kind === 'prayer') showToast('Prayer request received. We are praying with you.');
    else if (kind === 'newsletter') showToast('You are subscribed. Welcome to the family.');
    else showToast('Thank you.');
    form.reset();
  });
});

// Demo CTAs (non-form)
document.querySelectorAll('[data-demo]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showToast(btn.dataset.demo);
  });
});

// Real CTAs that show a confirmation toast but still navigate/download
document.querySelectorAll('[data-toast]').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast(btn.dataset.toast);
  });
});

// Active tab on nav
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.tab').forEach(tab => {
  if (tab.dataset.page && path.includes(tab.dataset.page)) tab.classList.add('active');
});
