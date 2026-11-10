// Wrap trailing fill-lines so long label + line rows never overflow on narrow screens.
document.querySelectorAll('.doc p').forEach(function (p) {
  if (p.querySelector('.fill')) p.style.display = 'block';
});
