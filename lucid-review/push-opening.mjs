// Review prelude; the main presentation keeps its own unchanged source clock.
export function createPushOpening(project,{startMain,stopMain,settings,format}){
 const config=project.push_opening;
 if(!config)return null;
 const $=id=>document.getElementById(id),video=document.createElement('video');
 let active=!new URLSearchParams(location.search).has('t');
 video.id='push-prelude';video.src=config.path;video.poster='media/hardware/push-opening-poster.jpg';
 video.preload='metadata';video.playsInline=true;video.hidden=!active;
 video.setAttribute('aria-label','15-second edited push highlights, followed by the complete presentation');
 $('stage').insertBefore(video,$('start-overlay'));
 const note=document.createElement('div');note.className='prelude-note';note.hidden=!active;
 const message=document.createElement('span');message.textContent='Opening highlights · six selected moments · then the complete film';
 const skip=document.createElement('button');skip.id='skip-prelude';skip.textContent='Skip to full film →';
 note.append(message,skip);document.querySelector('.transport').before(note);
 const dismiss=()=>{active=false;video.pause();video.hidden=true;note.hidden=true;const b=$('opening-chapter');if(b){b.classList.remove('active');b.classList.add('past')}};
 const finish=()=>{dismiss();startMain()};skip.onclick=finish;video.onended=finish;
 function paint(){
  if(!active)return;
  const caption=settings().cc?config.narration:'Opening highlights · six selected moments · then the complete film';
  if(message.textContent!==caption)message.textContent=caption;
  $('seek').value=video.currentTime;$('time').textContent=`${format(video.currentTime)} / ${format(project.duration+config.duration)}`;
  $('play').textContent=video.paused?'▶ Play':'Ⅱ Pause';
  $('chapter-kicker').textContent='OPENING / SELECTED PUSH HIGHLIGHTS';
  $('chapter-title').textContent='Hand pushes. Foot pushes. Downward pressure.';
  $('chapter-desc').textContent='Six selected excerpts at original speed, with face-only blur and the existing contact labels. After this edited montage, the complete presentation and its 173-second uninterrupted physical take begin from the start.';
  document.querySelectorAll('#chapters button').forEach(b=>{b.classList.toggle('active',b.id==='opening-chapter');b.classList.remove('past')});
 }
 async function play(){
  stopMain();video.hidden=false;note.hidden=false;$('start-overlay').hidden=true;
  const {sound,speed}=settings();video.muted=!sound;video.playbackRate=speed;
  document.querySelectorAll('video').forEach(v=>{if(v!==video)v.pause()});
  try{await video.play()}catch{$('status').textContent='Press Play to start the opening highlights.'}
  paint();
 }
 function seek(time,resume=false){stopMain();active=true;video.hidden=false;note.hidden=false;video.currentTime=Math.max(0,Math.min(config.duration-.001,time));paint();if(resume)play()}
 return {video,duration:config.duration,get active(){return active},get playing(){return active&&!video.paused},play,pause:()=>video.pause(),paint,dismiss,seek};
}
