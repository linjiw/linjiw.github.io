/* Conceptual animations and an explicitly illustrative LUCID equation demo.
 * Empirical values below are transcribed from the cited paper tables.
 */
(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motionButton = $('#motion-toggle');
  let paused = reduced.matches;
  try { paused = reduced.matches || localStorage.getItem('research-motion-paused') === 'true'; } catch (_) { /* storage is optional */ }
  function applyMotion() {
    document.body.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Resume motion' : 'Pause motion';
    motionButton.disabled = reduced.matches;
  }
  motionButton.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('research-motion-paused', String(paused)); } catch (_) { /* optional */ }
    applyMotion();
  });
  reduced.addEventListener('change', () => { paused = reduced.matches || paused; applyMotion(); });
  applyMotion();

  const examples = {
    classroom: [
      ['Choose the next exercise.', 'Give a student practice that addresses what they have not yet mastered, while staying relevant to the subject.'],
      ['Adjust the guidance.', 'Change which hints and intermediate steps receive attention, while keeping the learning objective the same.'],
      ['Prepare for less ideal conditions.', 'Move from quiet practice to distractions and time pressure at a pace the student can handle.']
    ],
    robotics: [
      ['Choose the next navigation challenge.', 'Use task and performance history to propose useful practice, mixed with reference tasks from the target domain. This is the GACL decision.'],
      ['Adjust auxiliary reward weights.', 'Change the emphasis on intermediate behaviors as learning evolves. The primary task objective stays fixed. This is the RTW decision.'],
      ['Pace uncertain simulation conditions.', 'Use command–execution history and return to adjust exposure to delay, dynamics variation, and noise. This is the LUCID decision.']
    ]
  };
  document.querySelectorAll('[data-example]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-example]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      ['task', 'reward', 'domain'].forEach((name, i) => {
        $(`#example-${name}-title`).textContent = examples[button.dataset.example][i][0];
        $(`#example-${name}`).textContent = examples[button.dataset.example][i][1];
      });
    });
  });

  const captions = {
    gacl: [
      'A pretrained VAE encodes the task space. The curriculum operates on structured task representations.',
      'The teacher uses task context and student-performance history; the full method also includes an antagonist for the regret-based curriculum objective.',
      'Alternating reference and generated tasks preserves target-domain relevance while the student learns. This is task selection, not reward-weight adaptation.'
    ],
    rtw: [
      'The teacher receives learning history, rather than assuming the same shaping weights help at every stage.',
      'The teacher changes auxiliary weights in [0, 1]. The animated bars are illustrative; actual weights need not decrease monotonically.',
      'The student trains with the primary reward plus weighted auxiliary components. Its task performance informs the teacher. No hard safety guarantee follows from reward shaping.'
    ],
    lucid: [
      'Compare 25-sample command and execution histories from the same episode. The waveforms here are schematic.',
      'A denoising-pretrained, frozen temporal encoder produces a latent discrepancy. The 90th percentile across valid windows summarizes each training block.',
      'A bounded PI rule updates one shared randomization intensity. Two low-return blocks can override it with backoff. Only the policy and low-level controller remain at deployment.'
    ]
  };
  document.querySelectorAll('[data-method]').forEach((panel) => {
    const buttons = panel.querySelectorAll('.step-controls button');
    const nodes = panel.querySelectorAll('.flow-board [data-step]');
    const activate = (index) => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.step) === index)));
      nodes.forEach((node) => node.classList.toggle('active', Number(node.dataset.step) === index));
      panel.querySelector('.step-caption').textContent = captions[panel.dataset.method][index];
    };
    buttons.forEach((button) => button.addEventListener('click', () => activate(Number(button.dataset.step))));
    activate(0);
  });

  const clip = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
  let intensity = 0.5, integral = 0, lowBlocks = 0, blocks = 0;
  const gapInput = $('#gap-input');
  gapInput.addEventListener('input', () => { $('#gap-value').textContent = `${Number(gapInput.value).toFixed(2)}×`; });
  function showIntensity() {
    $('#intensity-value').textContent = intensity.toFixed(3);
    $('#intensity-bar').style.width = `${intensity * 100}%`;
  }
  $('#advance-block').addEventListener('click', () => {
    blocks += 1;
    const prior = intensity;
    lowBlocks = $('#return-low').checked ? lowBlocks + 1 : 0;
    let explanation;
    if (lowBlocks >= 2) {
      intensity *= 0.70;
      integral = 0;
      lowBlocks = 0;
      explanation = 'Two consecutive low-return blocks trigger 30% backoff and an integral reset. The return override takes priority.';
    } else {
      const error = 1 - Number(gapInput.value);
      integral = clip(integral + error, -0.8, 0.8);
      const update = clip(0.8 * error + 0.15 * integral, -1, 1);
      intensity = clip(intensity + 0.04 * update, 0, 1);
      explanation = `PI update: normalized error ${error.toFixed(2)}, integral ${integral.toFixed(2)}. ${lowBlocks === 1 ? 'One low-return block recorded; a second consecutive one will trigger backoff.' : 'The proportional and accumulated-error terms determine the next intensity.'}`;
    }
    showIntensity();
    $('#scheduler-feedback').textContent = `Block ${blocks}: ${prior.toFixed(3)} → ${intensity.toFixed(3)}. ${explanation}`;
  });
  $('#reset-scheduler').addEventListener('click', () => {
    intensity = 0.5; integral = 0; lowBlocks = 0; blocks = 0;
    gapInput.value = '0.7'; $('#gap-value').textContent = '0.70×'; $('#return-low').checked = false;
    showIntensity();
    $('#scheduler-feedback').textContent = 'Start at intensity 0.5 with warm-up already complete. Advance to apply one update.';
  });

  const lucidUrl = $('#lucid .text-link').getAttribute('href');
  const results = {
    gacl_nav: {
      stage: 'Published · simulation', title: 'Wheeled navigation success', method: 'GACL', baseline: 'CLUTR', values: [81.85, 76.67], digits: 2,
      description: 'GACL and CLUTR evaluated in the reported BARN navigation simulation benchmark.',
      context: 'Table II reports mean ± standard deviation: 81.85 ± 2.51% versus 76.67 ± 2.74%.',
      limit: 'This is a simulation result; it does not establish GACL hardware deployment.',
      source: 'https://arxiv.org/html/2508.02988v1', citation: 'GACL · Table II'
    },
    gacl_quad: {
      stage: 'Published · simulation', title: 'Quadruped locomotion success', method: 'GACL', baseline: 'CLUTR', values: [79.21, 74.65], digits: 2,
      description: 'Quadruped locomotion through confined 3D environments in the reported simulation evaluation.',
      context: 'Table II reports mean ± standard deviation: 79.21 ± 2.54% versus 74.65 ± 2.31%.',
      limit: 'The 4.56-point difference is about 6.1% relative to CLUTR, not 6.1 percentage points.',
      source: 'https://arxiv.org/html/2508.02988v1', citation: 'GACL · Table II'
    },
    rtw_sim: {
      stage: 'Published · simulation', title: 'Off-road simulation success', method: 'RTW', baseline: 'Expert-designed rewards', values: [76.67, 34.44], digits: 2,
      description: 'Off-road mobility on vertically challenging terrain, comparing adaptive auxiliary weights with expert-designed rewards.',
      context: 'The raw success rates differ by 42.23 percentage points; the paper reports about 122.62% relative improvement.',
      limit: 'This training/evaluation setting is separate from the five-trial physical demonstration.',
      source: 'https://arxiv.org/html/2503.15724v1', citation: 'RTW · Table II'
    },
    rtw_robot: {
      stage: 'Published · physical robot', title: 'Physical off-road completion', method: 'RTW', baseline: 'Expert-designed rewards', values: [100, 40], counts: ['5/5 trials', '2/5 trials'], digits: 1,
      description: 'Simulation-trained policies evaluated on a physical 1/10-scale off-road platform.',
      context: 'Five attempts per method in the reported physical testbed. The bars show those observed fractions.',
      limit: 'Five successful trials are a bounded demonstration, not evidence of universal or deployment-wide reliability.',
      source: 'https://arxiv.org/html/2503.15724v1', citation: 'RTW · Section IV-B / Table III'
    },
    lucid_full: {
      stage: 'Preprint · simulation', title: 'Full-range randomization completion', method: 'LUCID', baseline: 'Filtered-error PI', values: [88.9, 76.8], digits: 1,
      description: 'Final policies evaluated with the curriculum frozen and the configured domain-randomization ranges fully enabled.',
      context: 'Five training seeds; 1,000 evaluation scenarios per seed. Reported 95% bootstrap half-widths: ±1.1 and ±2.0 points.',
      limit: 'The comparator shares the PI/backoff structure. The hybrid LUCID + DORAEMON has a higher reported mean; scalar LUCID is not best in every setting.',
      source: `${lucidUrl}#page=6`, citation: 'LUCID preprint · Table III'
    },
    lucid_delay: {
      stage: 'Preprint · simulation', title: 'Unseen 60 ms delay completion', method: 'LUCID', baseline: 'Filtered-error PI', values: [73.8, 52.1], digits: 1,
      description: 'A fixed 60 ms actuation delay exceeds the 40 ms training maximum; other dynamics are nominal in this test.',
      context: 'Five seeds; 1,000 scenarios per seed. Reported 95% bootstrap half-widths: ±2.1 and ±2.8 points.',
      limit: 'This tests one specific out-of-training delay condition, not arbitrary distribution shifts or transfer to every robot.',
      source: `${lucidUrl}#page=6`, citation: 'LUCID preprint · Table III'
    },
    lucid_robot: {
      stage: 'Preprint · physical robot', title: 'G1 with 40 ms added delay', method: 'LUCID', baseline: 'Filtered-error PI', values: [38 / 60 * 100, 23 / 60 * 100], counts: ['38/60 trials · 63.3%', '23/60 trials · 38.3%'], digits: 1,
      description: 'Four motions × three checkpoints × five repetitions per method on the physical Unitree G1.',
      context: 'Paired completion difference: +25.0 points, with a reported 95% interval of [11.8, 38.2]. Tracking and balance stops count as failures.',
      limit: '40 ms is injected delay in addition to nominal system latency. Four short motions test this specific delay condition.',
      source: `${lucidUrl}#page=7`, citation: 'LUCID preprint · Section VI / Table VII'
    }
  };
  function showResult(key) {
    const r = results[key];
    $('#result-stage').textContent = r.stage;
    $('#result-title').textContent = r.title;
    $('#result-description').textContent = r.description;
    $('#method-name').textContent = r.method;
    $('#baseline-name').textContent = r.baseline;
    $('#method-value').textContent = r.counts ? r.counts[0] : `${r.values[0].toFixed(r.digits)}%`;
    $('#baseline-value').textContent = r.counts ? r.counts[1] : `${r.values[1].toFixed(r.digits)}%`;
    $('#method-bar').style.width = `${r.values[0]}%`;
    $('#baseline-bar').style.width = `${r.values[1]}%`;
    $('#result-delta').textContent = `+${(r.values[0] - r.values[1]).toFixed(r.digits)}`;
    $('#result-context').textContent = r.context;
    $('#result-limit').textContent = r.limit;
    $('#result-source').href = r.source;
    $('#result-source').textContent = `${r.citation} ↗`;
  }
  $('#result-select').addEventListener('change', (event) => showResult(event.target.value));
  showResult('gacl_nav');
})();
