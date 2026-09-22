import {bones,frameAt} from './motion-viz.mjs';
import {curriculumStep,trainingRanges,TEACHING_EXAMPLES} from './curriculum.mjs';

// Editable vector adaptation of the supplied process film. Diagram inputs are illustrative.
const P={bg:'#101524',panel:'#1b2236',line:'#424a60',ink:'#f1f4fa',muted:'#b4bfd1',blue:'#75c3f0',amber:'#efbd75',purple:'#c4a3e9',red:'#fb8593'};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const mathText=s=>esc(s).replace(/([ₜₖ])/g,c=>`<tspan baseline-shift="sub" font-size="65%">${c==='ₜ'?'t':'k'}</tspan>`).replace(/_(cmd|exec|next)/g,(_,v)=>`<tspan baseline-shift="sub" font-size="65%">${v}</tspan>`);
const text=(x,y,s,n=25,c=P.ink,w=400,a='start')=>`<text x="${x}" y="${y}" font-size="${n}" fill="${c}" font-weight="${w}" text-anchor="${a}">${mathText(s)}</text>`;
const rect=(x,y,w,h,c=P.panel,r=14,stroke=P.line)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${c}" stroke="${stroke}"/>`;
const clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x)};
const circle=(x,y,r,c,stroke='none')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${stroke}"/>`;
function arrow(points,t,color=P.purple){
 const d=points.map((p,i)=>`${i?'L':'M'}${p.join(' ')}`).join(' '),a=points.at(-2),b=points.at(-1),angle=Math.atan2(b[1]-a[1],b[0]-a[0]);
 let out=`<path d="${d}" fill="none" stroke="${color}" stroke-width="3"/>`;
 out+=`<path d="M${b} L${b[0]-12*Math.cos(angle-.45)},${b[1]-12*Math.sin(angle-.45)} L${b[0]-12*Math.cos(angle+.45)},${b[1]-12*Math.sin(angle+.45)}Z" fill="${color}"/>`;
 const i=Math.floor((t*.6%1)*(points.length-1)),u=(t*.6%1)*(points.length-1)-i;
 return out+circle(points[i][0]+(points[i+1][0]-points[i][0])*u,points[i][1]+(points[i+1][1]-points[i][1])*u,5,color);
}
function box(x,y,w,h,title,sub,color=P.purple){return rect(x,y,w,h,P.panel,14,color)+text(x+w/2,y+h/2-4,title,26,color,650,'middle')+text(x+w/2,y+h/2+29,sub,21,P.muted,400,'middle')}
function base(label,detail){return rect(70,174,1460,634,P.bg,22,P.bg)+text(104,220,label,21,P.purple,650)+text(1492,220,detail,19,P.muted,400,'end')}
function tabs(labels,active){return labels.map((l,i)=>rect(105+i*345,745,326,37,i===active?'#302740':P.bg,7,i===active?P.purple:P.line)+text(125+i*345,771,l,19,i===active?P.purple:P.muted,600)).join('')}
function windowDiagram(x,y,title,color,t){
 let out=text(x,y,title,27,color,600)+rect(x,y+22,406,113,P.bg,8,P.line);
 for(let row=0;row<3;row++)for(let j=0;j<25;j++)out+=`<rect x="${x+10+j*15.5}" y="${y+34+row*30}" width="11.5" height="20" rx="2" fill="${color}" opacity="${j===Math.floor(t*5)%25?.95:.18+row*.09}"/>`;
 out+=text(x,y+166,'t − 24',19,P.muted)+text(x+403,y+166,'t',19,P.muted,400,'end');return out;
}
export function cinematicHero(t){
 let out=text(72,266,'LUCID',96,'#263543',700);
 out+=text(75,327,'Learn execution feedback.',31,'#8862a2',650)+text(75,371,'Adapt training difficulty.',31,'#8862a2',650);
 out+=text(75,460,'How much uncertainty',33,'#263543',600)+text(75,504,'can training absorb?',33,'#263543',600);
 out+=text(75,581,'Train with feedback.',27,'#65717b')+text(75,619,'Deploy the learned policy.',27,'#65717b');
 out+=text(75,729,'Latent-Understanding Curriculum',23,'#263543')+text(75,763,'for Informed Domain Randomization',23,'#263543');
 out+=text(610,216,t<4?'SIMULATION · MANY EXPERIENCES':'SIMULATION · ONE EXECUTION',23,'#367db5',650);
 out+=rect(610,245,920,324,P.bg,0,P.bg);
 out+=text(613,604,t<4?'Recorded evaluation · 1,024 robots · green means no failure yet':'Recorded evaluation · representative reference ghost',20,'#65717b');
 out+=rect(610,643,920,160,'#E9DFF3',18,'#E9DFF3')+text(637,675,'PHYSICAL G1 · PAPER RESULT · +40 ms ADDED DELAY',22,'#8862a2',650);
 out+=text(637,738,'38/60',49,'#8862a2',700)+text(817,738,'vs 23/60',39,'#c87c31',600)+text(1488,738,'+25 pp',51,'#8862a2',700,'end');
 out+=text(639,778,'LUCID',22,'#8862a2',600)+text(846,778,'Filtered-error PI',22,'#c87c31',600)+text(1490,779,'Completion · Table VII',20,'#65717b',400,'end');
 return out;
}
export function processRollout(t,transitions=[5.63,9.13,14]){
 const phase=t<transitions[0]?0:t<transitions[1]?1:t<transitions[2]?2:3;
 let out=base('FOLLOW THE INFORMATION',phase===0?'Recorded G1 pose · explanatory signal path':'Schematic histories and geometry · no measured latent values');
 if(phase===0){
  out+=box(111,318,193,110,'Policy','50 Hz',P.blue)+box(354,318,242,110,'Issued target','q_cmd',P.blue)+box(647,318,213,110,'Delay queue','5 ms FIFO ticks',P.amber)+box(911,318,196,110,'PD control','200 Hz',P.amber);
  for(const [a,b]of[[304,354],[596,647],[860,911],[1107,1187]])out+=arrow([[a,373],[b,373]],t,P.blue);
  out+=rect(1189,278,289,300,P.panel,18,P.amber)+text(1333,312,'SIMULATED G1',22,P.amber,650,'middle')+bones('01_walking','fixed',frameAt(t%6),1333,550,186,P.blue);
  out+=box(356,588,366,110,'Command history cₜ','branch before the delay queue',P.blue)+box(893,588,426,110,'Measured history xₜ','joint sensing after execution',P.amber);
  out+=arrow([[475,428],[475,535],[539,535],[539,588]],t,P.blue)+arrow([[1333,578],[1333,632],[1319,632]],t,P.amber);
 }else if(phase<3){
  out+=text(111,272,'25 samples at 50 Hz · one episode · no reset crossing',24,P.muted);
  out+=windowDiagram(113,318,'Issued-command history cₜ',P.blue,t)+windowDiagram(113,526,'Measured-position history xₜ',P.amber,t);
  out+=arrow([[529,389],[593,389],[593,427],[658,427]],t,P.blue)+arrow([[529,597],[593,597],[593,503],[658,503]],t,P.amber);
  out+=rect(663,348,330,242,P.panel,21,P.purple)+text(828,397,'SHARED ENCODER',26,P.purple,650,'middle')+text(828,446,'Weights stay frozen',26,P.ink,500,'middle')+text(828,490,'Posterior means · 32-D',22,P.muted,400,'middle');
  out+=`<path d="M817 540v-10a11 11 0 0 1 22 0v10" fill="none" stroke="${P.purple}" stroke-width="3"/>`+rect(812,540,32,25,P.purple,5,P.purple);
  out+=arrow([[993,467],[1063,467]],t,P.purple);
  if(phase===1){
   out+=text(1260,369,'ONE COMPARISON',24,P.purple,600,'middle')+box(1097,415,340,89,'Command embedding','same encoder',P.blue)+box(1097,528,340,89,'Execution embedding','same encoder',P.amber);
  }else{
   const a=.40+.18*(1-smooth((t-transitions[1])/2)),cx=1235,cy=458,rr=111;
   out+=circle(cx,cy,rr,'none',P.line);
   out+=arrow([[cx,cy],[cx+rr*Math.cos(-.45),cy+rr*Math.sin(-.45)]],t,P.blue)+arrow([[cx,cy],[cx+rr*Math.cos(a),cy+rr*Math.sin(a)]],t,P.amber);
   out+=text(1358,408,'z_cmd',23,P.blue,600)+text(1358,514,'z_exec',23,P.amber,600);
   out+=text(1261,291,'Normalize the two means',25,P.ink,600,'middle');
   out+=text(1238,628,'δₜ = 1 − z̄_cmd · z̄_exec',31,P.ink,650,'middle')+text(1238,669,'Conceptual 2-D view of 32-D features',19,P.muted,400,'middle');
  }
 }else{
  out+=text(114,281,'Turn execution feedback into the next training condition.',32,P.ink,600);
  const ns=[[112,'Latent gaps','valid windows',P.blue],[468,'Block p90','upper-quantile gap',P.purple],[824,'PI + return','separate backoff',P.amber],[1180,'Next intensity','one shared λ',P.purple]];
  ns.forEach(([x,a,b,c],i)=>{out+=box(x,363,307,136,a,b,c);if(i<3)out+=arrow([[x+308,431],[x+351,431]],t,c)});
  out+=arrow([[1330,500],[1330,618],[265,618],[265,500]],t,P.amber)+rect(605,596,395,44,P.bg,0,P.bg)+text(803,628,'Hold ranges fixed. Train the next block.',23,P.amber,500,'middle');
 }
 return out+tabs(['01  Command → execution','02  Shared encoder','03  Compare features','04  Next block'],phase);
}
export function processController(t,transitions=[6,10]){
 const phase=t<transitions[0]?0:t<transitions[1]?1:2;
 const down=curriculumStep(TEACHING_EXAMPLES.ease),back=curriculumStep(TEACHING_EXAMPLES.backoff);
 let out=base(['PI PACING','INDEPENDENT RETURN BACKOFF','RANGES FOR THE NEXT BLOCK'][phase],'Illustrative arithmetic · manuscript rule, not a training log');
 if(phase===0){
  out+=text(121,292,'Upper-quantile gap',30,P.purple,600);
  for(let i=0;i<25;i++){let h=(25+100*Math.exp(-(((i-13)/6)**2)))*(.5+.5*smooth(t));out+=rect(122+i*13,465-h,9,h,i<21?'#796494':P.purple,2,'none')}
  out+=text(121,510,'yₖ = p90(δ) = 0.232',29,P.ink,650)+text(121,552,'Nominal reference r = 0.145',22,P.muted)+text(121,596,'e = 1 − yₖ/r = −0.600',25,P.red,500);
  out+=arrow([[460,424],[548,424]],t,P.purple)+rect(552,288,474,342,P.panel,20,P.amber);
  out+=text(789,341,'BOUNDED PI CONTROLLER',26,P.amber,650,'middle')+text(590,416,'P  reacts to the current gap',27,P.ink)+text(590,469,'I   remembers accumulated error',25,P.ink)+text(590,546,'Previous I = −0.35 → clamped I = −0.80',20,P.muted)+text(590,590,'kP 0.8 · kI 0.15 · α 0.04',23,P.amber);
  out+=arrow([[1026,424],[1114,424]],t,P.amber)+text(1301,328,'NEXT INTENSITY',23,P.amber,650,'middle')+text(1301,463,down.next.toFixed(3),81,P.ink,650,'middle')+text(1301,527,'0.520 → 0.496',31,P.amber,500,'middle')+text(1301,577,'Ease the next block',24,P.muted,400,'middle');
 }else if(phase===1){
  out+=text(118,291,'After warm-up, count consecutive low-return blocks.',29,P.ink,600);
  [['BLOCK 1','0.61'],['BLOCK 2','0.58']].forEach(([lab,v],i)=>{const x=120+i*323,active=t-transitions[0]>=i*.6;out+=rect(x,340,281,210,P.panel,18,active?P.amber:P.line)+text(x+141,389,lab,23,P.amber,600,'middle')+text(x+141,460,v,62,P.ink,650,'middle')+text(x+141,511,'return / nominal',21,P.muted,400,'middle')});
  out+=text(121,606,'Both below 0.65 × nominal mean return',25,P.amber)+arrow([[770,441],[883,441]],t,P.amber);
  out+=text(1200,348,'BACK OFF',41,P.amber,650,'middle')+text(1200,421,'λ_next = 0.70 λ',43,P.ink,600,'middle')+text(1200,488,'0.496 → 0.347',38,P.purple,600,'middle')+text(1200,548,'Reset I = 0',28,P.ink,500,'middle')+text(1200,599,'Overrides the PI proposal',24,P.muted,400,'middle');
 }else{
  const l=back.next,r=trainingRanges(l),fill=smooth((t-transitions[1])/.8),f=frameAt(t%6);
  out+=text(114,291,'SHARED INTENSITY',25,P.purple,650)+text(283,382,l.toFixed(3),76,P.ink,650,'middle');
  out+=bones('01_walking','reference',f,277,621,176,P.blue,.8);
  out+=text(281,680,'Hold λ fixed in the next block',23,P.ink,500,'middle');
  out+=arrow([[445,464],[492,464],[492,484],[532,484]],t,P.purple);
  const rows=[['Actuation delay',`0–${r.delayMaxMs} ms · 5 ms ticks`],['Surface contact',`friction ${r.staticFriction[0].toFixed(2)}–${r.staticFriction[1].toFixed(2)}`],['Mass + CoM',`mass ±${r.massOffsetKg.toFixed(2)} kg`],['Joint offsets',`±${r.jointOffsetRad.toFixed(4)} rad`],['External pushes',`x/y ±${r.pushXYMps.toFixed(3)} m/s`],['Observation noise',`joint σ ${r.jointNoiseSigmaRad.toFixed(4)} rad`]];
  rows.forEach(([lab,value],i)=>{const x=536+(i%2)*482,y=264+Math.floor(i/2)*150,bx=x+61,by=y+112;
   out+=rect(x,y,456,135,P.panel,13,P.line)+bones('01_walking','reference',f,bx,by,65,P.blue,.65);
   if(i===0)for(let j=0;j<4;j++)out+=rect(x+20+j*24,y+17,17,11,j===Math.floor(t*4)%4?P.amber:P.line,2,'none');
   if(i===1)out+=`<path d="M${x+16} ${by+4}h90" stroke="${P.amber}" stroke-width="3" stroke-dasharray="4 5"/>`;
   if(i===2)out+=circle(bx,by-29,6,P.amber)+circle(bx+15,by-37,3,P.purple);
   if(i===3)out+=circle(bx+7,by-16,5,'none',P.amber);
   if(i===4)out+=arrow([[x+8,y+66],[x+45,y+66]],t,P.amber);
   if(i===5)for(let j=0;j<6;j++)out+=circle(bx+37*Math.cos(j*2+t),by-35+31*Math.sin(j*2+t),2.3,P.amber);
   out+=text(x+126,y+37,lab,24,P.ink,600)+text(x+126,y+73,value,21,P.amber);
   out+=rect(x+127,y+98,289,8,P.line,4,'none')+rect(x+127,y+98,289*l*fill,8,P.purple,4,'none');
  });
  out+=text(1490,728,'G1 poses from recording · channel effects are schematic',18,P.muted,400,'end');
 }
 if(phase<2)out+=text(119,697,phase===0?'λ_next = clip(λ + α · clip(kP e + kI I, −1, 1), 0, 1)':'Two low-return blocks trigger backoff; one isolated low-return block does not.',25,P.muted);
 return out+tabs(['01  React + remember','02  Return protection','03  Set ranges','04  Hold during training'],phase===2?3:phase);
}

export function processClosing(t){
 let out=rect(70,174,1460,456,P.bg,20,P.bg);
 out+=rect(70,184,1460,412,P.bg,0,P.bg);
 out+=text(800,619,'Choreographed G1 letter formation · closing visualization',21,P.muted,400,'middle');
 out+=rect(70,650,424,153,'#E9DFF3',18,'#E9DFF3')+text(98,713,'+25 pp',58,'#8862a2',700)+text(99,751,'Physical G1 · +40 ms delay',24,'#263543',500)+text(99,785,'38/60 vs 23/60 · paper result',21,'#65717b');
 out+=rect(520,650,1010,153,'#eef3f6',18,'#eef3f6')+text(550,704,'Policy → low-level controller → G1',36,'#263543',650)+text(551,751,'No encoder or curriculum scheduler onboard',27,'#8862a2',600)+text(552,787,'Simulation: +21.7 pp under unseen +60 ms added delay',24,'#65717b');
 return out;
}
