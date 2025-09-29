// news.js
document.addEventListener('DOMContentLoaded', function () {
  var container = document.getElementById('newsList');
  if (!container) return;

  fetch('news.json')
    .then(function (r) { return r.json(); })
    .then(function (news) {
      if (!news.length) container.innerHTML = '<p>No news available.</p>';
      news.forEach(function (n) {
        var card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = '<img src="' + (n.image || 'assets/highlights/h1.jpg') + '" alt=""><div><h4>' + n.title + '</h4><p><small>' + n.date + '</small></p><p>' + n.content + '</p></div>';
        container.appendChild(card);
      });
    })
    .catch(function (err) {
      container.innerHTML = '<p>Unable to load news.</p>';
      console.error(err);
    });
});
