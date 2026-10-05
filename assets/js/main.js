(function () {
  "use strict";

  var PHONE = "5585991560403";
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  var form = document.getElementById("quote-form");
  var yearEl = document.getElementById("year");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
    document.body.style.overflow = "";
  }

  function openNav() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
    document.body.style.overflow = "hidden";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) closeNav();
      else openNav();
    });
  }

  if (navLinks) {
    navLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  document.addEventListener("click", function (event) {
    if (!nav || !nav.classList.contains("is-open")) return;
    if (!nav.contains(event.target)) closeNav();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 767) closeNav();
  });

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var sectionIds = ["portfolio", "servicos", "processo", "contato"];
  var sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          document.querySelectorAll(".nav-links a").forEach(function (link) {
            var active = link.getAttribute("href") === "#" + id;
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) { observer.observe(section); });
  }

  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach(function (el) { revealObserver.observe(el); });
  }

  function buildWhatsAppUrl(fields) {
    var lines = ["Olá! Gostaria de um orçamento para um evento."];
    if (fields.name) lines.push("Nome: " + fields.name);
    if (fields.whats) lines.push("WhatsApp: " + fields.whats);
    if (fields.date) lines.push("Data: " + fields.date);
    if (fields.place) lines.push("Local: " + fields.place);
    if (fields.kind) lines.push("Tipo de evento: " + fields.kind);
    if (fields.need) lines.push("Necessidades: " + fields.need);
    return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var url = buildWhatsAppUrl({
        name: String(data.get("name") || "").trim(),
        date: String(data.get("date") || "").trim(),
        place: String(data.get("place") || "").trim(),
        whats: String(data.get("whats") || "").trim(),
        kind: String(data.get("kind") || "").trim(),
        need: String(data.get("need") || "").trim()
      });
      window.open(url, "_blank", "noopener");
    });
  }
})();
