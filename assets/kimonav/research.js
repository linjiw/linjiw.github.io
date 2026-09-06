'use strict';
(async function () {
  const base = new URL('.', document.querySelector('script[src$="research.js"]').src);
  try {
    const response = await fetch(new URL('results.json', base));
    if (!response.ok) throw new Error('Results request failed');
    const data = await response.json();
    document.getElementById('latest-title').textContent = data.presentation.title;
    document.getElementById('latest-finding').textContent = data.presentation.finding;
    document.getElementById('next-step').textContent = data.presentation.next_step;
    document.getElementById('timeline-latest').textContent = data.presentation.timeline;
    document.getElementById('compute-record').textContent = 'Latest full experiment: ' + (data.runtime.runtime_s / 60).toFixed(1) + ' minutes; ' + data.runtime.peak_cuda_reserved_mib.toFixed(0) + ' MiB peak CUDA reserved by the process. Includes training, scoring, and recovery checks; not inference latency.';
    const signed = n => (n > 0 ? '+' : '') + n.toFixed(2);
    for (const objective of ['raw', 'balanced']) {
      const target = document.getElementById(objective + '-gates');
      const decision = data.decisions[objective];
      for (const [label, key] of [['Representation gate', 'representation_passed'], ['Useful-path gate', 'path_passed'], ['All six noise aggregates ≥ native', 'noise_retention_passed']]) {
        const row = document.createElement('div'); row.className = 'gate-line';
        const text = document.createElement('span'); text.textContent = label;
        const badge = document.createElement('span'); badge.className = 'badge ' + (decision[key] ? 'pass' : 'fail'); badge.textContent = decision[key] ? 'PASS' : 'FAIL';
        row.append(text, badge); target.append(row);
      }
      const detail = document.createElement('p'); detail.className = 'small';
      detail.textContent = 'Turn MSE reduction vs. matched global head: ' + signed(decision.effects_percent[objective + '_path_time']) + '%. All gate conditions and per-program effects are available in the data download.';
      target.append(detail);
    }
    const stratum = document.getElementById('stratum'), noise = document.getElementById('noise'), objective = document.getElementById('objective');
    function update() {
      if (stratum.value === 'all') noise.value = 'all';
      noise.disabled = stratum.value === 'all';
      const view = noise.value === 'all' ? data.strata[stratum.value] : data.breakdown[stratum.value + '_timestep'][noise.value];
      const prefix = objective.value;
      const methods = [
        ['Native ARDY', view.reference.baseline, '#89989e'],
        ['Global path adapter', view.overall[prefix + '_path_time'], '#738b99'],
        ['Token-local path adapter', view.overall[prefix + '_local'], '#056b60'],
        ['Optimized time-only', view.overall[prefix + '_time_only'], '#b68c59'],
        ['Local TRAIN-mean control', view.overall[prefix + '_local_time_mean'], '#bd6e45'],
        ['Global TRAIN-mean control', view.overall[prefix + '_time_mean'], '#8e704c'],
        ['Local shuffled-path probe', view.overall[prefix + '_local_shuffled'], '#aeabb0'],
        ['Local phase-shift probe', view.overall[prefix + '_local_shifted'], '#9185a6'],
        ['Per-example oracle (privileged)', view.reference.oracle, '#c2cecb']
      ].map(([label, metrics, color]) => ({label, metrics, color, gain: 100 * (1 - metrics.joint_mse_m2 / view.reference.baseline.joint_mse_m2)}));
      const tbody = document.getElementById('metrics'); tbody.replaceChildren();
      for (const method of methods) {
        const row = document.createElement('tr');
        for (const [i, value] of [method.label, signed(method.gain) + '%', (1000 * Math.sqrt(method.metrics.joint_mse_m2)).toFixed(2) + ' mm', (100 * method.metrics.contact_accuracy).toFixed(3) + '%'].entries()) {
          const cell = document.createElement(i === 0 ? 'th' : 'td');
          if (i === 0) cell.scope = 'row';
          cell.textContent = value; row.append(cell);
        }
        tbody.append(row);
      }
      const ns = 'http://www.w3.org/2000/svg';
      function el(tag, attrs, text) {const node = document.createElementNS(ns, tag); for (const [k,v] of Object.entries(attrs)) node.setAttribute(k, v); if (text !== undefined) node.textContent = text; return node;}
      const svg = el('svg', {viewBox:'0 0 900 462', role:'img'});
      svg.append(el('title', {}, 'Joint MSE reduction versus native ARDY: ' + methods.map(m => m.label + ' ' + signed(m.gain) + '%').join('; ')));
      const low = Math.min(-10, Math.floor(Math.min(...methods.map(m => m.gain)) / 10) * 10 - 5);
      const high = Math.max(80, Math.ceil(Math.max(...methods.map(m => m.gain)) / 10) * 10 + 5);
      const x = v => 260 + (v - low) / (high - low) * 530;
      for (let tick = Math.ceil(low/20)*20; tick <= high; tick += 20) {
        svg.append(el('line', {x1:x(tick),x2:x(tick),y1:23,y2:424,stroke:tick === 0 ? '#72858e' : '#e1e7e7'}));
        svg.append(el('text', {x:x(tick),y:446,'text-anchor':'middle',fill:'#506371','font-size':13}, tick + '%'));
      }
      methods.forEach((m, i) => {
        const y = 29 + i * 44;
        svg.append(el('text', {x:245,y:y+19,'text-anchor':'end',fill:'#122737','font-size':13}, m.label));
        svg.append(el('rect', {x:Math.min(x(0),x(m.gain)),y,width:Math.max(1,Math.abs(x(m.gain)-x(0))),height:28,rx:3,fill:m.color}));
        svg.append(el('text', {x:Math.max(x(0),x(m.gain))+8,y:y+19,fill:'#122737','font-size':13}, signed(m.gain)));
      });
      const chart = document.getElementById('chart'); chart.replaceChildren(svg);
      chart.setAttribute('aria-label', 'Joint MSE reduction for ' + stratum.selectedOptions[0].text + ', ' + noise.selectedOptions[0].text + ', ' + objective.selectedOptions[0].text);
      document.getElementById('chart-caption').textContent = view.teacher_examples + ' held-out teacher examples per mode and seed. Three training seeds. Axis range adapts to the selected comparison; exact values appear below.';
    }
    for (const control of [stratum, noise, objective]) control.addEventListener('change', update);
    update();
  } catch (error) {
    document.getElementById('latest-finding').textContent = 'Interactive data could not load. Please use the written report and downloadable performance figure below.';
    console.error(error);
  }
})();
