import {mapMainRect,railScene} from './hardware-layout.mjs';
// One media timeline for browser playback and the offline video compositor.
export function mediaEntries(project) {
 const scene=project.scenes.find(s=>s.id==='simulation');
 const simulation=(project.simulation_gallery?.film_clips||project.simulation_gallery?.clips||[]).map(c=>({
  id:c.id,path:c.film_path,start:scene.start+c.start,end:scene.start+c.end,
  trim_start:0,speed:1,x:70,y:260,w:1460,h:444,kind:'simulation',clip:c
 }));
 const slots=project.demo_slots.filter(q=>q.path&&!project.hardware_take).map(q=>{
  const s=project.scenes.find(s=>s.id===q.domain);
  return {...q,start:s.start,end:s.end,x:q.method==='LUCID'?70:834,y:240,w:696,h:373,kind:'slot'};
 });
 const parallel=(project.parallel_visualization?.placements||[]).map(p=>({
  ...p,path:project.parallel_visualization.path,speed:1,kind:'parallel'
 }));
 const process=(project.process_design?.placements||[]).filter(p=>!project.hardware_take||p.scene!=='intro').map(p=>({...p,speed:1,kind:'process'}));
 const base=[...process,...parallel,...simulation,...slots];
 if(!project.hardware_take)return base;
 const mapped=base.map(q=>railScene(project.scenes.find(s=>q.start>=s.start&&q.start<s.end).id)?mapMainRect(q):q);
 return [...mapped,{id:'continuous_hardware',kind:'continuous_hardware',path:project.hardware_take.path,start:0,end:project.hardware_take.duration,trim_start:0,speed:1,x:570,y:228,w:960,h:540}];
}
export function simulationClip(local,project) {
 return (project.simulation_gallery?.film_clips||project.simulation_gallery?.clips)?.find(c=>local>=c.start&&local<c.end);
}
