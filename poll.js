// poll.js - simple poll demo (can be included on any page)
(function () {
  // Example usage: createPoll(containerId, optionsArray)
  window.createPoll = function (containerId, options) {
    var container = document.getElementById(containerId);
    if (!container) return;
    var pollKey = 'rcb_poll_2026';

    var votes = JSON.parse(localStorage.getItem(pollKey) || '{}');

    function render() {
      container.innerHTML = '';
      var total = Object.values(votes).reduce(function (a, b) { return a + b; }, 0);
      options.forEach(function (opt) {
        var count = votes[opt] || 0;
        var percent = total ? Math.round((count / total) * 100) : 0;
        var row = document.createElement('div');
        row.className = 'poll-row';
        row.innerHTML = '<div class="poll-opt">' + opt + '</div><div class="poll-bar"><div style="width:' + percent + '%"></div></div><div class="poll-count">' + count + '</div>';
        var button = document.createElement('button');
        button.textContent = 'Vote';
        button.addEventListener('click', function () {
          votes[opt] = (votes[opt] || 0) + 1;
          localStorage.setItem(pollKey, JSON.stringify(votes));
          render();
        });
        row.appendChild(button);
        container.appendChild(row);
      });
    }
    render();
  };
})();
