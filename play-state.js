// Save migration is independent of the activity engine so old players keep their progress.
import {challenges} from './challenge-config.js?v=1.5.0';
const validId=n=>Number.isInteger(n)&&n>=1&&n<=13;
const text=(s,max)=>typeof s==='string'?s.slice(0,max):'';
export function cleanPlayState(raw,p){
 p.activeIssue=validId(raw?.activeIssue)?raw.activeIssue:null;
 p.runs={};
 for(const [key,runs] of Object.entries(raw?.runs||{})){
  if(!validId(Number(key))||!Array.isArray(runs))continue;
  p.runs[key]=runs.slice(-2).filter(r=>r&&typeof r.plan==='string'&&Array.isArray(r.metrics)).map(r=>({plan:text(r.plan,2500),story:text(r.story,2000),challenge:challenges[key]?.id===r.challenge?r.challenge:'',metrics:r.metrics.slice(0,8).filter(m=>m&&typeof m.label==='string'&&Number.isFinite(m.value)&&m.value>=0&&m.value<=100).map(m=>({label:text(m.label,100),value:m.value,unit:text(m.unit,30)}))}));
 }
 for(const [key,g] of Object.entries(p.games)){
  const old=raw.games?.[key]||{};
  g.challenge=challenges[key]?.id===old.challenge?old.challenge:'';
  g.hintLevel=[0,1,2].includes(old.hintLevel)?old.hintLevel:0;
  g.feedbackAt=''; // Feedback text is ephemeral; keep no orphaned location after reload.
  g.reviewNeedsRepair=old.reviewNeedsRepair===true;
  g.pendingRepair=Number(key)===13&&Number.isInteger(old.pendingRepair)&&old.pendingRepair===g.act&&g.act<5?old.pendingRepair:null;
  g.repairs=Number(key)===13&&Array.isArray(old.repairs)?[...new Set(old.repairs.filter(n=>Number.isInteger(n)&&n>=0&&n<g.act))]:[];
  g.assisted=old.assisted===true;
 }
 if(p.activeIssue&&!p.games[p.activeIssue])p.activeIssue=null;
 return p;
}
