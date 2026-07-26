/* teac — checkbox persistence + progress meters.
   State lives in localStorage under one key so every page in this
   folder shares the same progress picture. */

(function () {
  var KEY = "teac-progress-v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  var state = load();

  // Wire up every checkbox that has a data-item id.
  document.querySelectorAll('ul.actions input[type="checkbox"][data-item]').forEach(function (box) {
    var id = box.getAttribute("data-item");
    box.checked = !!state[id];
    if (box.checked) box.closest("li").classList.add("done");
    box.addEventListener("change", function () {
      state[id] = box.checked;
      if (!box.checked) delete state[id];
      save(state);
      box.closest("li").classList.toggle("done", box.checked);
      renderMeters();
    });
  });

  // Meters: any element with data-meter="<prefix>" shows completion
  // of all checkbox ids that start with that prefix, across pages.
  // Cross-page totals are declared via data-total on the meter.
  function renderMeters() {
    document.querySelectorAll("[data-meter]").forEach(function (meter) {
      var prefix = meter.getAttribute("data-meter");
      var total = parseInt(meter.getAttribute("data-total") || "0", 10);
      var done = Object.keys(state).filter(function (k) {
        return k.indexOf(prefix) === 0 && state[k];
      }).length;
      var bar = meter.querySelector(".meter > span");
      var label = meter.querySelector(".meter-label");
      if (total > 0) {
        var pct = Math.round((done / total) * 100);
        if (bar) bar.style.width = pct + "%";
        if (label) label.textContent = done + " / " + total + " · " + pct + "%";
      }
    });
  }

  renderMeters();
})();
