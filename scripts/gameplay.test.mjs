import test from 'node:test';
import assert from 'node:assert/strict';
import {freshProgress,newActivity,help,cleanProgress,artifact,finalActs,evaluate} from '../engine.js';
import {resumeTarget,beginAttempt,launchChoice,launchRepairText,playResult,recordAttempt,hintFor,showWorkingPlan,challenges} from '../gameplay.js';
import {budgetLimit,capacityFor,demandFor} from '../challenge-config.js';
import {flowState,missionResult} from '../operations.js';
import {gadgetArt,hubView} from '../visuals.js';

test('a blocked launch decision stays on its scene until the player chooses a repair',()=>{
 const g=newActivity(13);
 for(let i=0;i<5;i++){
  const first=launchChoice(g,1-finalActs[i].right);assert.equal(first.ok,false);assert.equal(g.act,i);assert.equal(g.pendingRepair,i);assert.equal(g.answers.length,i);
  assert.equal(launchChoice(g,1-finalActs[i].right).ok,false);assert.equal(g.act,i);
  assert.equal(launchChoice(g,finalActs[i].right).ok,true);assert.equal(g.act,i+1);assert.equal(g.pendingRepair,null);
 }
 assert.deepEqual(g.repairs,[0,1,2,3,4]);const result=playResult(13,g);assert.equal(result.ready,true);assert.equal(result.needsRepair,false);assert.equal(result.delay,5);assert.match(result.story,/You repaired 5 launch decisions/);
 assert.ok(result.checks.every(r=>r.ok&&r.text.startsWith('You repaired')));
});

test('pending launch repairs and past repairs survive reload without advancing the scene',()=>{
 const p=freshProgress();p.games[13]=newActivity(13);p.activeIssue=13;const g=p.games[13];launchChoice(g,1);launchChoice(g,0);launchChoice(g,0);
 const restored=cleanProgress(p);assert.equal(restored.games[13].act,1);assert.equal(restored.games[13].pendingRepair,1);assert.deepEqual(restored.games[13].repairs,[0]);assert.match(launchRepairText(restored.games[13]),/before the rover is built/);assert.equal(resumeTarget({...restored,intro:true}).href,'issue-13-2');
});

test('bad tested plans request a player repair rather than claiming the crew already changed the plan',()=>{
 for(const id of [1,2,3,4,5,6,7,8,9,10,12]){
  const g=help(id,newActivity(id));
  if(id===1)g.picks[0]=1;if(id===2)g.picks[0]=0;if(id===3)g.picks[3]=0;if(id===4)g.picks[0]=2;if(id===5)g.order=[3,2,1,0];if(id===6)g.owners=['jayden','mika','jayden','jayden'];if(id===7)g.budget=[1,0,1,1];if(id===8)g.flowChoices=[0,0,0,0];if(id===9)g.picks[0]=1;if(id===10)g.qualityMode=1;if(id===12){g.layout=0;g.rounds=[8,8];g.trips=8;}
  const result=playResult(id,g);assert.equal(result.ready,true,id);assert.equal(result.needsRepair,true,id);
  assert.doesNotMatch(result.story,/crew changes the plan|They restore|team puts each card|They revise/);
 }
 for(const change of [0,2]){const g=help(11,newActivity(11));g.change=change;assert.equal(playResult(11,g).needsRepair,false);}
});

test('hints do not change answers or save a plan, and a working example remains unsubmitted',()=>{
 for(let id=1;id<=13;id++){
  const g=newActivity(id),before=JSON.stringify(g);assert.ok(hintFor(id,g).length>20);assert.equal(JSON.stringify(g),before);
  g.hintLevel=2;assert.ok(hintFor(id,g).length>15);const p=freshProgress();p.games[id]=g;
  showWorkingPlan(id,g);assert.equal(playResult(id,g).ready,true,id);assert.equal(playResult(id,g).needsRepair,false,id);assert.equal(g.checked,false);assert.deepEqual(p.done,[]);assert.deepEqual(p.plans,{});assert.equal(g.assisted,true);
 }
});

test('each replay challenge changes its actual constraint and has a working plan',()=>{
 for(const id of [6,7,8]){
  const p=freshProgress(),g=beginAttempt(p,id,challenges[id].id);help(id,g);assert.equal(evaluate(id,g).ok,true,id);assert.equal(playResult(id,g).needsRepair,false,id);
  const restored=cleanProgress(p).games[id];assert.equal(restored.challenge,g.challenge);assert.equal(missionResult(id,restored).ready,true);
 }
 assert.deepEqual(capacityFor({challenge:'team-hours'}),{jayden:2,mika:2,bolt:2});
 const team=help(6,newActivity(6));team.challenge='team-hours';team.owners=['jayden','mika','jayden','bolt'];assert.equal(evaluate(6,team).ok,false);
 const budget=help(7,newActivity(7));budget.challenge='budget-nine';assert.equal(budgetLimit(budget),9);assert.equal(playResult(7,budget).needsRepair,true);help(7,budget);assert.match(artifact(7,budget),/of 9 tokens/);
 const request={challenge:'library-order'};assert.deepEqual(demandFor(request),[2,1,2,1]);assert.equal(flowState([1,2,1,2],demandFor(request)).lowRounds,2);assert.equal(flowState(demandFor(request),demandFor(request)).waiting,0);
});

test('repaired results compare real attempts and pending edits do not rewrite saved comparisons',()=>{
 const p=freshProgress(),g=help(8,newActivity(8));p.games[8]=g;g.flowChoices=[0,0,0,0];recordAttempt(p,8,g,playResult(8,g));
 g.flowChoices=[1,2,1,2];recordAttempt(p,8,g,playResult(8,g));assert.deepEqual(p.runs[8].map(r=>r.metrics[0].value),[2,6]);assert.deepEqual(p.runs[8].map(r=>r.metrics[2].value),[0,4]);
 const snapshot=JSON.stringify(p.runs);g.flowChoices=[];assert.equal(JSON.stringify(p.runs),snapshot);
 const restored=cleanProgress(p);assert.deepEqual(restored.runs,p.runs);recordAttempt(restored,8,help(8,newActivity(8)),playResult(8,help(8,newActivity(8))));assert.equal(restored.runs[8].length,2);
});

test('Home resumes an unfinished replay after completion and leaves the ending intact',()=>{
 const p=freshProgress();p.intro=true;p.done=Array.from({length:13},(_,i)=>i+1);p.finale=true;p.firstVisit=2;
 assert.equal(resumeTarget(p).href,'celebrate');beginAttempt(p,8);assert.equal(resumeTarget(p).href,'issue-8-2');assert.equal(p.finale,true);assert.equal(p.firstVisit,2);
 assert.equal(resumeTarget(cleanProgress(p)).href,'issue-8-2');p.activeIssue=null;p.bookmark='issue-12-2';p.games[12]=newActivity(12);assert.equal(resumeTarget(p).href,'issue-12-2');
});

test('repairing a plan keeps its working answers, while replay simulations start clean',()=>{
 for(const id of [1,6,7,10,11]){const p=freshProgress(),g=help(id,newActivity(id));p.games[id]=g;g.reviewNeedsRepair=true;const plan=artifact(id,g);beginAttempt(p,id,'',true);assert.equal(artifact(id,p.games[id]),plan);assert.equal(p.games[id].reviewNeedsRepair,true);}
 const p=freshProgress();p.games[8]=help(8,newActivity(8));p.games[8].challenge='library-order';beginAttempt(p,8,'library-order',true);assert.deepEqual(p.games[8].flowChoices,[]);assert.equal(p.games[8].challenge,'library-order');assert.deepEqual(p.games[8].board,[2,2,2,2]);
});

test('hub art responds to the chosen sign, map, workbench, and saved landing-pad decision',()=>{
 const p=freshProgress();p.done=[1,3,4,7,10,11];p.storyChoices={1:0,3:0,4:0,7:0};p.changePlan=0;
 const first=hubView(p);assert.match(first,/welcome sign has stars/);assert.match(first,/map is in the shade/);assert.match(first,/landing pad is built/);
 p.storyChoices[7]=1;p.storyChoices[3]=1;p.storyChoices[4]=1;const changed=hubView(p);assert.notEqual(first,changed);assert.match(changed,/welcome sign shows the team/);assert.match(changed,/map is on the wall/);
 p.games[11]=newActivity(11);p.games[11].change=2;assert.match(hubView(p),/landing pad is built/);p.changePlan=2;assert.doesNotMatch(hubView(p),/landing pad is built/);
 for(const kind of ['tools','scanner','drone','seat','radio','coins','board','rover']){const art=gadgetArt(kind);assert.match(art,/aria-hidden="true"/);assert.doesNotMatch(art,/undefined|NaN|<image|https:/);}
});


test('an older completed finale can be replayed without an unrepairable final scene or losing its ending',()=>{
 const p=freshProgress();p.done=Array.from({length:13},(_,i)=>i+1);p.finale=true;p.firstVisit=1;p.games[13]=help(13,newActivity(13));p.games[13].answers=[1,0,1,1,0];p.games[13].reviewNeedsRepair=true;
 const g=beginAttempt(p,13,'',true);assert.equal(g.act,0);assert.deepEqual(g.answers,[]);assert.equal(p.finale,true);assert.equal(p.firstVisit,1);
 for(const a of finalActs)launchChoice(g,a.right);assert.equal(playResult(13,g).needsRepair,false);
});
