// schedule.js
document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('scheduleList') || document.getElementById('scheduleContainer');
  if (!container) return;

  fetch('schedule.json')
    .then(function (r) { return r.json(); })
    .then(function (matches) {
      if (!matches.length) container.innerHTML = '<p>No matches available.</p>';
      matches.forEach(function (m) {
        var div = document.createElement('div');
        div.className = 'schedule-card';
        var statusClass = m.status && m.status.toLowerCase().indexOf('won') !== -1 ? 'win' : (m.status && m.status.toLowerCase().indexOf('lost') !== -1 ? 'loss' : '');
        div.innerHTML = '<div><strong>' + m.date + '</strong><div>' + m.match + '</div><div>' + m.venue + '</div></div><div><span>' + (m.status || '') + '</span></div>';
        container.appendChild(div);
      });
    })
    .catch(function (err) {
      container.innerHTML = '<p>Unable to load schedule.</p>';
      console.error(err);
    });
});
