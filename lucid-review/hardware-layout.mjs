// Shared geometry and source clock for the continuous physical recording.
export const MAIN={x:0,y:92,scale:.75};
export const HERO={x:570,y:228,w:960,h:540};
export const INSET={x:1220,y:185,w:360,h:202.5};
export const LARGE={x:60,y:238,w:960,h:540};
export const railScene=id=>!['intro','hardware'].includes(id);
export function hardwareRect(t){
 if(t<9)return {...HERO};
 if(t<10){const u=t-9,e=u*u*(3-2*u);return Object.fromEntries(Object.keys(HERO).map(k=>[k,HERO[k]+(INSET[k]-HERO[k])*e]));}
 return {...(t>=144&&t<168?LARGE:INSET)};
}
export function mapMainRect(q){return {...q,x:MAIN.x+q.x*MAIN.scale,y:MAIN.y+q.y*MAIN.scale,w:q.w*MAIN.scale,h:q.h*MAIN.scale};}
export function hardwareExpression(key){
 const u='(t-9)',e=`(${u}*${u}*(3-2*${u}))`;
 return `if(lt(t,9),${HERO[key]},if(lt(t,10),${HERO[key]}+(${INSET[key]-HERO[key]})*${e},if(gte(t,144)*lt(t,168),${LARGE[key]},${INSET[key]})))`;
}
