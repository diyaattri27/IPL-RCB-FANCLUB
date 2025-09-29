// team.js
document.addEventListener('DOMContentLoaded', function () {
  var grid = document.getElementById('playersGrid');
  if (!grid) return;

  fetch('players.json')
    .then(function (r) { return r.json(); })
    .then(function (players) {
      players.forEach(function (p, i) {
        var card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = '<img src="' + p.image + '" alt="' + p.name + '"><h3>' + p.name + '</h3><p>' + p.role + '</p>';
        card.addEventListener('click', function () { openModal(p); });
        grid.appendChild(card);
      });
    })
    .catch(function (err) {
      grid.innerHTML = '<p>Unable to load players.</p>';
      console.error(err);
    });

  function openModal(player) {
    var modal = document.getElementById('playerModal');
    var content = document.getElementById('modalContent');
    if (!modal || !content) return;
    content.innerHTML = '';
    var html = '<div class="player-modal"><div style="display:flex;gap:14px;align-items:flex-start">';
    html += '<img src="' + player.image + '" style="width:160px;height:160px;object-fit:cover;border-radius:8px;" alt="' + player.name + '">';
    html += '<div><h2>' + player.name + '</h2><h4>' + player.role + '</h4><p>' + (player.bio || '') + '</p></div>';
    html += '</div>';
    if (player.achievements && player.achievements.length) {
      html += '<h4>Achievements</h4><ul>';
      player.achievements.forEach(function (a) { html += '<li>' + a + '</li>'; });
      html += '</ul>';
    }
    if (player.bestMoments && player.bestMoments.length) {
      html += '<h4>Best moments</h4><ul>';
      player.bestMoments.forEach(function (m) { html += '<li>' + m + '</li>'; });
      html += '</ul>';
    }
    html += '</div>';
    content.innerHTML = html;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  }
});
