import {newActivity,artifact,budgetTotal,loads,finalActs,help} from './engine.js?v=1.5.0';
import {missionResult,feedbackFor,flowState} from './operations.js?v=1.5.0';
import {capacityFor,budgetLimit,demandFor,challenges} from './challenge-config.js?v=1.5.0';
export {challenges};
export function resumeTarget(p){
 if(!p.intro)return {href:'story-1',label:'Open our first comic'};
 const id=p.activeIssue;
 if(id&&p.games[id])return {href:`issue-${id}-2`,label:`Continue issue ${id}`};
 const bookmark=/^issue-(\d+)-2$/.exec(p.bookmark||'');
 if(bookmark&&p.games[bookmark[1]]?.checked===false)return {href:p.bookmark,label:`Continue issue ${bookmark[1]}`};
 return p.finale?{href:'celebrate',label:'Visit our hub'}:{href:p.bookmark==='home'?'city':p.bookmark||'city',label:'Continue our adventure'};
}
export function beginAttempt(p,id,challenge='',repair=false){
 const old=p.games[id]||newActivity(id);
 if(repair&&![8,12,13].includes(id)){
  old.checked=false;old.feedback='';old.feedbackAt='';
 }else if(repair&&id===8){old.flowChoices=[];old.checked=false;old.feedback='';old.feedbackAt='';}
 else if(repair&&id===12){old.rounds=[];old.trips=null;old.checked=false;old.feedback='';old.feedbackAt='';}
 else {p.games[id]=newActivity(id);p.games[id].challenge=challenges[id]?.id===challenge?challenge:'';if(repair)p.games[id].reviewNeedsRepair=old.reviewNeedsRepair===true;if(id===8&&challenge&&old.board.every(n=>n===2)){for(const key of ['board','boardClock','started','finished'])p.games[id][key]=structuredClone(old[key]);}}
 p.activeIssue=id;return p.games[id];
}
export function launchChoice(g,n){
 const a=finalActs[g.act];if(!a||![0,1].includes(n))return {ok:false,text:'Choose a plan for this scene.'};
 if(n!==a.right){g.pendingRepair=g.act;return {ok:false,text:repairPrompts[g.act]};}
 const repaired=g.pendingRepair===g.act;
 if(repaired){g.repairs??=[];if(!g.repairs.includes(g.act))g.repairs.push(g.act);}
 g.answers[g.act]=n;g.act++;g.pendingRepair=null;
 return {ok:true,text:(repaired?'You repaired the plan. ':'')+a.why};
}
export const launchRepairText=g=>Number.isInteger(g.pendingRepair)?repairPrompts[g.pendingRepair]||'':'';
const repairPrompts=[
 'The high controls would be out of reach. Choose a plan that our neighbors can use.',
 'Deliveries cannot start before the rover is built. Choose a workable job order.',
 'Jayden has no time for this job. Spending three tokens on stars leaves only one for a three-token panel. Choose a helper and spending plan that fit.',
 'More crooked cards would need printing again. Choose a plan that fixes the fault and protects the work from rain.',
 'The next team needs the care notes. Choose a plan that completes the handover.'
];
export function playResult(id,g){
 const result=missionResult(id,g);
 if(id===13&&g.repairs?.length){result.delay=g.repairs.length;result.story=`You repaired ${g.repairs.length} ${g.repairs.length===1?'launch decision':'launch decisions'} before the rover set off. The repairs took extra planning. The rover now meets its promise and the library team has its care notes.`;result.checks=result.checks.map((r,i)=>({...r,text:g.repairs.includes(i)?'You repaired this decision. '+finalActs[i].why:r.text}));}
 if(g.assisted&&result.ready)result.story+=' Mika helped us try a working plan.';
 return {...result,needsRepair:result.ready&&result.checks.some(r=>!r.ok)};
}
export function metricsFor(id,g,result=playResult(id,g)){
 const metric=(label,value,unit='')=>({label,value,unit:value===1?({hours:'hour',tokens:'token',cards:'card',trips:'trip'}[unit]||unit):unit});
 if(id<=5)return [metric('Planning choices that fit',result.checks.filter(r=>r.ok).length,'of '+result.checks.length)];
 if(id===6){const cap=capacityFor(g);return [metric('Hours over capacity',Object.entries(loads(g)).reduce((n,[name,v])=>n+Math.max(0,v-cap[name]),0),'hours')];}
 if(id===7)return [metric('Reserve before the test',Math.max(0,budgetLimit(g)-budgetTotal(g)),'tokens')];
 if(id===8){const f=flowState(g.flowChoices,demandFor(g));return [metric('Boxes sent',f.served,'of 6'),metric('Boxes ready for next time',f.stock,'target: 2'),metric('Rounds with the target buffer',f.log.filter(r=>r.stock===2).length,'of 4')];}
 if(id===9)return [metric('Risks with a useful response',result.checks.filter(r=>r.ok).length,'of 3')];
 if(id===10)return [metric('Cards needing a new print',g.qualityMode===1?6:0,'cards')];
 if(id===11)return [metric('Agreed extra build time',g.change===0?2:0,'hours')];
 if(id===12)return g.rounds.map((n,i)=>metric('Trips in test '+(i+1),n,'trips'));
 return [metric('Launch decisions repaired',g.repairs?.length||0,'of 5')];
}
export function recordAttempt(p,id,g,result){
 p.runs??={};
 const run={plan:artifact(id,g),story:result.story,challenge:g.challenge||'',metrics:metricsFor(id,g,result)};
 const previous=p.runs[id]?.at(-1);
 // Seed a genuine older result from its saved checks when it can be compared honestly.
 if(!previous&&p.reports[id]&&p.plans[id]&&id<=5&&Array.isArray(p.reports[id].checks))p.runs[id]=[{plan:p.plans[id],story:p.reports[id].story,challenge:'',metrics:[{label:'Planning choices that fit',value:p.reports[id].checks.filter(r=>r.ok).length,unit:'of '+p.reports[id].checks.length}]}];
 const last=p.runs[id]?.at(-1);
 if(last?.plan===run.plan&&last.challenge===run.challenge&&JSON.stringify(last.metrics)===JSON.stringify(run.metrics))return;
 p.runs[id]=[...(p.runs[id]||[]),run].slice(-2);
}
const firstHints=[null,
 'Ask: does this job make something new with a finish, or do we repeat it to keep things working?',
 'Read the neighbors’ notes. Put their needs on the list, and leave off ideas no one asked for.',
 'Check the three parts we promised. A new idea can wait on the Later list.',
 'Look for the name of the part in each job. Put the job on that part’s work list.',
 'Find the job that makes the plan. What must be ready before we can test or open the path?',
 'Check a helper’s hour total before giving them another job. Another helper may have room.',
 'Pay for all three needs first. Keep at least one token for the possible replacement.',
 'Finish a job in Doing to free a space. At the library, replace the boxes taken from the two-box buffer.',
 'Choose a response that helps if the risk happens. Hoping alone does not protect the work.',
 'Fix what prevents a neighbor from using the part. Then test the fix. Stop a printer fault before it spreads.',
 'Either landing-pad plan can work. Read its effect, then agree the plan with the neighbors.',
 'Look at the trips Bolt makes to fetch cards. Can the way the work is laid out remove a trip?',
 'Use the promise, job order, capacity, budget, quality checks, and handover from our earlier issues.'
];
export function hintFor(id,g){
 if((g.hintLevel||0)<2)return firstHints[id];
 if(id===13)return finalActs[g.act]?.why||'Review the launch decisions, then share the outcome.';
 if(id===8){if(g.board.some(n=>n!==2))return g.board.some(n=>n===1)?'Choose Finish this job on a card in Doing. That makes a space.':'Start Draw the Clear path map or Build the Message desk. The other cards depend on those jobs.';const f=flowState(g.flowChoices,demandFor(g));return f.round<4?'The replacement card shows how many boxes refill the buffer to two.':'Review the stock and deliveries. Try another round of requests if boxes were missing or extra.';}
 const next=feedbackFor(id,g).find(r=>!r.ok);return next?next.label+': '+next.text:'This plan meets the checks. Try it to see the result.';
}
export function showWorkingPlan(id,g){if(id===13&&g.pendingRepair!==null){g.repairs??=[];if(!g.repairs.includes(g.pendingRepair))g.repairs.push(g.pendingRepair);}help(id,g);g.pendingRepair=null;g.repairs??=[];g.assisted=true;g.checked=false;g.feedbackAt='';g.feedback='Mika has shown a working plan. You can change it, then try it yourself.';}
