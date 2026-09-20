/* Research schematics only. No simulation, trained policy or network requests. */
(() => {
  'use strict';
  const views = {
    current: {
      caption: 'Historical public student path, September 15 joint study. The interfaces execute, but autonomous task completion is not established. No scene or language input is used.',
      nodes: [
        ['Implemented', 'Timed goals + history', 'Eight goal tokens, measured proprioception, ideal simulator localization and the original clock.', false],
        ['Unproven control', 'Public reference student', 'Predicts ten short reference frames from allowed inputs. Public prior uses no teacher reference.', true],
        ['Implemented', 'Frozen SONIC motor', 'Native reference packing → encoder / FSQ → code64 + history → decoder → action29.', false],
        ['Measured gap', 'Simulated execution', 'Latest public models: 0/8 full durations each. Teacher: 8/8 duration; 1/8 timed tasks.', true]
      ],
      loop: '↶ Current measured proprioception and task-relative state return to the next public decision.',
      allowed: 'Requested future goals, current measured history, declared localization and current task clock.',
      privileged: 'Teacher actions, reference motion and privileged posterior inputs stay outside the public actor.'
    },
    selection: {
  "caption": "Implemented initial selector with original motor weights and a new finite qualification profile. Six new familiar requests complete 6/6 tasks. Geometry-only and evidence-filtered choices tie; no online replanning.",
  "nodes": [
    [
      "Implemented input",
      "Goal + known geometry",
      "One bound destination, three known-map task contexts and a measured standing body. No task-provided answer motion ID.",
      false
    ],
    [
      "Implemented choice",
      "Initial library selection",
      "Motor-specific prior evidence plus geometry and endpoint checks choose nominal when clear and local duck at both beam heights.",
      false
    ],
    [
      "Verified execution",
      "Native reference → motor",
      "Selected q/dq/orientation → original encoder / FSQ → decoder with actual proprioception and action history. Common scene configuration and actuator gains are bound.",
      false
    ],
    [
      "Measured scope",
      "Task + contact outcome",
      "2/2 clear, 2/2 original beam, 2/2 beam −20 mm. All six execution records match selected fixed controls exactly; admission-rule superiority remains unproved.",
      true
    ]
  ],
  "loop": "↶ Measured state closes the motor loop. The initial plan is not replaced during execution; continuation from a deviated body remains unqualified.",
  "allowed": "Bound public task/map, measured initial body, current orientation and actual motor history; fixed bank and prior ledger tied to this motor, configuration and standing profile.",
  "privileged": "Exact geometry/localization are declared development assumptions. Future realized outcomes and matched-control records do not select the candidate. Changed unmeasured requests are rejected, without a safe-stop claim."
},
    proposed: {
      caption: 'Proposed main experiment. Start with a declared ideal scene estimate, qualify the tracker, then test geometry-dependent whole-body decisions. Initial library selection is now tested; short-horizon construction and online replacement remain proposed.',
      nodes: [
        ['Proposed input', 'Task + state + scene', 'Destination region, optional route and timing; measured robot state; support, obstacles and overhead space.', true],
        ['Proposed planner', 'Whole-body continuation', 'Choose a short motion with appropriate route, body shape and permitted support. Check the executed prefix and its clearance.', true],
        ['Retained + adapter', 'Versioned motor interface', 'Convert physical reference frames to the selected tracker’s native representation. Root-goal feedback remains an explicit outer loop.', true],
        ['Proposed monitor', 'Robot + task feedback', 'Score actual arrival, hold, contacts and interventions. Report completion, replan need or no supported continuation.', true]
      ],
      loop: '↶ Measured execution updates remaining obligations and the next plan; accepted task and elapsed clock persist.',
      allowed: 'Explicit task, proprioception and the scene estimate declared by the evaluation profile. Ideal simulator geometry is a labeled development condition.',
      privileged: 'Expert continuations, hidden scene truth outside the declared profile, future realized motion and diagnostic teacher outputs are not deployed inputs.'
    },
    vision: {
      caption: 'Future observation extension, requiring new training and evaluation. A common representation connects sensors to planning; compatibility alone does not establish robustness or generalization.',
      nodes: [
        ['Future input', 'Calibrated sensors', 'Proprioception + IMU, then depth / LiDAR or RGB. Every measurement carries a timestamp, frame and availability.', true],
        ['Future adapter', 'State + scene estimate', 'Maintain free, occupied and unknown space; support and overhead geometry; uncertainty, visibility and age.', true],
        ['Proposed system', 'Planner → adapter → motor', 'Use the same versioned task and motor meanings. Respect committed motion, observation age and compute latency.', true],
        ['Future evaluation', 'Observed execution', 'Test unseen layouts, occlusion, drift, dropout and delay. Qualify stop or recovery behavior within the motor’s tested capability.', true]
      ],
      loop: '↶ Robot motion changes the next observation; physics continues while sensing and planning compute.',
      allowed: 'Only declared onboard observations, calibrated transforms, permitted maps and the user’s versioned task. Unknown space remains unknown.',
      privileged: 'Simulator-perfect localization, invisible geometry and future motion may supervise training, but must be removed from the claimed sensor-only deployment path.'
    }
  };
  document.querySelectorAll('button[data-mode]').forEach(button => {
    button.addEventListener('click', () => {
      const view = views[button.dataset.mode];
      if (!view) return;
      document.querySelectorAll('button[data-mode]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      document.getElementById('system-caption').textContent = view.caption;
      view.nodes.forEach(([tag, title, copy, open], i) => {
        const badge = document.getElementById(`node-tag-${i}`);
        badge.textContent = tag;
        badge.classList.toggle('open', open);
        document.getElementById(`node-title-${i}`).textContent = title;
        document.getElementById(`node-copy-${i}`).textContent = copy;
      });
      ['loop', 'allowed', 'privileged'].forEach(key => { document.getElementById(`system-${key}`).textContent = view[key]; });
    });
  });

  const scene = document.getElementById('scene-choice');
  const yaw = document.getElementById('body-yaw');
  const lower = document.getElementById('body-lower');
  if (!scene || !yaw || !lower) return;
  const scenes = {wide: [.85, 1.85], narrow: [.42, 1.85], overhead: [.85, 1.25], mixed: [.42, 1.25]};
  function updateClearance() {
    const [gap, clearance] = scenes[scene.value];
    const angle = Number(yaw.value), lowering = Number(lower.value);
    const radians = angle * Math.PI / 180;
    const width = .52 * Math.cos(radians) + .30 * Math.sin(radians);
    const height = 1.55 - .005 * lowering;
    const widthFits = width + .04 <= gap, heightFits = height + .02 <= clearance;
    document.getElementById('yaw-value').textContent = `${angle}°`;
    document.getElementById('lower-value').textContent = `${lowering}%`;
    const wallWidth = (285 - gap * 250) / 2;
    document.getElementById('wall-left').setAttribute('width', wallWidth);
    document.getElementById('wall-right').setAttribute('width', wallWidth);
    document.getElementById('wall-right').setAttribute('x', 305 - wallWidth);
    const body = document.getElementById('body-envelope');
    body.setAttribute('transform', `rotate(${angle} 162.5 167.5)`);
    body.setAttribute('stroke', widthFits ? '#176758' : '#983e32');
    document.getElementById('overhang').setAttribute('height', Math.max(0, 282 - clearance * 125 - 50));
    const top = 282 - height * 125;
    const side = document.getElementById('height-envelope');
    side.setAttribute('y', top);
    side.setAttribute('height', height * 125);
    side.setAttribute('stroke', heightFits ? '#176758' : '#983e32');
    document.getElementById('side-head').setAttribute('cy', top + 19);
    document.getElementById('width-label').textContent = `Width ${width.toFixed(2)} m / gap ${gap.toFixed(2)} m`;
    document.getElementById('height-label').textContent = `Height ${height.toFixed(2)} m / space ${clearance.toFixed(2)} m`;
    const result = document.getElementById('clearance-result');
    result.dataset.fit = String(widthFits && heightFits);
    const strong = document.createElement('strong');
    strong.textContent = widthFits && heightFits ? 'Envelope fits; execution still untested. ' :
      (!widthFits && !heightFits ? 'Width and height are blocked. ' : !widthFits ? 'Width is blocked. ' : 'Height is blocked. ');
    result.replaceChildren(strong, document.createTextNode('Illustrative tests include 2 cm clearance per side and above. Balance, support and the motion between poses still need physical evaluation.'));
  }
  [scene, yaw, lower].forEach(control => control.addEventListener('input', updateClearance));
  updateClearance();
})();
