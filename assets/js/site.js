(function () {
  "use strict";
  var PHONE = "5585991560403";
  // Visita vinda de anúncio do Google Ads (codificação automática)
  var VEIO_DO_GOOGLE = /[?&](gclid|gbraid|wbraid)=/.test(location.search);
  if (VEIO_DO_GOOGLE) {
    document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
      a.href = a.href.replace("text=Ol%C3%A1%21%20", "text=Ol%C3%A1%21%20Vim%20pelo%20Google.%20");
    });
  }
  var form = document.getElementById("form-orcamento");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      function v(k) { return String(d.get(k) || "").trim(); }
      var linhas = [VEIO_DO_GOOGLE ? "Ola! Vim pelo Google. Quero solicitar um orcamento." : "Ola! Quero solicitar um orcamento."];
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
