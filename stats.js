// stats.js
document.addEventListener('DOMContentLoaded', function () {
  var seasonSelect = document.getElementById('seasonSelect');
  var scorerCtx = document.getElementById('scorerChart') && document.getElementById('scorerChart').getContext('2d');
  var wicketsCtx = document.getElementById('wicketsChart') && document.getElementById('wicketsChart').getContext('2d');
  var pointsCtx = document.getElementById('pointsChart') && document.getElementById('pointsChart').getContext('2d');
  var summary = document.getElementById('seasonSummary');

  if (!seasonSelect || !scorerCtx || !wicketsCtx || !pointsCtx) return;

  fetch('stats.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      // populate dropdown
      data.forEach(function (s, i) {
        var opt = document.createElement('option');
        opt.value = s.season;
        opt.textContent = s.season;
        seasonSelect.appendChild(opt);
      });

      // charts
      var scorerChart, wicketsChart, pointsChart;

      function showSeason(season) {
        var s = data.find(function (x) { return String(x.season) === String(season); });
        if (!s) return;
        // summary
        summary.innerHTML = '<strong>Matches:</strong> ' + s.matches + ' &nbsp; <strong>Won:</strong> ' + s.won + ' &nbsp; <strong>Lost:</strong> ' + s.lost + ' &nbsp; <strong>Points:</strong> ' + s.points;

        // top scorers
        var labels = s.topScorers.map(function (p) { return p.name; });
        var runs = s.topScorers.map(function (p) { return p.runs; });
        if (scorerChart) scorerChart.destroy();
        scorerChart = new Chart(scorerCtx, {
          type: 'bar',
          data: { labels: labels, datasets: [{ label: 'Runs', data: runs, backgroundColor: '#c8102e' }] },
          options: { responsive: true, plugins: { legend: { display: false } } }
        });

        // top wickets
        var wlabels = s.topWickets.map(function (p) { return p.name; });
        var wickets = s.topWickets.map(function (p) { return p.wickets; });
        if (wicketsChart) wicketsChart.destroy();
        wicketsChart = new Chart(wicketsCtx, {
          type: 'bar',
          data: { labels: wlabels, datasets: [{ label: 'Wickets', data: wickets, backgroundColor: '#f25f5c' }] },
          options: { responsive: true, plugins: { legend: { display: false } } }
        });
      }

      // points trend (line over seasons)
      if (pointsChart) pointsChart.destroy();
      pointsChart = new Chart(pointsCtx, {
        type: 'line',
        data: {
          labels: data.map(function (d) { return d.season; }),
          datasets: [{ label: 'Points', data: data.map(function (d) { return d.points; }), borderColor: '#c8102e', backgroundColor: '#f8d7da', tension: 0.3 }]
        },
        options: { responsive: true }
      });

      // initial display - first season
      seasonSelect.value = data[0].season;
      showSeason(seasonSelect.value);

      seasonSelect.addEventListener('change', function (e) { showSeason(e.target.value); });
      var showAllBtn = document.getElementById('showAll');
      if (showAllBtn) showAllBtn.addEventListener('click', function () { if (pointsChart) pointsChart.resize(); });
    })
    .catch(function (err) {
      summary.textContent = 'Unable to load stats.';
      console.error(err);
    });
});
