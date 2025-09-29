// script.js - shared utilities for pages (nav toggle, modal)
document.addEventListener('DOMContentLoaded', function () {
  // nav toggle for mobile
  var toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var navList = document.querySelector('.nav-list');
      if (!navList) return;
      navList.classList.toggle('open');
      btn.setAttribute('aria-expanded', navList.classList.contains('open'));
    });
  });

  // close any open modal when clicking Esc
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // modal close helper
  function closeModal() {
    var modal = document.getElementById('playerModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    var content = document.getElementById('modalContent');
    if (content) content.innerHTML = '';
  }

  // close button
  var closeBtn = document.getElementById('modalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
});
