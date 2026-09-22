import {bones,frameAt} from './motion-viz.mjs?v=13';
import {curriculumStep,trainingRanges,TEACHING_EXAMPLES} from './curriculum.mjs?v=13';

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
export function processController(t,transitions=[4.5,7]){
 const f=frameAt(t%6),phase=t<transitions[0]?0:t<transitions[1]?1:2;
 let out=base('TRAINING FEEDBACK → NEXT BLOCK','Recorded G1 poses · explanatory feedback diagram');
 out+=box(108,247,487,65,'Latent gap → bounded PI','upper-quantile discrepancy',P.purple);
 out+=box(108,327,487,65,'Return → backoff','independent safeguard',phase===1?P.amber:P.muted);
 out+=box(811,266,300,116,'Shared intensity λ','bounded between 0 and 1',P.purple);
 out+=box(1150,266,340,116,'Next training block','hold the ranges fixed',P.blue);
 out+=arrow([[595,279],[673,279],[673,305],[811,305]],t,P.purple)+arrow([[595,359],[713,359],[713,348],[811,348]],t,phase===1?P.amber:P.muted)+arrow([[1111,325],[1150,325]],t,P.purple);
 const labels=['Actuation delay','Surface contact','Mass + CoM','Joint offsets','External pushes','Observation noise'];
 labels.forEach((label,i)=>{const x=109+(i%3)*466,y=427+Math.floor(i/3)*155,bx=x+55,by=y+123,active=phase===2;
 out+=rect(x,y,439,141,P.panel,16,active?P.purple:P.line)+bones('01_walking','reference',f,bx,by,78,P.blue,.85);
 if(i===0)for(let j=0;j<4;j++)out+=rect(x+17+j*21,y+17,15,9,j===Math.floor(t*4)%4?P.amber:P.line,2,'none');
 if(i===1)out+=`<path d="M${x+16} ${by+3}h84" stroke="${P.amber}" stroke-width="3" stroke-dasharray="4 5"/>`;
 if(i===2)out+=circle(bx,by-32,6,P.amber)+circle(bx+17,by-40,3,P.purple);
 if(i===3)out+=circle(bx+7,by-20,6,'none',P.amber);
 if(i===4)out+=arrow([[x+7,y+57],[x+43,y+57]],t,P.amber);
 if(i===5)for(let j=0;j<6;j++)out+=circle(bx+38*Math.cos(j*2+t),by-38+32*Math.sin(j*2+t),2.3,P.amber);
 out+=text(x+119,y+56,label,28,P.ink,600)+rect(x+120,y+87,280,9,P.line,4,'none')+rect(x+120,y+87,280*(active?.50:.27),9,active?P.purple:P.muted,4,'none');
 });
 out+=text(800,778,phase===0?'Use execution feedback to pace randomization.':phase===1?'Low returns reduce exposure before the next block.':'One scalar scales six channels; then policy training continues.',25,phase===1?P.amber:P.purple,500,'middle');
 return out;
}

export function processClosing(t){
 let out=rect(70,174,1460,344,P.bg,20,P.bg)+text(800,509,'Choreographed G1 letter formation',20,P.muted,400,'middle');
 out+=rect(70,542,1460,261,'#eef3f6',18,'#eef3f6')+text(104,583,'ONBOARD DEPLOYMENT',23,'#367db5',650);
 const nodes=[[105,303,'Policy'],[485,481,'Low-level controller'],[1140,335,'Physical G1']];
 nodes.forEach(([x,w,label],i)=>{out+=rect(x,616,w,93,i===1?'#D9ECFA':'#E9DFF3',14,'none')+text(x+w/2,674,label,33,'#263543',650,'middle');if(i<2)out+=arrow([[x+w+9,662],[nodes[i+1][0]-12,662]],t,'#8862a2')});
 out+=text(800,759,'Encoder + curriculum scheduler stay in training',30,'#8862a2',600,'middle');
 return out;
}
