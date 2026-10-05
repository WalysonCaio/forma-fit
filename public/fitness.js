// Funções compartilhadas: tempo ativo, distância GPS e comparação com metas TAF.
export function activeSeconds(d,now=Date.now()) {
 return Math.max(0,Math.floor(((d.paused_at||now)-Date.parse(d.started_at)-(d.paused_ms||0))/1000));
}
export function togglePause(d,now=Date.now()) {
 if(d.paused_at){const gap=now-d.paused_at;d.paused_ms=(d.paused_ms||0)+gap;if(d.rest_until)d.rest_until+=gap;d.paused_at=null;}
 else d.paused_at=now;
 return d;
}
export function metersBetween(a,b){const rad=x=>x*Math.PI/180,R=6371000;const x=Math.sin(rad(b.lat-a.lat)/2)**2+Math.cos(rad(a.lat))*Math.cos(rad(b.lat))*Math.sin(rad(b.lon-a.lon)/2)**2;return 2*R*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));}
export function acceptPosition(d,p){
 if(d.paused_at||!Number.isFinite(p.lat)||!Number.isFinite(p.lon)||Math.abs(p.lat)>90||Math.abs(p.lon)>180||!Number.isFinite(p.accuracy)||p.accuracy>35||p.accuracy<0)return false;
 const prev=d.points.at(-1);if(prev&&p.time<=prev.time)return false;
 let delta=0;if(prev&&prev.segment===d.segment){const gap=(p.time-prev.time)/1000;delta=metersBetween(prev,p);if(gap>30){d.segment++;p.segment=d.segment;delta=0;}else if(delta/gap>9)return false;else if(delta<3)return false;}
 d.distance_m=(d.distance_m||0)+delta;d.points.push(p);if(d.points.length>600)d.points=d.points.filter((_,i)=>i%2===0||i===d.points.length-1);return true;
}
export function metTarget(test){if(test.type){const r=test.result;if(!r)return null;if(test.type==='bar')return r.reps>=test.min_reps;if(test.type==='abs')return r.reps>=test.min_reps&&r.time_s<=test.time_limit_s;if(test.type==='jump')return r.distance_m>=test.distance_m;return r.distance_m>=test.distance_m&&r.time_s<=test.time_limit_s;}if(test.current===null||test.current===undefined||test.current==='')return null;return test.comparison==='max'?Number(test.current)<=Number(test.target):Number(test.current)>=Number(test.target);}
