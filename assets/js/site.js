(function () {
  "use strict";
  var PHONE = "5585991560403";
  var form = document.getElementById("form-orcamento");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      function v(k) { return String(d.get(k) || "").trim(); }
      var linhas = ["Ola! Quero solicitar um orcamento."];
      if (v("nome")) linhas.push("Nome: " + v("nome"));
      if (v("whats")) linhas.push("WhatsApp: " + v("whats"));
      if (v("data")) linhas.push("Data do evento: " + v("data"));
      if (v("local")) linhas.push("Local: " + v("local"));
      if (v("tipo")) linhas.push("Tipo de evento: " + v("tipo"));
      if (v("necessidades")) linhas.push("Necessidades: " + v("necessidades"));
      window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(linhas.join("\n")), "_blank", "noopener");
    });
  }
  var y = document.getElementById("ano");
  if (y) y.textContent = String(new Date().getFullYear());
})();
