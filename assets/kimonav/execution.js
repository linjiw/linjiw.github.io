"use strict";
(async () => {
  const names = {reference: "Reference following", no_preview: "M3p · learned, no preview", preview: "M3p · learned preview", bounded_no_preview: "M3q · bounded, no preview", bounded_preview: "M3q · bounded preview"};
  const methods = Object.keys(names);
  const table = document.getElementById("prediction-table");
  const windowSelect = document.getElementById("prediction-window");
  const metricSelect = document.getElementById("prediction-metric");
  const chart = document.getElementById("prediction-chart");
  const format = value => value === null ? "Unavailable" : value.toFixed(4);
  try {
    const response = await fetch("/assets/kimonav/response-evidence.json");
    if (!response.ok) throw new Error("Evidence data unavailable");
    const data = (await response.json()).summary;
    function render() {
      const category = windowSelect.value, metric = metricSelect.value;
      const selected = methods.map(m => data[m][category]);
      const max = Math.max(...selected.map(r => r[metric]));
      chart.replaceChildren();
      methods.forEach((method, i) => {
        const row = document.createElement("div"); row.className = "bar-row"; row.dataset.kind = method;
        const label = document.createElement("span"); label.textContent = names[method];
        const track = document.createElement("div"); track.className = "bar-track";
        const bar = document.createElement("div"); bar.className = "bar-fill"; bar.style.width = `${100 * selected[i][metric] / (max || 1)}%`; track.append(bar);
        const value = document.createElement("output"); value.textContent = format(selected[i][metric]);
        row.append(label, track, value); chart.append(row);
      });
      const t = document.createElement("table");
      const caption = document.createElement("caption"); caption.textContent = `${windowSelect.selectedOptions[0].textContent} · free prediction · lower is better`; t.append(caption);
      const head = t.createTHead().insertRow();
      ["Predictor", "Composite", "Displacement (m)", "Velocity (m/s)", "Heading (°)"].forEach(label => { const th = document.createElement("th"); th.scope = "col"; th.textContent = label; head.append(th); });
      const body = t.createTBody();
      methods.forEach((method, i) => {
        const row = body.insertRow(); if (method === "bounded_preview") row.className = "emphasis";
        const title = document.createElement("th"); title.scope = "row"; title.textContent = names[method]; row.append(title);
        ["composite", "displacement_rmse_m", "velocity_rmse_m_s", "heading_rmse_deg"].forEach(k => {row.insertCell().textContent = format(selected[i][k]);});
      });
      table.replaceChildren(t);
      const d = selected[0];
      document.getElementById("prediction-denominator").textContent = `${d.observed_contexts} observed contexts; ${d.observed_candidates}/${d.requested_candidates} requested candidate endpoints or intervals observed; ${d.observed_samples.toLocaleString()}/${d.requested_samples.toLocaleString()} state targets observed. ${d.missing_samples} missing targets remain censored. Bar lengths rescale within each selected metric.`;
      chart.setAttribute("aria-label", `${metricSelect.selectedOptions[0].textContent}, ${windowSelect.selectedOptions[0].textContent}; lower is better`);
    }
    document.getElementById("explorer-controls").hidden = false;
    chart.hidden = false;
    windowSelect.addEventListener("change", render);
    metricSelect.addEventListener("change", render);
    render();
  } catch (error) {
    document.getElementById("prediction-denominator").textContent += " Interactive data could not load; the primary table and downloads remain available.";
  }
})();
