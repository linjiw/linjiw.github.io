// The physical source clock always equals the presentation clock.
export const MAIN={x:0,y:92,scale:.75};
export const INSET={x:1220,y:185,w:360,h:202.5};
export const LARGE={x:60,y:238,w:960,h:540};
export const railScene=id=>id!=='hardware';
export function hardwareRect(t,project){const s=project.scenes.find(s=>s.id==='hardware');return {...(t>=s.start&&t<s.end?LARGE:INSET)}}
export function mapMainRect(q){return {...q,x:MAIN.x+q.x*MAIN.scale,y:MAIN.y+q.y*MAIN.scale,w:q.w*MAIN.scale,h:q.h*MAIN.scale}}
export function hardwareExpression(key,project){const s=project.scenes.find(s=>s.id==='hardware');return `if(gte(t,${s.start})*lt(t,${s.end}),${LARGE[key]},${INSET[key]})`}
