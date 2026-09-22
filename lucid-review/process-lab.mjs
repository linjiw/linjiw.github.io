import {curriculumStep,trainingRanges,TEACHING_EXAMPLES} from './curriculum.mjs?v=13';
const $=id=>document.getElementById(id);
export function initProcessLab(){
 const inputs=['gap','intensity','integral'].map(id=>$('lab-'+id));
 const back=$('lab-backoff'),valid=$('lab-valid');
 function paint(){
  const state=Object.fromEntries(inputs.map(e=>[e.id.replace('lab-',''),Number(e.value)]));
  state.backoff=back.checked;state.validWindows=valid.checked;
  const result=curriculumStep(state),r=trainingRanges(result.next);
  for(const e of inputs)$(e.id+'-value').textContent=Number(e.value).toFixed(3);
  $('lab-next').textContent=result.next.toFixed(4);$('lab-reason').textContent=result.reason;
  $('lab-equation').textContent=result.reason==='PI pacing'?`e = ${result.error.toFixed(3)}   ·   I = ${result.integral.toFixed(3)}   ·   u = ${result.update.toFixed(3)}`:state.backoff?'λ_next = 0.70 × λ   ·   I = 0   ·   overrides PI':'λ_next = λ   ·   integral unchanged';
  $('lab-explanation').textContent=state.backoff?'After warm-up, two consecutive blocks below 0.65 × nominal mean return trigger this override.':!valid.checked?'No valid within-episode windows: hold intensity and integral, unless return backoff takes priority.':result.next===state.intensity?'The bounded update leaves the intensity unchanged for the next block.':result.next<state.intensity?'The gap calls for a less intense next block. The integral carries recent error.':'The gap permits a more intense next block. The integral also affects the update.';
  const rows=[['Actuation delay',`0–${r.delayMaxMs} ms`,'5 ms FIFO ticks'],['Surface friction',`${r.staticFriction[0].toFixed(3)}–${r.staticFriction[1].toFixed(3)}`,'static coefficient'],['Mass offset',`±${r.massOffsetKg.toFixed(3)} kg`,'base body'],['Joint offset',`±${r.jointOffsetRad.toFixed(4)} rad`,'non-ankle joints'],['External pushes',`±${r.pushXYMps.toFixed(3)} m/s`,'x/y velocity pulses'],['Observation noise',`σ ${r.jointNoiseSigmaRad.toFixed(4)} rad`,'joint position · 50 Hz']];
  $('lab-ranges').replaceChildren(...rows.map(([name,value,detail])=>{const row=document.createElement('div');row.className='lab-range';const label=document.createElement('strong'),v=document.createElement('b'),small=document.createElement('small'),bar=document.createElement('span');label.textContent=name;v.textContent=value;small.textContent=detail;bar.className='lab-bar';bar.style.setProperty('--fill',`${result.next*100}%`);row.append(label,v,small,bar);return row}));
  document.querySelectorAll('[data-lab-preset]').forEach(b=>b.setAttribute('aria-pressed','false'));
 }
 for(const el of [...inputs,back,valid])el.addEventListener('input',paint);
 document.querySelectorAll('[data-lab-preset]').forEach(button=>button.onclick=()=>{const p=TEACHING_EXAMPLES[button.dataset.labPreset];for(const el of inputs)el.value=p[el.id.replace('lab-','')];back.checked=!!p.backoff;valid.checked=true;paint();button.setAttribute('aria-pressed','true')});
 const video=$('process-film');video.addEventListener('play',()=>{window.LUCID.pause();window.LUCID.motion.stop();$('parallel-video').pause();$('library-video').pause()});
 document.querySelectorAll('[data-process-time]').forEach(b=>b.onclick=()=>{video.currentTime=Number(b.dataset.processTime);video.play().catch(()=>{});video.scrollIntoView({behavior:'smooth',block:'center'})});
 paint();document.querySelector('[data-lab-preset="ease"]').setAttribute('aria-pressed','true');
}
