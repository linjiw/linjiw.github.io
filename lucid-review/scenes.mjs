import {MOTION,POLICY_LABELS,bones,floorGrid,measuredPlot,referenceWindow,selectedMotion,frameAt} from './motion-viz.mjs';
import {cinematicHero,processRollout,processController,processClosing} from './process-viz.mjs';
import {simulationClip} from './media-timeline.mjs';
import {MAIN,hardwareRect,railScene} from './hardware-layout.mjs';
// Pure timeline renderer shared by browser playback and offline MP4 export.
// No random state, CSS animation timers or external libraries: seek(t) is deterministic.
export const C={ink:'#263543',muted:'#65717b',blue:'#D9ECFA',purple:'#E9DFF3',yellow:'#FFF2C0',orange:'#FBE0BF',b:'#367db5',p:'#8862a2',y:'#ae831e',o:'#c87c31',paper:'#fbfaf7',line:'#d7dbdc',white:'#ffffff'};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const mathEsc=s=>String(s).split(/(\^\{[^}]+\}|_\{[^}]+\})/).map(part=>{if(/^[\^_]\{/.test(part))return `<tspan baseline-shift="${part[0]==='^'?'super':'sub'}" font-size="65%">${esc(part.slice(2,-1))}</tspan>`;return [...part].map(c=>{const sub={'ₖ':'k','ₜ':'t','₀':'0','₁':'1','₂':'2','₊':'+','₋':'−'},sup={'ᶜ':'c','ᵐ':'m','ᵈ':'d','ᵃ':'a','ᵖ':'p','ᵉ':'e','ˣ':'x','ᵀ':'T','⁻':'−','¹':'1','²':'2','³':'3','⁶':'6','⁰':'0'};return sub[c]?`<tspan baseline-shift="sub" font-size="65%">${sub[c]}</tspan>`:sup[c]?`<tspan baseline-shift="super" font-size="65%">${sup[c]}</tspan>`:esc(c)}).join('')}).join('');
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
const text=(x,y,s,size=26,color=C.ink,weight=400,anchor='start',extra='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" text-anchor="${anchor}" ${extra}>${mathEsc(s)}</text>`;
const rect=(x,y,w,h,fill=C.white,r=18,stroke='none',sw=1)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line=(a,b,c=C.line,w=2,dash='')=>`<path d="M${a[0]} ${a[1]} L${b[0]} ${b[1]}" fill="none" stroke="${c}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
const circle=(x,y,r,fill,stroke='none',sw=1)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
function words(s,max=88){const out=[];let l='';for(const w of s.split(' ')){if((l+' '+w).length>max){out.push(l);l=w}else l=(l+' '+w).trim()}if(l)out.push(l);return out}
const multi=(x,y,s,size=26,color=C.ink,max=42,weight=400,lh=1.3)=>words(s,max).map((l,i)=>text(x,y+i*size*lh,l,size,color,weight)).join('');
function node(x,y,w,h,title,sub='',fill=C.white,active=false,color=C.p){return rect(x,y,w,h,fill,14,active?color:'#bbc4ca',active?3:1)+text(x+w/2,y+h/2+(sub?-3:8),title,22,C.ink,600,'middle')+(sub?text(x+w/2,y+h/2+23,sub,17,C.muted,400,'middle'):'')}
function path(points,t=0,color=C.ink,active=true,dashed=false){
 let d=points.map((p,i)=>`${i?'L':'M'}${p[0]},${p[1]}`).join(' ');let lengths=[],total=0;
 for(let i=1;i<points.length;i++){total+=Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]);lengths.push(total)}
 let result=`<path d="${d}" fill="none" stroke="${active?color:'#b7c0c4'}" stroke-width="${active?2.5:1.5}" stroke-linejoin="round" marker-end="url(#arrow)" ${dashed?'stroke-dasharray="6 6"':''}/>`;
 if(active&&total){for(let q=0;q<2;q++){let dist=((t*.36+q*.5)%1)*total;let i=lengths.findIndex(l=>l>=dist);if(i<0)i=lengths.length-1;let before=i?lengths[i-1]:0;let u=(dist-before)/(lengths[i]-before);let a=points[i],b=points[i+1];result+=circle(a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,4.5,color)}}return result;
}
function g1(x,y,w,h,img,opacity=1){return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="987 39 315 795" preserveAspectRatio="xMidYMid meet" opacity="${opacity}"><defs><clipPath id="gclip${x}${y}" clipPathUnits="userSpaceOnUse"><path d="M1090 39H1302V834H987V435L1020 400L1045 330L1050 190L1090 166Z"/></clipPath></defs><image href="${esc(img)}" width="2000" height="1470" clip-path="url(#gclip${x}${y})"/></svg>`}
function lock(x,y,color=C.p){return `<g transform="translate(${x},${y})"><path d="M-8 0v-7a8 8 0 0 1 16 0v7" fill="none" stroke="${color}" stroke-width="3"/>${rect(-13,0,26,23,color,4)}${circle(0,9,2.5,C.white)}</g>`}
function pill(x,y,w,label,color=C.p,fill=C.purple){return rect(x,y,w,36,fill,18)+text(x+w/2,y+24,label,17,color,600,'middle')}
function stagebar(active){let labels=['Training rollout','Execution feedback','Feedback control','Next block'];return labels.map((l,i)=>{let x=68+i*369;return rect(x,156,355,45,[C.blue,C.purple,C.yellow,C.orange][i],10,active===i?C.ink:'none',1.5)+text(x+20,185,`0${i+1}`,18,[C.b,C.p,C.y,C.o][i],700)+text(x+63,185,l,21,C.ink,active===i?700:400)}).join('')}
// An editable, faithful topology derived from manuscript Figure 1.
function framework(t,focus=-1){
 const cols=[[68,310,C.blue,C.b],[400,412,C.purple,C.p],[834,333,C.yellow,C.y],[1189,343,C.orange,C.o]];
 let out='';cols.forEach(([x,w,b,c],i)=>{out+=rect(x,238,w,467,b,20,focus===i?c:'none',2)});
 const active=i=>focus<0||focus===i;
 out+=node(125,269,200,58,'Policy','πθ',C.white,active(0),C.b);
 out+=node(125,349,200,58,'Delay queue','qᵃᵖᵖ',C.white,active(0),C.b);
 out+=node(125,429,200,58,'PD controller','200 Hz',C.white,active(0),C.b);
 out+=rect(125,501,200,80,C.white,14,active(0)?C.b:'#bbc4ca',active(0)?3:1)+bones('01_walking','fixed',frameAt(t%6),160,572,45,C.b)+text(197,533,'G1 dynamics',18,C.ink,600)+text(197,556,'recorded demo',13,C.muted);
 out+=node(125,589,200,58,'Joint sensing','qᵉˣᵉᶜ',C.white,active(0),C.b);
 for(let j=0;j<4;j++)out+=path([[225,327+j*80],[225,349+j*80]],t,C.b,active(0));
 out+=path([[125,538],[90,538],[90,298],[125,298]],t,C.b,active(0));
 out+=text(225,682,'DR configuration',20,C.b,600,'middle');
 out+=node(420,300,177,74,'Command','history cₜ',C.white,active(1),C.p);
 out+=node(420,438,177,74,'Execution','history xₜ',C.white,active(1),C.p);
 out+=node(632,333,155,176,'Shared frozen','encoder',C.white,active(1),C.p)+lock(710,475)+text(608,536,'Normalize posterior means',17,C.p,600,'middle');
 out+=path([[225,337],[380,337],[380,337],[419,337]],t,C.b,active(1));
 out+=text(355,322,'qᶜᵐᵈ',16,C.b,600,'middle');
 out+=path([[325,618],[388,618],[388,475],[419,475]],t,C.p,active(1));
 out+=path([[598,337],[619,337],[619,384],[632,384]],t,C.p,active(1));
 out+=path([[598,475],[619,475],[619,459],[632,459]],t,C.p,active(1));
 out+=node(449,587,321,62,'Latent discrepancy','δₜ = 1 − zᶜ · zˣ',C.white,active(1),C.p);
 out+=path([[697,509],[697,553],[574,553],[574,587]],t,C.p,active(1));
 out+=path([[728,509],[728,566],[656,566],[656,587]],t+.5,C.p,active(1));
 out+=node(860,271,281,66,'Block gap yₖ','90th percentile',C.white,active(2),C.y);
 out+=node(860,386,281,76,'Bounded PI update','error + integral memory',C.white,active(2),C.y);
 out+=path([[770,618],[823,618],[823,304],[860,304]],t,C.p,active(2));
 out+=path([[1000,337],[1000,386]],t,C.y,active(2));
 out+=node(860,497,281,62,'Mean task return','independent feedback',C.white,active(2),C.y);
 out+=node(860,603,281,65,'Low return twice?','backoff after warm-up',C.white,active(2),C.y);
 out+=path([[1000,559],[1000,603]],t,C.y,active(2));
 out+=node(1211,377,299,120,'Choose next intensity','PI or return backoff',C.white,active(3),C.o);
 out+=node(1211,581,299,69,'Set DR ranges','hold during next block',C.white,active(3),C.o);
 out+=path([[1141,424],[1211,424]],t,C.y,active(3));
 out+=path([[1141,635],[1179,635],[1179,466],[1211,466]],t,C.o,active(3));
 out+=path([[1360,497],[1360,581]],t,C.o,active(3));
 out+=path([[1510,615],[1550,615],[1550,734],[225,734],[225,693]],t,C.o,active(3),true);
 out+=rect(634,717,330,30,C.paper,6)+text(799,738,'Next-block configuration',19,C.o,600,'middle');
 return out;
}
function pretrain(t,freezeAt=8.25){
 const id='01_walking',frame=24+Math.floor((t%5.5)*50),step=t>=freezeAt?4:Math.min(3,Math.floor(t/(freezeAt/4)));
 let out=rect(70,178,535,588,'#eef3f6',22)+rect(627,178,903,588,C.white,22,'#dce1e3');
 out+=text(98,221,'Reference motion → temporal window',26,C.ink,650)+pill(97,241,218,'G1 / SOURCE REPLAY',C.b,C.blue);
 out+=floorGrid(239,563,220)+bones(id,'reference',frame,239,563,206,C.b);
 out+=text(417,339,'50 Hz',40,C.b,650,'middle')+text(417,375,'25 samples',23,C.ink,500,'middle')+text(417,411,'0.48 s span',23,C.muted,400,'middle');
 out+=referenceWindow(id,frame,234,598,337,117)+text(98,751,'6 leg joints · blue −1.5 / purple +1.5 rad',18,C.muted);
 out+=pill(656,201,265,'PAPER / DENOISING VAE',C.p,C.purple);
 const nodes=[['Add noise','σ = 0.03 rad'],['TCN encoder','3 layers · width 128'],[step===4?'Posterior mean':'Sample z','32 coordinates'],['Decoder','recover clean w']];
 nodes.forEach(([a,b],i)=>{let x=656+i*213;out+=node(x,302,195,97,a,b,(i===step||step===4&&i===1)?C.purple:C.white,(step===i||step===4&&i===1),C.p);if(i<3)out+=path([[x+195,350],[x+211,350]],t,C.p,step>=i)});
 out+=path([[646,284],[646,264],[1494,264],[1494,445]],t,C.b,true)+rect(939,246,262,32,C.white,0)+text(1070,268,'Clean target w is retained',18,C.b,600,'middle');
 out+=text(657,445,'w̃ = w + ε ;   ε ~ N(0, 0.03² I)',28,C.p,600);
 out+=rect(653,475,849,118,C.purple,14)+text(675,514,'L = E[ ‖w − D(z)‖_{F}^{2} / (HJ) ]',26,C.ink,600)+text(737,558,'+ 10⁻³ KL( q(z | w̃) ‖ N(0, I) )',24,C.p,600);
 out+=text(657,634,'25 × 23',37,C.p,650)+text(657,666,'paper input shape',19,C.muted)+text(937,634,'120,000',37,C.p,650)+text(937,666,'reference windows',19,C.muted)+text(1212,634,'50 epochs',37,C.p,650)+text(1212,666,'offline pretraining',19,C.muted);
 out+=lock(686,708)+text(717,730,'Freeze encoder → use posterior means during PPO',25,C.p,650);
 out+=text(74,802,'Left: matching demo reference, replayed. Right: published training recipe; architecture and objective.',21,C.muted);
 return out;
}
function gap(t,override){
 const {id,frame}=override||selectedMotion(t),m=MOTION.motions[id];
 let out=rect(70,177,652,516,'#eef3f6',22)+rect(744,177,787,516,C.white,22,'#dce1e3');
 out+=text(96,218,'G1 / '+m.name.toLowerCase(),28,C.ink,650)+text(699,216,`${((frame+1)/50).toFixed(2)} / 6.00 s`,20,C.muted,400,'end');
 out+=pill(98,235,283,'MUJOCO POSES · 50 Hz · 1×',C.b,C.blue);
 [[236,'fixed',C.p,POLICY_LABELS.fixed],[555,'off',C.o,POLICY_LABELS.off]].forEach(([x,arm,color,label])=>{out+=floorGrid(x,629,251)+bones(id,'reference',frame,x,624,200,C.b,.45)+bones(id,arm,frame,x,624,200,color,.95)+text(x,663,label,25,color,650,'middle')});
 out+=text(96,288,'Blue: synchronized reference',19,C.b)+text(699,288,'XY root aligned',18,C.muted,400,'end');
 out+=text(776,216,'Recorded motion, sample by sample',27,C.ink,650);
 [['Reference',C.b],[POLICY_LABELS.fixed,C.p],[POLICY_LABELS.off,C.o]].forEach(([l,c],i)=>{out+=line([779+i*243,249],[802+i*243,249],c,3)+text(810+i*243,255,l,18,c,500)});
 out+=measuredPlot(id,frame,{x:816,y:314,w:676,h:141,joint:3})+measuredPlot(id,frame,{x:816,y:537,w:676,h:100,kind:'root',arms:['fixed','off']});
 out+=rect(70,705,1461,116,C.purple,15)+text(95,735,'FILTERED-ERROR PI: FILTERED JOINT ERROR     ·     LUCID: LEARNED TEMPORAL DISCREPANCY',21,C.p,650)+text(95,786,'qᶜᵐᵈ − qᵉˣᵉᶜ = (qᶜᵐᵈ − qᵃᵖᵖ) + Kp⁻¹(τ + Kd q̇ᵉˣᵉᶜ)',31,C.ink,600);
 out+=text(1502,815,'Reference ≠ issued command · ideal unsaturated PD',18,C.muted,400,'end')+text(1502,776,'Error includes torque-generating offsets',19,C.p,500,'end');
 return out;
}
function controller(t){
 const phase=t<5?0:t<11?1:2;let out=stagebar(2);
 out+=rect(70,235,940,218,C.purple,22)+text(102,282,'EXECUTION FEEDBACK → PI PACING',25,C.p,650);
 out+=node(102,318,255,91,'Latent gap yₖ','90th percentile',C.white,phase===0,C.p);
 out+=path([[359,364],[423,364]],t,C.p,phase===0)+node(425,318,548,91,'Bounded PI adjustment','error relative to calibrated nominal gap + memory',C.white,phase===0,C.p);
 out+=rect(70,483,940,260,C.orange,22)+text(102,532,'TASK RETURN → INDEPENDENT BACKOFF',25,C.o,650);
 out+=node(102,564,310,95,'Two low-return blocks','after warm-up',C.white,phase===1,C.o);
 out+=path([[416,610],[477,610]],t,C.o,phase===1)+node(482,564,490,95,'Intensity × 0.70','reset integral · override PI proposal',C.white,phase===1,C.o);
 out+=text(106,710,'Low return: below 0.65 × nominal mean return',22,C.muted);
 out+=path([[1010,362],[1060,362],[1060,445],[1110,445]],t,C.p,phase===0);
 out+=path([[1010,610],[1060,610],[1060,525],[1110,525]],t,C.o,phase===1);
 out+=rect(1114,307,416,359,C.yellow,22,phase===2?C.y:'none',2)+text(1322,365,'NEXT TRAINING BLOCK',23,C.y,650,'middle');
 out+=text(1322,455,'Set DR ranges',38,C.ink,600,'middle')+text(1322,518,'Hold intensity fixed',29,C.ink,600,'middle')+text(1322,594,'Repeat after the block',23,C.muted,400,'middle');
 out+=text(74,800,'PI: uₖ = clip(kP eₖ + kI Iₖ, −1, 1)     ·     Learned feedback schedules training, not onboard control.',21,C.muted);
 return out;
}
function rollout(t){let focus=Math.min(3,Math.floor(t/4));let out=stagebar(focus)+framework(t,focus);const desc=['PPO updates the policy. Dynamics and observations are randomized at fixed intensity.','Separate command and measured histories pass through the same frozen encoder.','The upper-quantile gap feeds PI; mean task return provides independent backoff.','Choose next intensity, set the ranges, and repeat. The encoder stays frozen.'];out+=text( 72,796,desc[focus],24,[C.b,C.p,C.y,C.o][focus],600);return out}
function parallelEvaluation(t){let out='';
 out+=pill(70,164,865,'CONTEXT REPLAY · 0–40 ms DELAY · 1,024 EVALUATION ENVIRONMENTS',C.b,C.blue)+text(1530,191,'HELD-OUT TEST',21,C.p,650,'end');
 out+=rect(70,220,960,540,'#071118',0);
 out+=rect(1060,220,470,540,C.white,20,'#dce0e1')+text(1087,265,'ADDED DELAY',23,C.b,650)+text(1087,311,'Train 0–40 ms → test 60 ms',26,C.ink,600);
 const progress=ease((t-3)/2);
 out+=rect(1098,350,247,15,C.b,5)+rect(1345,350,123*progress,15,C.o,5);
 for(const [x,v] of [[1098,0],[1345,40],[1468,60]])out+=line([x,340],[x,379],C.muted,2)+text(x,410,v+'',22,C.ink,500,'middle');
 out+=text(1087,486,'+50%',57,C.o,700)+text(1087,525,'Above the training-delay maximum',22,C.o,500);
 out+=line([1087,550],[1504,550],C.line)+text(1087,594,'4,096 training environments',24,C.ink,600)+text(1087,639,'5 seeds × 1,000 shared scenarios',22,C.ink)+text(1087,681,'30 held-out motions · full clips',23,C.muted)+text(1087,725,'60 ms test: nominal dynamics',23,C.o,600);
 out+=text(70,801,'Shown: recorded evaluation · frozen policy · no resets · 0.25× simulation time',22,C.muted);
 return out;
}
function evaluation(t){let out=rect(69,198,669,540,C.blue,24)+rect(765,198,767,540,C.orange,24);
 out+=text(99,248,'TRAIN IN ISAAC LAB',24,C.b,650)+text(99,340,'0–40 ms',76,C.ink,650)+text(99,386,'Added delay in 5 ms FIFO ticks',26,C.muted);
 out+=text(99,476,'4,096 parallel environments',30,C.ink,600)+text(99,525,'150 blocks / 29.49M transitions',27,C.ink)+text(99,575,'120 train + 30 calibration clips',27,C.ink)+text(99,665,'2 s training episodes',30,C.b,650);
 out+=text(799,248,'FREEZE CURRICULUM · EVALUATE',24,C.o,650)+text(799,340,'60 ms',76,C.ink,650)+text(799,386,'Unseen delay / nominal dynamics',26,C.muted);
 out+=text(799,476,'5 seeds × 1,000 scenarios',30,C.ink,600)+text(799,525,'30 held-out motion clips',27,C.ink)+text(799,575,'Full-range and non-timing tests',27,C.ink)+text(799,665,'Full clips / 2.5–6.0 s',30,C.o,650);
 let p=ease(t/3);out+=path([[688,172],[688+140*p,172],[828,187]],t,C.o)+text(799,789,'Completion = reach the clip end without termination.',25,C.ink,500,'middle');return out}
function axis(x,y,w,h,xmin,xmax,ymin,ymax,xticks,yticks,xlabel,ylabel){let out='';for(const v of xticks){let xx=x+(v-xmin)/(xmax-xmin)*w;out+=line([xx,y],[xx,y+h],'#e6e8e8',1)+text(xx,y+h+27,v,18,C.muted,400,'middle')}for(const v of yticks){let yy=y+h-(v-ymin)/(ymax-ymin)*h;out+=line([x,yy],[x+w,yy],'#e6e8e8',1)+text(x-12,yy+6,v,18,C.muted,400,'end')}out+=line([x,y+h],[x+w,y+h],C.muted,1.5)+text(x+w/2,y+h+61,xlabel,21,C.muted,500,'middle')+text(x,y-22,ylabel,20,C.muted);return out}
function horizontalChart(x,y,w,title,data,t){let out=text(x,y,title,25,C.ink,650);const start=x+3,ww=w-22;for(const tick of [0,25,50,75,100]){let xx=start+ww*tick/100;out+=line([xx,y+47],[xx,y+206],'#e4e7e8',1)+text(xx,y+235,tick,17,C.muted,400,'middle')}data.forEach(([l,v,err,c],i)=>{let yy=y+54+i*92,p=ease(t/2);out+=text(start,yy,l,20,c,600)+text(start+ww,yy,`${v.toFixed(1)}%`,23,c,650,'end')+rect(start,yy+14,ww*v/100*p,28,c,4);if(p===1){let a=start+ww*(v-err)/100,b=start+ww*(v+err)/100;out+=line([a,yy+28],[b,yy+28],C.ink,2)+line([a,yy+20],[a,yy+36],C.ink,2)+line([b,yy+20],[b,yy+36],C.ink,2)}});return out}
function detailedResults(t){let out=rect(69,181,717,582,C.white,22,'#dce0e1')+rect(812,181,720,582,C.white,22,'#dce0e1');
 out+=horizontalChart(97,225,656,'Full-range completion',[['Filtered-error PI',76.8,2,C.b],['LUCID',88.9,1.1,C.p]],t);
 out+=horizontalChart(97,499,656,'Unseen 60 ms added delay',[['Filtered-error PI',52.1,2.8,C.b],['LUCID',73.8,2.1,C.p]],t-2);
 out+=text(847,225,'Figure 2b / policy-dependent response',25,C.ink,650);
 const x=900,y=302,w=556,h=278;out+=rect(x+w*.5,y,w*.5,h,'#fcf0e2',0)+axis(x,y,w,h,20,60,0,1,[20,40,60],[0,.25,.5,.75,1],'Injected delay (ms)','Median latent discrepancy');
 const series=[['Nominal policy',[.364,.645,.912],C.o],['Filtered-error PI',[.245,.412,.628],C.b],['LUCID',[.138,.215,.342],C.p]];
 let p=ease((t-3)/5);for(let j=0;j<series.length;j++){let [lab,vals,c]=series[j];let pts=vals.map((v,i)=>[x+i*w/2,y+h-v*h]);let visible=[pts[0]];for(let k=1;k<pts.length;k++){if(p*2>=k)visible.push(pts[k]);else if(p*2>k-1){let f=p*2-(k-1);visible.push([pts[k-1][0]+(pts[k][0]-pts[k-1][0])*f,pts[k-1][1]+(pts[k][1]-pts[k-1][1])*f]);break;}}let d=visible.map((v,i)=>`${i?'L':'M'}${v.join(',')}`).join(' ');out+=`<path d="${d}" fill="none" stroke="${c}" stroke-width="3.5"/>`;pts.forEach((q,i)=>{if(p>=i/2)out+=circle(q[0],q[1],5.5,c)});out+=line([859,683+j*24],[880,683+j*24],c,3)+text(891,689+j*24,lab,18,C.ink)}
 out+=text(1453,661,'Shaded: beyond training range',18,C.o,500,'end');
 out+=text( 72,797,'Table III: means + 95% intervals. Hybrid LUCID + DORAEMON: 89.5% full range / 74.6% unseen delay.',20,C.muted);return out}
function detailedAllocation(t){let out=rect(69,190,715,570,C.white,22,'#dce0e1')+rect(810,190,722,570,C.white,22,'#dce0e1');
 out+=text(99,240,'Unseen-delay completion / ablations',27,C.ink,650);
 const vals=[['No return backoff',50.4,4.6,C.o],['Ordinary reconstruction',64.8,4.3,C.b],['Full LUCID',73.8,2.1,C.p]];
 vals.forEach(([l,v,e,c],i)=>{let y=310+i*103;out+=text(101,y,l,23,C.ink,500)+rect(101,y+22,v*7.2*ease(t/2),28,c,5)+text(740,y+44,`${v}%`,25,c,650,'end');if(t>2)out+=line([101+(v-e)*7.2,y+36],[101+(v+e)*7.2,y+36],C.ink,2)});
 out+=text(102,610,'60 ms added delay / reported 95% intervals',20,C.muted);out+=rect(95,650,662,68,C.purple,12)+text(116,678,'Live vs ordered donor replay',22,C.p,650)+text(116,706,'+15.6 pp under unseen delay / one donor, five recipients',19,C.ink);
 out+=text(840,240,'Figure 2a / matched pacing allocations',27,C.ink,650)+text(1504,285,'Δ pp',18,C.p,600,'end');
 const x=1040,y=310,w=402,h=270;out+=axis(x,y,w,h,60,95,0,2,[60,70,80,90],[],'Full-range completion (%)','');
 [['All channels',73.5,88.9,2.5,1.1],['Delay paced',74.8,85.4,2.6,1.8],['Dynamics paced',66.8,69.4,3.2,3.1]].forEach(([l,a,b,ae,be],i)=>{let yy=y+20+i*98,xx=v=>x+(v-60)/35*w;out+=text(x-18,yy+7,l,21,C.ink,500,'end')+line([xx(a),yy],[xx(a+(b-a)*ease((t-1)/3)),yy],C.p,3);for(const [v,e,c]of[[a,ae,C.muted],[b,be,C.p]]){out+=line([xx(v-e),yy],[xx(v+e),yy],c,2)+circle(xx(v),yy,6,c)}out+=text(1470,yy+8,`+${(b-a).toFixed(1)}`,19,C.p,650)});
 out+=circle(1050,695,5,C.muted)+text(1064,701,'Linear',19,C.ink)+circle(1171,695,5,C.p)+text(1185,701,'LUCID',19,C.ink)+text(1450,737,'Means with 95% intervals',19,C.muted,400,'end');
 out+=text( 72,800,'Matched allocations pace the same channels. Unpaced delay: 40 ms; unpaced dynamics/noise: full range.',20,C.muted);return out}

function results(t){let out=rect(70,183,936,575,C.white,22,'#dce0e1')+rect(1032,183,498,575,C.purple,22);
 out+=text(102,237,'Unseen +60 ms delay · nominal dynamics',30,C.ink,650);
 out+=horizontalChart(102,291,865,'Full held-out motion completion',[['Filtered-error PI',52.1,2.8,C.o],['LUCID',73.8,2.1,C.p]],t);
 out+=text(103,637,'5 seeds × 1,000 shared scenarios per seed',24,C.muted)+text(103,680,'Mean completion with reported 95% intervals',23,C.muted);
 out+=text(1281,300,'+21.7',98,C.p,700,'middle')+text(1281,355,'percentage points',29,C.p,600,'middle');
 out+=text(1064,446,'Full-range completion',26,C.ink,600)+text(1064,500,'76.8% → 88.9%',39,C.ink,600)+text(1064,544,'Filtered-error PI → LUCID',23,C.muted);
 out+=text(1064,619,'Reported 95% intervals',21,C.muted)+text(1064,656,'PI ±2.0 pp · LUCID ±1.1 pp',23,C.ink);
 out+=text(74,795,'Table III · Highest tested means: LUCID + DORAEMON, 89.5% full range / 74.6% unseen delay.',21,C.muted);return out;
}
function allocation(t){let out=rect(70,182,718,575,C.white,22,'#dce0e1')+rect(812,182,718,575,C.white,22,'#dce0e1');
 out+=text(103,232,'Does denoising matter?',30,C.ink,650)+text(844,232,'Does live feedback matter?',30,C.ink,650);
 out+=horizontalChart(103,305,645,'Unseen-delay completion',[['Ordinary reconstruction',64.8,4.3,C.b],['Denoising · LUCID',73.8,2.1,C.p]],t);
 out+=horizontalChart(844,305,645,'Unseen-delay completion',[['Ordered donor replay',58.2,0,C.o],['Live feedback · LUCID',73.8,2.1,C.p]],t-2);
 // Replay reports an asymmetric percentile interval, not a symmetric error bar.
 if(t>=4){const x=v=>847+623*v/100;out+=line([x(44.6),387],[x(66.0),387],C.ink,2)+line([x(44.6),379],[x(44.6),395],C.ink,2)+line([x(66),379],[x(66),395],C.ink,2)}
 out+=text(104,645,'+9.0 percentage points',32,C.p,650)+text(104,695,'Same evaluation · reported 95% intervals',21,C.muted);
 out+=text(844,645,'+15.6 percentage points',32,C.p,650)+text(844,695,'One donor schedule · five recipient seeds',22,C.muted);
 out+=text(74,795,'Table V · +60 ms added delay. Replay 95% interval [44.6, 66.0]. Additional ablations in the paper.',21,C.muted);return out;
}
function simulation(t,project){
 const g=project.simulation_gallery,c=simulationClip(t,project),labels=g.policy_labels;let out='';
 out+=pill(70,162,785,'SIMULATION EVALUATION · MUJOCO PHYSICS · SELECTED TRIALS',C.b,C.blue);
 if(c){
  out+=text(1528,190,`${c.title} · full 6 s · 1×`,25,C.ink,650,'end');
  [labels.left,labels.reference,labels.right].forEach((l,i)=>{let x=70+i*1460/3;out+=rect(x,218,1460/3-4,38,[C.purple,C.blue,C.orange][i],8)+text(x+18,245,l,23,[C.p,C.b,C.o][i],650)});
  out+=rect(70,260,1460,444,'#0b1420',0);
  const sourceTime=t-c.start,push=sourceTime>=4&&sourceTime<4.2?'IMPULSE −Y':sourceTime>=2&&sourceTime<2.2?'IMPULSE +X':'Scheduled impulses';
  out+=text(70,737,'+40 ms added delay',25,C.b,650)+text(420,737,`${push} · Δv 1.50 m/s · 3× baseline`,23,C.ink,500)+text(1530,737,`${sourceTime.toFixed(2)} / 6.00 s`,22,C.muted,500,'end');
  out+=text(74,792,'Full recorded interval. Staying above the fall threshold does not imply accurate tracking.',23,C.muted);
 }else if(t<3){
  out+=text(75,301,'Two motions. Full recorded outcomes.',49,C.ink,600);
  [['+40 ms','Added delay',C.blue,C.b],['1.50 m/s','Scheduled velocity impulses',C.yellow,C.y],['1×','Original playback speed',C.purple,C.p]].forEach(([value,label,bg,fg],i)=>{let x=70+i*493;out+=rect(x,358,474,220,bg,22)+text(x+28,444,value,61,fg,650)+text(x+28,517,label,25,C.ink,500)});
  out+=text(75,655,'LUCID left · synchronized reference center · filtered-error PI right',30,C.ink,600)+text(75,726,'Walking, then turning. Each recording runs for six seconds.',28,C.muted);
 }else if(t<12){
  out+=text(75,310,'Walking · the recorded outcome',48,C.ink,600);
  out+=text(75,420,'Filtered-error PI crosses the height-failure threshold at 2.94 s.',31,C.o,600);
  out+=text(75,487,'LUCID remains above that threshold through the 6 s recording.',31,C.p,600);
  out+=text(75,575,'Both tracks show root-position drift. This is a balance contrast.',29,C.muted);
  out+=text(75,712,'Next: turning, with the same delay and scheduled impulses.',32,C.ink,600);
 }else{
  out+=text(75,303,'Behavioral examples, with the outcome visible.',46,C.ink,600);
  const rows=[['Turning','Filtered-error PI height failure: 4.56 s. LUCID stays above the threshold for 6 s.'],['Tracking remains imperfect','Root-position drift is visible in both runs; upright does not mean successful completion.'],['Selected trials','Other motions include LUCID falls. Aggregate claims come from the paper benchmarks.']];
  rows.forEach(([title,sub],i)=>{let y=340+i*142;out+=rect(70,y,1460,121,[C.blue,C.purple,C.orange][i],17)+text(96,y+42,title,30,C.ink,600)+text(96,y+84,sub,24,C.muted)});
 }return out;
}
function physicalEvidence(t,slots,deploymentAt=17){
 let out=pill(70,158,586,'PHYSICAL G1 · +40 ms ADDED DELAY',C.o,C.orange)+text(1530,184,'4 motions × 3 checkpoints × 5 repetitions',22,C.muted,400,'end');
 const ss=slots.filter(s=>s.domain==='hardware').sort((a,b)=>(a.method==='LUCID'?-1:1));
 ss.forEach((slot,i)=>{const x=i?834:70,col=i?C.o:C.p,bg=i?C.orange:C.purple;
  out+=text(x,222,slot.method,29,col,650)+text(x+696,221,'Matched condition · 1×',21,C.muted,400,'end');
  out+=rect(x,240,696,373,slot.path?'#0b1118':'#eef1f3',18,'#d0d7db');
  if(!slot.path){out+=bones('01_walking','reference',frameAt(t%6),x+105,565,191,C.b,.22)+text(x+402,378,'Matched G1 recording',33,C.ink,600,'middle')+text(x+402,424,'Physical footage pending',25,C.muted,500,'middle')+text(x+402,469,'Simulation reference shown',21,C.muted,400,'middle')+pill(x+279,516,248,'FOOTAGE PLACEHOLDER',C.o,C.orange);}
  else out+=text(x+14,603,slot.condition,19,C.white,500);
  out+=rect(x,625,696,86,bg,15);
  if(t>=3)out+=text(x+23,683,i?'23/60':'38/60',48,col,700)+text(x+233,664,'Full-trial completions',24,C.ink,600)+text(x+233,695,'Reported aggregate · '+(i?'38.3%':'63.3%'),21,C.muted);
  else out+=text(x+24,679,'Verified +40 ms added-delay condition',27,col,600);
 });
 if(t<deploymentAt){
  if(t>=3)out+=text(75,774,'+25.0 pp',52,C.p,700)+text(358,753,'LUCID − filtered-error PI',26,C.ink,600)+text(358,793,'Paired 95% interval [11.8, 38.2] pp',24,C.muted)+text(1528,777,'Paper Table VII · Figure 3',22,C.muted,400,'end');
  else out+=text(75,779,'+40 ms is added FIFO delay; nominal sensor-to-dispatch latency is 18.4 ms.',25,C.muted);
 }else{
  out+=rect(70,733,450,73,C.purple,12)+text(93,760,'TRAINING ONLY',19,C.p,650)+text(93,792,'Encoder + curriculum scheduler',25,C.ink,600);
  out+=rect(548,733,982,73,C.blue,12)+text(571,760,'ONBOARD',19,C.b,650)+text(571,792,'Policy → low-level controller → physical G1',30,C.ink,600);
 }
 return out;
}
function demos(t,id,slots,img){let hardware=id==='hardware',out='';const panels=[{x:70,w:696},{x:834,w:696}],ss=slots.filter(s=>s.domain===id).sort((a,b)=>(a.method==='LUCID'?-1:1));
 if(hardware)out+=text(72,173,'PHYSICAL EVALUATION · UNITREE G1 · 60 PAIRED TRIALS PER CONDITION',22,C.ink,650);
 panels.forEach((p,i)=>{let slot=ss[i];out+=text(p.x,218,slot.method,28,slot.method==='LUCID'?C.p:C.o,650)+pill(p.x+p.w-164,188,164,'24s / 1×',C.muted,'#efeeeb');out+=rect(p.x,240,p.w,373,hardware?'#f5eee5':'#eaf1f6',18,'#d0d7db');
 if(!slot.path){out+=`<path d="M${p.x+50} 550h${p.w-100} M${p.x+100} 580l${p.w/2-100} -300 ${p.w/2-100} 300" stroke="${hardware?'#e2d1bb':'#c5d5e1'}" stroke-width="2" fill="none"/>`;
 if(hardware)out+=bones('01_walking','reference',frameAt(t%6),p.x+102,551,177,C.o,.24);
 out+=text(p.x+p.w/2,390,'Your '+(hardware?'G1':'simulation')+' footage',36,C.ink,600,'middle')+text(p.x+p.w/2,435,'Simulation reference preview · hardware footage pending',22,C.muted,400,'middle')+pill(p.x+p.w/2-124,495,248,'FOOTAGE PLACEHOLDER',C.o,C.orange);
 }else{out+=rect(p.x,240,p.w,373,'#0b1118',18)+text(p.x+15,636,slot.condition||'Condition label required',19,C.muted)}
 });
 if(!hardware){out+=rect(71,650,1459,119,C.blue,17)+text(99,687,'MuJoCo / +40 ms added delay',27,C.b,650)+text(99,735,'28 / 60 → 44 / 60',41,C.ink,650)+text(702,715,'+26.7 pp',51,C.p,650)+text(1090,715,'Paired 95% CI',21,C.muted)+text(1090,748,'[13.2, 40.2] pp',26,C.ink,600)}
 else{
 out+=rect(71,650,546,133,C.orange,17)+text(96,687,'G1 / +40 ms added delay',24,C.o,650)+text(96,745,t<3?'Condition first: +40 ms':'LUCID 38/60 · PI 23/60',32,C.ink,650);
 if(t>=3){out+=text(667,663,'Paired gain · LUCID − filtered-error PI',23,C.ink,650);
 const xx=v=>1065+v*8;out+=line([xx(0),680],[xx(0),755],C.muted,1.2,'4 4');
 [['Nominal',5,-2.1,12.1],['+20 ms',16.7,5.2,28.2],['+40 ms',25,11.8,38.2]].forEach(([l,m,a,b],i)=>{let yy=695+i*25;out+=text(674,yy+5,l,19,C.muted)+line([xx(a),yy],[xx(b),yy],C.p,i==2?3:2)+circle(xx(m),yy,i==2?6:4.5,C.p)+text(1489,yy+6,`+${m.toFixed(1)} pp`,20,C.p,650,'end')});
 for(const v of [0,10,20,30,40])out+=text(xx(v),790,v,16,C.muted,400,'middle');out+=line([xx(-5),770],[xx(40),770],C.line,1)+text(1155,815,'Difference (pp) / paired 95% intervals',18,C.muted,400,'middle');}else out+=text(675,731,'Added delay · same matched conditions for both policies',27,C.muted);
 }
 out+=text( 72,811,hardware?'Paper results · four motions · no encoder or scheduler onboard.':'Reported aggregate results; selected footage must carry its own verified motion and condition labels.',hardware?17:19,C.muted);return out}
function parallelHero(t){let out='';const frame=frameAt(Math.min(t,5.98));
 out+=text(70,279,'LUCID',105,C.ink,700)+rect(76,301,165*ease(t/1.5),6,C.p,3);
 out+=multi(76,355,'Latent-Understanding Curriculum for Informed Domain Randomization',27,C.ink,28,500,1.3);
 out+=multi(76,543,'Which execution feedback should guide training?',37,C.p,22,600,1.3);
 out+=text(76,760,'Learn the signal. Adapt the curriculum.',25,C.ink,500);
 out+=rect(600,178,930,593,'#eef3f6',22)+pill(640,202,650,'RECORDED G1 · MUJOCO EVALUATION · +40 ms',C.b,C.blue);
 out+=floorGrid(840,673,360)+floorGrid(1290,673,360)+bones('01_walking','reference',frame,840,673,287,C.b)+bones('01_walking','off',frame,1290,673,287,C.o);
 out+=text(840,725,'Reference motion',29,C.b,600,'middle')+text(1290,725,'Filtered-error PI',29,C.o,600,'middle');
 out+=text(605,808,t>=6?'End pose held · the complete 6 s trial appears later':'Recorded motion · scheduled pushes at 2 s and 4 s',22,C.muted);return out;
}
function hero(t,img){let out='';out+=text(72,292,'LUCID',156,C.ink,700)+rect(77,323,182*ease(t/1.5),8,C.p,4);
 out+=multi(78,398,'Latent-Understanding Curriculum for Informed Domain Randomization',34,C.ink,36,500)+text(78,543,'Humanoid motion tracking',28,C.muted);
 ['Observe execution','Adapt exposure','Transfer the policy'].forEach((l,i)=>{out+=pill(78,589+i*56,350,l,[C.b,C.p,C.o][i],[C.blue,C.purple,C.orange][i])});
 out+=rect(752,169,780,600,'#eeeff0',38)+g1(895,187,287,561,img,Math.max(.35,1-ease((t-5)/3)*.6));
 out+=bones('01_walking','reference',frameAt(t%6),1303,705,360,C.p);
 out+=text(784,802,'G1 reference pose reconstructed with the matching MuJoCo model.',18,C.muted);return out}
function closing(t,img){let out=rect(1022,183,508,571,'#eef3f6',22)+floorGrid(1275,693,370)+bones('01_walking','reference',frameAt(t%6),1275,691,325,C.p)+pill(1062,208,430,'G1 / RECORDED REFERENCE REPLAY',C.b,C.blue);
 out+=text(77,290,'+21.7 pp',92,C.p,700)+text(83,342,'Unseen +60 ms delay completion',28,C.muted)+text(83,387,'LUCID versus filtered-error PI',27,C.ink);
 out+=multi(80,480,'Learned execution feedback guides the robustness curriculum.',38,C.ink,39,600);
 out+=rect(77,624,889,128,C.purple,20)+text(105,675,'Policy → low-level controller → G1',36,C.ink,650)+text(105,720,'No encoder or curriculum scheduler onboard',26,C.p,600);
 out+=text(80,802,'Additional representation and curriculum computation stay in training.',25,C.muted);return out;
}
function hardwareOpening(){
 return text(72,282,'LUCID',104,C.ink,700)+text(76,335,'Physical Unitree G1',29,C.p,600)
 +multi(76,402,'A turning reference, repeated continuously.',34,C.ink,25,600,1.3)
 +text(76,558,'0–60 ms',55,C.p,700)+text(76,595,'added randomized delay',25,C.muted)
 +text(76,672,'Manual perturbations',28,C.ink,600)+text(76,713,'One continuous recording',25,C.muted)
 +text(570,207,'TURNING · LUCID POLICY · ORIGINAL SPEED',24,C.p,650)
 +text(570,803,'173 s excerpt · source 00:57–03:50 · face blur · annotated pushes',21,C.muted);
}
function hardwareChapter(){
 let out=text(60,202,'SAME CONTINUOUS TAKE · 0–60 ms ADDED DELAY',25,C.p,650)
 +text(60,806,'Looped turning reference · manual perturbations · privacy blur · 1×',23,C.muted);
 out+=text(1060,217,'SEPARATE PAPER BENCHMARK',23,C.o,650)+line([1060,235],[1530,235]);
 out+=text(1060,277,'+40 ms added FIFO delay',28,C.ink,600)+text(1060,312,'4 motions · 60 trials per method',23,C.muted);
 out+=text(1060,365,'LUCID',23,C.p,600)+text(1060,424,'38/60',61,C.p,700);
 out+=text(1310,365,'Filtered-error PI',23,C.o,600)+text(1310,424,'23/60',61,C.o,700);
 out+=text(1060,467,'Full-trial completions · reported aggregate',23,C.muted);
 out+=text(1060,530,'+25.0 pp',49,C.p,700)+text(1060,568,'Paired 95% CI [11.8, 38.2] pp',23,C.muted);
 out+=line([1060,605],[1530,605])+text(1060,651,'ONBOARD',22,C.b,650)
 +text(1060,697,'Policy → low-level control → G1',27,C.ink,600)
 +multi(1060,748,'Encoder and scheduler stay in training.',23,C.muted,36);
 return out;
}
function hardwareRail(t,project){
 const q=hardwareRect(t),ended=t>=project.hardware_take.duration,sec=Math.min(t,project.hardware_take.duration),fmt=n=>`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`;
 let out='';
 if(t>=10&&!(t>=144&&t<168)){
  out+=line([1200,140],[1200,790],C.line,1)+text(1220,158,'PHYSICAL G1 · LUCID',24,C.p,650);
  if(ended)out+=rect(q.x,q.y,q.w,q.h,C.purple,0)+text(1400,265,'Continuous excerpt',25,C.p,600,'middle')+text(1400,306,'completed',29,C.p,650,'middle');
  out+=text(1220,425,ended?'173 s shown continuously':'Continuous take · 1×',25,C.ink,600)
  +text(1220,474,`${fmt(sec)} / 2:53`,42,C.p,650)
  +rect(1220,496,360,4,'#ded9e4',0)+rect(1220,496,360*sec/173,4,C.p,0)
  +text(1220,545,'0–60 ms added delay',25,C.ink,600)+text(1220,581,'Randomized · author-confirmed',20,C.muted)
  +((project.hardware_take.events||[]).filter(e=>t>=e.start&&t<e.end).length
    ?(project.hardware_take.events||[]).filter(e=>t>=e.start&&t<e.end).map((e,i)=>text(1220,636+i*36,`${e.id} · ${e.kind==='hand'?'Hand':'Foot'} push`,26,e.kind==='hand'?C.p:C.o,650)).join('')
    :text(1220,636,'Turning reference repeats',23,C.ink,500)+text(1220,672,'Manual perturbations',23,C.ink,500))
  +text(1220,736,'Face blur · limbs remain visible',20,C.muted)+text(1220,770,'Source 00:57–03:50',20,C.muted);
 }else if(t<9)out+=text(1530,207,fmt(sec)+' / 2:53',23,C.muted,500,'end');
 else if(t>=144&&t<168)out+=text(1020,202,fmt(sec)+' / 2:53',22,C.muted,500,'end');
 return out;
}
export function renderSVG(time,project,options={}){
 Object.assign(C,project.palette||{});
 const t=Math.min(project.duration-1e-4,Math.max(0,time));let s=project.scenes.find(s=>s.start<=t&&t<s.end)||project.scenes.at(-1),local=t-s.start,img=options.image||'assets/g1-official.png';
 const starts=(options.cues||[]).filter(c=>c.scene===s.id).map(c=>c.start-s.start);
 let body='';switch(s.id){case'intro':body=project.process_design?cinematicHero(local):project.parallel_visualization?parallelHero(local):hero(local,img);break;case'gap':body=gap(local,options.motion);break;case'pretrain':body=pretrain(local,starts[1]??8.25);break;case'rollout':body=project.process_design?processRollout(local,[starts[1]??5.63,starts[2]??9.13,14]):rollout(local);break;case'controller':body=project.process_design?processController(local,[starts[1]??6,starts[2]??10]):controller(local);break;case'evaluation':body=project.parallel_visualization?parallelEvaluation(local):evaluation(local);break;case'results':body=results(local);break;case'ablation':body=allocation(local);break;case'simulation':body=project.simulation_gallery?simulation(local,project):demos(local,s.id,project.demo_slots,img);break;case'hardware':body=physicalEvidence(local,project.demo_slots,starts[2]??17);break;case'closing':body=project.process_design?.placements.some(m=>m.id==='process_finale')?processClosing(local):closing(local,img);break;}
 if(project.hardware_take&&s.id==='intro')body=hardwareOpening();
 if(project.hardware_take&&s.id==='hardware')body=hardwareChapter();
 let subtitle='';if(options.captions!==false){let cue=(options.cues||[]).find(c=>c.start<=t&&t<c.end);if(cue)subtitle=words(cue.text,110).map((l,i)=>text(800,851+i*29,l,23,C.ink,400,'middle')).join('')}
 let header=text( 72,46,s.eyebrow,19,C.p,650)+text(70,110,s.title,49,C.ink,650)+line([70,139],[1531,139],C.line,1);
 if(project.hardware_take){if(railScene(s.id)){body=`<g transform="translate(${MAIN.x},${MAIN.y}) scale(${MAIN.scale})">${header}${body}</g>`;header='';}body+=hardwareRail(t,project);}
 return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 900" width="1600" height="900" role="img" aria-label="${esc(s.title)}"><defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 1 1 L 9 5 L 1 9 z" fill="#77858d"/></marker><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".65" fill="#ccd0d0"/></pattern></defs><g font-family="Arial, Helvetica, sans-serif" letter-spacing="-.2">${rect(0,0,1600,900,C.paper,0)}<rect x="0" y="0" width="1600" height="827" fill="url(#dots)" opacity=".35"/>${header}${body}${rect(0,827,1600,69,C.paper,0)}${subtitle}${rect(0,896,1600,4,'#e5e3e2',0)}${rect(0,896,1600*t/project.duration,4,C.p,0)}</g></svg>`;
}

export function supplementalSVG(kind){return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><g font-family="Arial,Helvetica,sans-serif">${rect(0,0,1600,900,C.paper,0)}${text(70,105,kind==='architecture'?'The complete training architecture':kind==='response'?'Policy response and completion':'Ablations and matched allocations',45,C.ink,650)}${kind==='architecture'?rollout(12):kind==='response'?detailedResults(12):detailedAllocation(12)}</g></svg>`}
