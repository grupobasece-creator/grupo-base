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

  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealObs = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach(function (el) { revealObs.observe(el); });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var fd = new FormData(form);
      var name = (fd.get("name") || "").toString().trim();
      var date = (fd.get("date") || "").toString().trim();
      var place = (fd.get("place") || "").toString().trim();
      var audience = (fd.get("audience") || "").toString().trim();
      var need = (fd.get("need") || "").toString().trim();
      var lines = ["Olá! Gostaria de um orçamento para um evento."];
      if (name) lines.push("Nome: " + name);
      if (date) lines.push("Data: " + date);
      if (place) lines.push("Local: " + place);
      if (audience) lines.push("Público: " + audience);
      if (need) lines.push("Necessidades: " + need);
      window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener,noreferrer");
    });
  }
})();
