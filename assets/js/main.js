(function () {
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var root = document.getElementById("compare-twin");
  if (!root) return;
  var beforePane = root.querySelector("[data-before-pane]");
  var handle = root.querySelector(".compare-handle");
  if (!beforePane || !handle) return;

  function setPos(clientX) {
    var rect = root.getBoundingClientRect();
    var x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    var pct = (x / rect.width) * 100;
    beforePane.style.width = pct + "%";
    handle.style.left = pct + "%";
  }

  var dragging = false;
  function start(e) {
    dragging = true;
    root.classList.add("dragging");
    if (e.touches && e.touches[0]) setPos(e.touches[0].clientX);
    else setPos(e.clientX);
  }
  function move(e) {
    if (!dragging) return;
    if (e.touches && e.touches[0]) {
      setPos(e.touches[0].clientX);
    } else {
      setPos(e.clientX);
    }
  }
  function end() {
    dragging = false;
    root.classList.remove("dragging");
  }

  root.addEventListener("mousedown", start);
  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", end);
  root.addEventListener("touchstart", start, { passive: true });
  window.addEventListener("touchmove", move, { passive: true });
  window.addEventListener("touchend", end);
})();
