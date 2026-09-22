// Manuscript Eqs. 9–11 and Table I. Inputs to this teaching tool are illustrative.
export const LIMITS=Object.freeze({reference:.145,kp:.8,ki:.15,alpha:.04,integral:.8,backoff:.7});
const clip=(x,a,b)=>Math.max(a,Math.min(b,x));
export function curriculumStep({intensity,gap,integral=0,backoff=false,validWindows=true}){
 if(![intensity,gap,integral].every(Number.isFinite))throw Error('Controller inputs must be finite.');
 if(intensity<0||intensity>1||gap<0||gap>2||Math.abs(integral)>.8)throw Error('Controller input outside manuscript bounds.');
 if(backoff)return {next:LIMITS.backoff*intensity,integral:0,error:null,update:null,reason:'return backoff'};
 if(!validWindows)return {next:intensity,integral,error:null,update:null,reason:'hold: no valid windows'};
 const error=1-gap/LIMITS.reference,I=clip(integral+error,-LIMITS.integral,LIMITS.integral),update=clip(LIMITS.kp*error+LIMITS.ki*I,-1,1);
 return {next:clip(intensity+LIMITS.alpha*update,0,1),integral:I,error,update,reason:'PI pacing'};
}
export function trainingRanges(intensity){
 const l=clip(intensity,0,1);
 return {delayMaxMs:Math.floor(8*l+1e-12)*5,staticFriction:[1-.6*l,1+.6*l],massOffsetKg:2.5*l,jointOffsetRad:.01*l,pushXYMps:.5*l,jointNoiseSigmaRad:.01*l};
}
export const TEACHING_EXAMPLES=Object.freeze({
 ease:{intensity:.52,gap:.232,integral:-.35},
 backoff:{intensity:.496,gap:.232,integral:-.8,backoff:true},
 increase:{intensity:.3472,gap:.06,integral:0}
});
