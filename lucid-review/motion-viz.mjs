// Every point and plotted sample is read from the recorded source / exact G1 FK.
import motion from './assets/motion/recorded-g1.json' with {type:'json'};
import identity from './policy-identity.json' with {type:'json'};
export const MOTION=motion;
export const POLICY_LABELS=Object.freeze(identity.track_labels);
const ink='#263543',muted='#65717b',blue='#367db5',purple='#8862a2',orange='#c87c31';
const tx=(x,y,s,size=18,color=muted,anchor='start')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}">${s}</text>`;
export const frameAt=t=>Math.min(299,Math.max(0,Math.floor(t*50)));
export function selectedMotion(t){const ids=Object.keys(motion.motions),id=ids[Math.min(2,Math.floor(t/6))];return {id,frame:frameAt(t%6)}}
export function bones(id,arm,frame,x,y,scale,color=purple,opacity=1,align=true){
 const track=motion.motions[id].tracks[arm],points=track.xyz[frame],root=align?track.qpos[frame]:motion.motions[id].tracks.reference.qpos[0];
 const project=p=>{let a=p[0]-root[0],b=p[1]-root[1];return [x+scale*(.60*a-.80*b),y-scale*(p[2]+.10*(.80*a+.60*b))]};
 let out=`<g opacity="${opacity}" data-pose="${id}/${arm}/${frame}">`;
 if(align&&track.envelopes)for(const poly of track.envelopes[frame])out+=`<polygon points="${poly.map(([u,v])=>[x+scale*u/10000,y-scale*v/10000].join(',')).join(' ')}" fill="${color}" fill-opacity=".12" stroke="${color}" stroke-opacity=".45" stroke-width="${scale*.003}" stroke-linejoin="round"/>`;
 points.forEach((p,i)=>{const parent=motion.parents[i];if(parent<0)return;const [a,b]=[project(points[parent]),project(p)];out+=`<path d="M${a.join(',')} L${b.join(',')}" fill="none" stroke="${color}" stroke-width="${scale*.012}" stroke-linecap="round"/>`});
 points.forEach((p,i)=>{const [a,b]=project(p);out+=`<circle cx="${a}" cy="${b}" r="${scale*(i===30?.011:.008)}" fill="${i===30?'#fbfaf7':color}" stroke="${color}" stroke-width="${scale*.006}"/>`});
 return out+'</g>';
}
export function floorGrid(x,y,w){let out='';for(let i=-2;i<=2;i++)out+=`<path d="M${x-w/2} ${y+i*8} L${x+w/2} ${y+i*8} M${x+i*w/5-18} ${y-20} L${x+i*w/5+18} ${y+20}" stroke="#d7dddf" stroke-width="1"/>`;return out;}
export function measuredPlot(id,frame,{x,y,w,h,joint=3,kind='joint',arms=['reference','fixed','off'],windowStart=0,windowEnd=299,label=true}={}){
 const tracks=motion.motions[id].tracks;
 const value=(arm,i)=>kind==='root'?Math.hypot(...tracks[arm].qpos[i].slice(0,3).map((v,j)=>v-tracks.reference.qpos[i][j])):tracks[arm].qpos[i][7+joint];
 let min=Infinity,max=-Infinity;for(const a of arms)for(let i=windowStart;i<=windowEnd;i++){const v=value(a,i);min=Math.min(min,v);max=Math.max(max,v)}
 const pad=Math.max(.05,(max-min)*.08);min=kind==='root'?0:Math.floor((min-pad)*4)/4;max=Math.ceil((max+pad)*4)/4;
 const X=i=>x+(i-windowStart)/(windowEnd-windowStart)*w,Y=v=>y+h-(v-min)/(max-min)*h;let out='';
 for(let i=0;i<=2;i++){let v=min+(max-min)*i/2;out+=`<path d="M${x} ${Y(v)}h${w}" stroke="#e1e5e6"/>`+tx(x-10,Y(v)+5,v.toFixed(2),15,muted,'end')}
 for(let i=windowStart;i<=windowEnd;i+=windowEnd-windowStart){out+=tx(X(i),y+h+23,((i+1)/50).toFixed(2)+' s',15,muted,i===windowStart?'start':'end')}
 if(windowStart===0)for(const sec of [2,4]){const xx=X(sec*50-1);out+=`<path d="M${xx} ${y}v${h}" stroke="${orange}" stroke-dasharray="3 5" opacity=".55"/>`}
 for(const arm of arms){const color={reference:blue,fixed:purple,off:orange}[arm],d=[];for(let i=windowStart;i<=windowEnd;i++)d.push(`${i===windowStart?'M':'L'}${X(i).toFixed(2)},${Y(value(arm,i)).toFixed(2)}`);out+=`<path d="${d.join(' ')}" fill="none" stroke="${color}" stroke-width="2.7" stroke-linejoin="round"/>`}
 if(frame>=windowStart&&frame<=windowEnd){const xx=X(frame);out+=`<path d="M${xx} ${y-7}v${h+14}" stroke="${ink}" stroke-width="1.4"/>`;for(const arm of arms)out+=`<circle cx="${xx}" cy="${Y(value(arm,frame))}" r="4" fill="${{reference:blue,fixed:purple,off:orange}[arm]}"/>`}
 if(label)out+=tx(x,y-15,kind==='root'?'Root-position error · m':motion.joint_names[joint].replaceAll('_',' ')+' · rad',18,ink);
 return out;
}
export function referenceWindow(id,frame,x,y,w,h){const end=Math.max(24,frame),start=end-24,joints=[0,1,3,6,7,9],q=motion.motions[id].tracks.reference.qpos;let out='';
 joints.forEach((j,row)=>{const label=motion.joint_names[j].replace('_joint','').replace('left_','L ').replace('right_','R ').replaceAll('_',' ');out+=tx(x-12,y+row*h/6+h/12+5,label,15,muted,'end');for(let i=0;i<25;i++){const v=q[start+i][7+j],a=Math.min(1,Math.abs(v)/1.5);out+=`<rect x="${x+i*w/25}" y="${y+row*h/6}" width="${w/25-1}" height="${h/6-2}" rx="2" fill="${v>=0?purple:blue}" opacity="${.1+.9*a}"/>`}});
 return out+tx(x,y+h+23,((start+1)/50).toFixed(2)+' s',15)+tx(x+w,y+h+23,((end+1)/50).toFixed(2)+' s',15,muted,'end');
}
