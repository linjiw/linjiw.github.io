import {MOTION,POLICY_LABELS} from './motion-viz.mjs';
import {renderSVG} from './scenes.mjs';
import {initProcessLab} from './process-lab.mjs';
import {mediaEntries} from './media-timeline.mjs';
import {hardwareRect} from './hardware-layout.mjs';
import {createPushOpening} from './push-opening.mjs';
const $=id=>document.getElementById(id);
let project=await fetch('project.json?v=12').then(r=>r.json()), cues=await fetch('assets/cues.json').then(r=>r.ok?r.json():[]).catch(()=>[]);
let t=0,playing=false,last=0,sound=true,cc=true,speed=1,dirty=false,narrationDirty=false,selected=0,currentScene='',mediaKey='';
const audio=$('voice'),params=new URLSearchParams(location.search);
const openingDuration=Number(project.push_opening?.duration||0);
let opening=null;
// A saved script must never silently play an older narration after reloading.
try {
 const meta=await fetch('assets/voice-meta.json').then(r=>r.json());
 const bytes=new TextEncoder().encode(JSON.stringify(project.scenes.map(s=>[s.id,s.start,s.end,s.cues])));
 const digest=[...new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))].map(v=>v.toString(16).padStart(2,'0')).join('');
 narrationDirty=meta.script_hash!==digest||meta.voice!==project.voice||meta.voice_rate!==project.voice_rate||meta.voice_engine!==project.voice_engine||meta.voice_pause_seconds!==project.voice_pause_seconds;
 if(narrationDirty){cues=[];for(const s of project.scenes){let start=s.start+.2,total=s.cues.join(' ').length;for(const text of s.cues){let end=start+(s.end-s.start-.4)*text.length/total;cues.push({scene:s.id,start,end,text});start=end}}status('Saved narration has changed. Captions preview your edits; Export MP4 rebuilds the matching voice.');}
} catch { narrationDirty=true;status('Voice track not available. Export MP4 builds narration and captions.'); }

if(params.has('capture'))document.body.classList.add('capture');
if(params.has('t'))t=Math.min(175.99,Math.max(0,Number(params.get('t'))||0));
const descriptions={"intro": "A physical LUCID policy repeats a turning reference under manual perturbations and author-confirmed 0–60 ms added randomized delay. Source 00:57–03:50 plays continuously at 1×, with face-only blur and annotated contacts. It starts large, then continues in the right-hand inset.", "gap": "Randomization must balance exposure with learnability. Instantaneous joint error mixes execution mismatch with torque-generating offsets. LUCID uses learned temporal discrepancy instead of filtered joint error; recorded G1 states illustrate the motivation.", "rollout": "The core idea comes first: issued-command history branches before delay, measured history follows execution, and both enter one frozen encoder. Their normalized discrepancy guides the next training block.", "pretrain": "How the comparison is learned: denoise motion windows, then freeze the encoder before policy training. The same comparison function is used while the policy changes.", "controller": "Latent-gap PI and independent return backoff set a shared intensity. Six illustrated channels show delay, surface contact, mass/CoM, offsets, pushes and observation noise. G1 poses are recorded; channel effects and controller inputs are explanatory.", "evaluation": "Stress testing extends the maximum added delay from 40 ms in training to 60 ms in the held-out test, a 50% increase in this parameter. The test uses nominal dynamics. The separate context replay shows 1,024 environments with 0–40 ms delay; the paper trains with 4,096.", "results": "Completion under unseen +60 ms delay rises from 52.1% to 73.8%, a 21.7 percentage-point gain over filtered-error PI. Reported intervals and the hybrid’s highest tested means remain visible.", "ablation": "Denoising and live feedback are tested separately. The replay comparison uses one donor schedule and five recipient seeds; its scope remains explicit.", "simulation": "Full six-second walking and turning demonstrations play at 1×, with +40 ms added delay and scheduled impulses. LUCID is left, reference center, filtered-error PI right. These selected recordings differ from the +60 ms aggregate benchmark; root drift remains visible.", "hardware": "The same continuous physical recording expands again, without restarting. This qualitative 0–60 ms demonstration is separate from the paper’s controlled +40 ms benchmark: 38/60 versus 23/60 completions. There is no matched filtered-error PI hardware video in this recording. Only the policy and low-level controller run onboard.", "closing": "The choreographed robot lettering closes on both reported outcomes and the deployment path. LUCID’s encoder and curriculum scheduler stay in training. The final formation holds for 2.5 seconds."};
const fmt=v=>`${Math.floor(v/60)}:${String(Math.floor(v%60)).padStart(2,'0')}`;
function status(s){$('status').textContent=s}
function pause(){opening?.pause();playing=false;audio.pause();$('play').textContent='▶ Play';document.querySelectorAll('#media-layer video').forEach(v=>v.pause())}
function setTime(v){opening?.dismiss();t=Math.max(0,Math.min(project.duration-.001,v));if(Number.isFinite(audio.duration))audio.currentTime=t;draw(true)}
async function play(){if(opening?.active)return opening.play();window.LUCID?.motion?.stop();$('library-video')?.pause();$('parallel-video')?.pause();$('process-film')?.pause();$('hardware-video')?.pause();if(t>=project.duration-.1){if(opening){opening.seek(0,true);return}setTime(0)}playing=true;last=performance.now();$('play').textContent='Ⅱ Pause';$('start-overlay').hidden=true;if(sound&&!narrationDirty){audio.currentTime=t;audio.playbackRate=speed;try{await audio.play()}catch{status('Playback started without audio. Use Sound on to try again.')}}draw(true)}
function scene(){return project.scenes.find(s=>t>=s.start&&t<s.end)||project.scenes.at(-1)}
function initMedia(s,force=false){
 const entries=mediaEntries(project).filter(q=>t>=q.start&&t<q.end),layer=$('media-layer');
 // Keep the continuous take's video element alive as other chapter media come and go.
 for(const v of layer.querySelectorAll('video'))if(!entries.some(q=>q.id===v.dataset.slot))v.remove();
 for(const q of entries){
  let v=[...layer.querySelectorAll('video')].find(v=>v.dataset.slot===q.id);
  if(!v){v=document.createElement('video');v.src=q.path;v.preload='auto';v.muted=true;v.playsInline=true;v.dataset.slot=q.id;layer.append(v);v.addEventListener('loadedmetadata',()=>{if(t>=q.start&&t<q.end)v.currentTime=Math.min(v.duration-.001,t-q.start+Number(q.trim_start||0))},{once:true});}
  const r=q.kind==='continuous_hardware'?hardwareRect(t):q;
  Object.assign(v.style,{left:`${r.x/16}%`,top:`${r.y/9}%`,width:`${r.w/16}%`,height:`${r.h/9}%`,borderRadius:'0',zIndex:q.kind==='continuous_hardware'?'2':'1'});
  const desired=t-q.start+Number(q.trim_start||0);
  if(force||Math.abs(v.currentTime-desired)>.25)v.currentTime=desired;
  v.playbackRate=speed;if(playing&&v.paused)v.play().catch(()=>{});if(!playing)v.pause();
 }
}

function draw(force=false){if(opening?.active){opening.paint();return}let s=scene();$('scene').innerHTML=renderSVG(t,project,{cues,captions:cc});$('seek').value=t+openingDuration;$('time').textContent=`${fmt(t+openingDuration)} / ${fmt(project.duration+openingDuration)}`;initMedia(s,force);
 if(s.id!==currentScene||force){currentScene=s.id;$('chapter-kicker').textContent=s.eyebrow;$('chapter-title').textContent=s.title;$('chapter-desc').textContent=descriptions[s.id];document.querySelectorAll('#chapters button[data-scene]').forEach((b,i)=>{b.classList.toggle('active',project.scenes[i].id===s.id);b.classList.toggle('past',project.scenes[i].end<=t)})}}
function tick(now){if(opening?.active)opening.paint();else if(playing){let dt=(now-last)/1000;last=now;if(sound&&!narrationDirty&&!audio.paused&&!audio.ended)t=audio.currentTime;else t+=dt*speed;if(t>=project.duration){t=project.duration-.001;pause()}draw()}requestAnimationFrame(tick)}
function chapters(){
 $('chapters').innerHTML='';$('edit-scene').innerHTML='';if(opening){let b=document.createElement('button');b.id='opening-chapter';b.style.flex=openingDuration;b.setAttribute('aria-label','0:00 Selected push highlights');b.onclick=()=>opening.seek(0,playing||opening.playing);$('chapters').append(b)}project.scenes.forEach((s,i)=>{let b=document.createElement('button');b.dataset.scene=s.id;b.style.flex=s.end-s.start;b.setAttribute('aria-label',`${fmt(s.start+openingDuration)} ${s.title}`);b.onclick=()=>setTime(s.start);$('chapters').append(b);let o=document.createElement('option');o.value=i;o.textContent=`${fmt(s.start)} · ${s.title}`;$('edit-scene').append(o)})
}
function editorScene(i){selected=Number(i);let s=project.scenes[selected];$('edit-scene').value=selected;$('edit-title').value=s.title;$('edit-cues').value=s.cues.join('\n')}
function editOpen(v){$('editor').hidden=!v;$('edit-toggle').setAttribute('aria-expanded',String(v));if(v)editorScene(project.scenes.indexOf(scene()))}
function slotsUI(){
 $('slots').innerHTML='';project.demo_slots.forEach(q=>{let c=document.createElement('div');c.className='slot';let h=document.createElement('h4');h.textContent=`${q.domain==='hardware'?'G1':'Simulation'} · ${q.method}`;c.append(h);
 let l=document.createElement('label');l.textContent='Condition label';let inp=document.createElement('input');inp.value=q.path?q.condition:'';inp.placeholder='e.g. MuJoCo · +40 ms · walking';inp.onchange=()=>{q.condition=inp.value;dirty=true;draw(true)};l.append(inp);c.append(l);
 let trim=document.createElement('label');trim.textContent='Start in source (seconds)';let n=document.createElement('input');n.type='number';n.min=0;n.step=.1;n.value=q.trim_start||0;n.onchange=()=>{q.trim_start=Math.max(0,Number(n.value)||0);dirty=true;draw(true)};trim.append(n);c.append(trim);
 let file=document.createElement('input');file.type='file';file.accept='video/*';file.setAttribute('aria-label',`Choose ${q.id} footage`);file.onchange=async()=>{let f=file.files[0];if(!f)return;status(`Saving ${f.name}…`);let res=await fetch(`/api/media/${q.id}`,{method:'PUT',headers:{'X-Filename':encodeURIComponent(f.name)},body:f});let body=await res.json();if(!res.ok){status(body.error);return}q.path=body.path;dirty=true;draw(true);status(`${f.name} added. Enter a verified condition label, then save.`)};c.append(file);
 let hint=document.createElement('small');hint.textContent=q.path?`Loaded: ${q.path}`:'Footage pending. At least 24 seconds after trim.';c.append(hint);$('slots').append(c)})
}
async function save(){const res=await fetch('/api/project',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(project,null,2)});let b=await res.json();if(!res.ok){status(b.error);return false}dirty=false;status(narrationDirty?'Saved. Export MP4 rebuilds the voice and captions to match your edits.':'Project saved locally.');return true}
$('play').onclick=()=>playing||opening?.playing?pause():play();$('start-overlay').onclick=play;
$('seek').oninput=e=>{const v=Number(e.target.value),resume=playing||opening?.playing;if(opening&&v<openingDuration)opening.seek(v,resume);else{const wasOpening=opening?.active;setTime(v-openingDuration);if(wasOpening&&resume)play()}};$('back').onclick=()=>{if(opening?.active){opening.seek(0,opening.playing);return}let i=project.scenes.indexOf(scene());setTime(project.scenes[Math.max(0,i-1)].start)};$('forward').onclick=()=>{if(opening?.active){const resume=opening.playing;setTime(0);if(resume)play();return}let i=project.scenes.indexOf(scene());setTime(project.scenes[Math.min(project.scenes.length-1,i+1)].start)};
$('sound').onclick=()=>{sound=!sound;$('sound').textContent=sound?'Sound on':'Muted';$('sound').setAttribute('aria-pressed',String(sound));if(opening)opening.video.muted=!sound;if(!sound)audio.pause();else if(playing&&!narrationDirty){audio.currentTime=t;audio.play().catch(()=>{})}};
$('captions').onclick=()=>{cc=!cc;$('captions').setAttribute('aria-pressed',String(cc));draw()};$('speed').onchange=e=>{speed=Number(e.target.value);audio.playbackRate=speed;if(opening)opening.video.playbackRate=speed};
$('cinema').onclick=()=>{document.body.classList.toggle('cinema');$('cinema').textContent=document.body.classList.contains('cinema')?'Exit cinema':'Cinema mode'};
$('edit-toggle').onclick=()=>editOpen($('editor').hidden);$('editor-close').onclick=()=>editOpen(false);$('edit-scene').onchange=e=>editorScene(e.target.value);
$('apply').onclick=()=>{let s=project.scenes[selected],old=s.cues.join('\n'),next=$('edit-cues').value.split('\n').map(x=>x.trim()).filter(Boolean);s.title=$('edit-title').value.trim()||s.title;if(old!==next.join('\n')){s.cues=next;narrationDirty=true;audio.pause();cues=cues.filter(c=>c.scene!==s.id);let len=s.end-s.start,total=next.join(' ').length;let start=s.start+.2;next.forEach(text=>{let end=start+(len-.4)*text.length/total;cues.push({scene:s.id,start,end,text});start=end})}dirty=true;chapters();editorScene(selected);setTime(s.start);status('Chapter updated. Save project to keep edits. Narration changes are previewed silently until export rebuilds audio.')};
$('save').onclick=save;$('download').onclick=()=>{let a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(project,null,2)],{type:'application/json'}));a.download='project.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
$('export').onclick=async()=>{pause();if(!await save())return;$('export').disabled=true;status('Rendering the same vector animation to MP4. This may take a few minutes.');let res=await fetch('/api/export',{method:'POST'});let b=await res.json();if(!res.ok){status(b.error);$('export').disabled=false;return}const poll=setInterval(async()=>{let j=await fetch('/api/export').then(r=>r.json());status(j.message);if(!j.running){clearInterval(poll);$('export').disabled=false;if(j.ok){cues=await fetch('assets/cues.json?'+Date.now()).then(r=>r.json());audio.src='assets/narration.m4a?'+Date.now();narrationDirty=false;let a=document.createElement('a');a.href=j.file;a.download='LUCID_web_template.mp4';a.textContent='Download the MP4 ↗';$('status').append(' ',a);draw()}}},2000)};
document.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT','VIDEO'].includes(e.target.tagName))return;if(e.code==='Space'){e.preventDefault();playing||opening?.playing?pause():play()}if(e.code==='ArrowRight'){e.preventDefault();if(opening?.active){const next=opening.video.currentTime+5,resume=opening.playing;if(next<openingDuration)opening.seek(next,resume);else{setTime(next-openingDuration);if(resume)play()}}else setTime(t+5)}if(e.code==='ArrowLeft'){e.preventDefault();if(opening?.active)opening.seek(opening.video.currentTime-5,opening.playing);else setTime(t-5)}if(e.code==='Escape')document.body.classList.remove('cinema')});
$('brand').onclick=e=>{e.preventDefault();pause();if(opening)opening.seek(0);else setTime(0)};
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});
opening=createPushOpening(project,{startMain:()=>{setTime(0);play()},stopMain:()=>{pause();window.LUCID?.motion?.stop()},settings:()=>({sound,speed,cc}),format:fmt});
$('seek').max=project.duration+openingDuration;
window.LUCID={seek:setTime,play,pause,render:draw,get time(){return t},get project(){return project},get opening(){return opening}};
chapters();editorScene(0);slotsUI();initGallery();initParallel();initMotion();initProcessLab();initHardware();draw();requestAnimationFrame(tick);

function initGallery(){
 const gallery=project.simulation_gallery;if(!gallery)return;
 const video=$('library-video'),list=$('clip-list');let active=gallery.clips[0],filter='all';
 function choose(clip,autoplay=false){
  active=clip;video.pause();video.src=clip.path;video.poster=clip.poster;video.load();
  $('library-title').textContent=clip.title;$('library-domain').textContent=clip.simulator==='mujoco'?'MuJoCo dynamics':'Isaac Lab / PhysX poses · rendered in MuJoCo';
  $('library-duration').textContent=`${clip.source_duration.toFixed(2)} seconds · original 50 fps · 1×`;
  $('library-note').textContent=clip.note;
  $('library-condition').textContent=clip.push_count_shown===0?'Before the first scheduled push · +40 ms added delay':`+40 ms added delay · ${clip.push_count_shown} impulse${clip.push_count_shown>1?'s':''} shown · Δv 1.50 m/s (3× baseline)`;
  $('library-metric').textContent=clip.simulator==='mujoco'?'Tracking overlay: root-position error.':'Tracking overlay: mean body-position error (MPJPE).';
  $('download-clip').href=clip.path;$('download-clip').download=clip.id+'.mp4';
  const selectedFilm=(gallery.film_clips||gallery.clips).find(c=>c.id===clip.id||c.id===clip.id+'_full');$('film-jump').disabled=!selectedFilm;$('film-jump').textContent=selectedFilm?'Show full recording in film ↑':'Library excerpt only';$('full-recording').hidden=!clip.full_path;$('full-recording').onclick=()=>choose({...clip,path:clip.full_path,source_duration:6,push_count_shown:2,note:'Complete 6 s capture. LUCID stays above the height-failure threshold; tracking drift remains visible.'},true);
  $('film-jump').onclick=()=>{video.pause();pause();setTime(project.scenes.find(s=>s.id==='simulation').start+selectedFilm.start);$('start-overlay').hidden=true;$('stage').scrollIntoView({behavior:'smooth',block:'center'})};
  list.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.clip===clip.id)));
  if(autoplay){pause();video.play().catch(()=>{})}
 }
 function cards(){list.replaceChildren();gallery.clips.filter(c=>filter==='all'||c.simulator===filter).forEach(c=>{const b=document.createElement('button');b.className='clip-card';b.dataset.clip=c.id;b.setAttribute('aria-pressed',String(active.id===c.id));const img=document.createElement('img');img.src=c.poster;img.alt=`${c.title}: both policies and synchronized reference`;img.loading='lazy';const info=document.createElement('span'),title=document.createElement('strong'),sub=document.createElement('small');title.textContent=c.title;sub.textContent=`${c.simulator==='mujoco'?'MuJoCo':'Isaac Lab'} · ${c.source_duration.toFixed(2)} s`;info.append(title,sub);b.append(img,info);b.onclick=()=>choose(c);list.append(b)})}
 document.querySelectorAll('[data-sim-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.simFilter;document.querySelectorAll('[data-sim-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(filter!=='all'&&active.simulator!==filter)choose(gallery.clips.find(c=>c.simulator===filter));cards()});
 ['left','reference','right'].forEach(k=>$('policy-'+k).textContent=gallery.policy_labels[k]);
 $('identity-note').textContent=gallery.identity_note;
 const rows=$('selection-rows');gallery.selection_audit.all_eight_comparisons.forEach(c=>{let tr=document.createElement('tr');const name=c.motion.replace(/^\d+_/,'').replaceAll('_',' '),a=c.fall_confirmation_s.fixed,b=c.fall_confirmation_s.off;for(const value of [c.simulator==='mujoco'?'MuJoCo':'Isaac Lab',name,c.selected?'Included':'Excluded',a==null?'None in 6 s':a.toFixed(2)+' s',b==null?'None in 6 s':b.toFixed(2)+' s']){let td=document.createElement('td');td.textContent=value;tr.append(td)}rows.append(tr)});
 video.addEventListener('play',()=>{window.LUCID?.motion?.stop();$('process-film')?.pause();pause();$('parallel-video')?.pause()});cards();choose(active);
}

function initParallel(){
 const source=project.parallel_visualization;if(!source)return;
 const v=$('parallel-video');v.src=source.path;v.poster=source.poster;
 $('parallel-original').href=source.original_path;
 v.addEventListener('play',()=>{window.LUCID?.motion?.stop();$('process-film')?.pause();pause();$('library-video')?.pause()});
 document.querySelectorAll('[data-film-time]').forEach(b=>b.onclick=()=>{v.pause();$('process-film')?.pause();$('library-video')?.pause();pause();setTime(Number(b.dataset.filmTime));$('start-overlay').hidden=true;$('stage').scrollIntoView({behavior:'smooth',block:'center'})});
}

function initMotion(){
 const select=$('motion-select'),seek=$('motion-seek'),button=$('motion-play');let id=select.value,frame=0,running=false,base=0;
 const stop=()=>{running=false;button.textContent='▶ Replay capture'};
 const paint=()=>{const p={duration:6,scenes:[{id:'gap',start:0,end:6,title:'From recorded motion to execution feedback.',eyebrow:'G1 DATA EXPLORER / '+MOTION.motions[id].name.toUpperCase()}]};$('motion-canvas').innerHTML=renderSVG(frame/50,p,{captions:false,motion:{id,frame}});seek.value=frame;$('motion-time').value=`${((frame+1)/50).toFixed(2)} / 6.00 s`;};
 select.onchange=()=>{stop();id=select.value;frame=0;paint()};seek.oninput=()=>{stop();frame=Number(seek.value);paint()};
 button.onclick=()=>{if(running){stop();return}pause();$('process-film')?.pause();$('parallel-video').pause();$('library-video').pause();if(frame===299)frame=0;running=true;base=performance.now()-frame*20;button.textContent='Ⅱ Pause capture';requestAnimationFrame(animate)};
 function animate(now){if(!running)return;frame=Math.min(299,Math.floor((now-base)/20));paint();if(frame===299)stop();else requestAnimationFrame(animate)}
 $('motion-csv').onclick=()=>{const m=MOTION.motions[id],rows=[['seconds','policy','source_track',...['root_x_m','root_y_m','root_z_m','quat_w','quat_x','quat_y','quat_z'],...MOTION.joint_names.map(n=>n+'_rad')].join(',')];for(let i=0;i<300;i++)for(const arm of ['reference','fixed','off'])rows.push([((i+1)/50).toFixed(2),POLICY_LABELS[arm],arm,...m.tracks[arm].qpos[i]].join(','));const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([rows.join('\n')],{type:'text/csv'}));a.download=id+'_recorded_states.csv';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
 window.LUCID.motion={stop,get frame(){return frame},get id(){return id}};paint();
}

function initHardware(){
 const v=$('hardware-video');if(!v)return;
 const rows=$('push-rows');for(const e of project.hardware_take.events){const tr=document.createElement('tr');for(const value of [e.id,`${fmt(e.start)}–${fmt(e.end)}`,e.kind,e.direction]){const td=document.createElement('td');td.textContent=value;tr.append(td)}const td=document.createElement('td'),b=document.createElement('button');b.textContent='Play contact';b.onclick=()=>{v.currentTime=Math.max(0,e.start-.5);v.play();v.scrollIntoView({behavior:'smooth',block:'center'})};td.append(b);tr.append(td);rows?.append(tr);}
 v.addEventListener('play',()=>{pause();window.LUCID?.motion?.stop();$('process-film')?.pause();$('parallel-video')?.pause();$('library-video')?.pause();});
}
