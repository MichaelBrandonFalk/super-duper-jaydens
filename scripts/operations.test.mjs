import test from 'node:test';import assert from 'node:assert/strict';import {freshProgress,newActivity,help,cleanProgress,boardMove,finalChoice,finalActs} from '../engine.js';import {flowState,feedbackFor,missionResult,cityOutcome} from '../operations.js';
test('every sorting card receives its own explanation after a test',()=>{const g=newActivity(1);g.picks={0:1,1:0,2:1,3:0};const rows=feedbackFor(1,g);assert.equal(rows.length,4);assert.ok(rows.every(r=>!r.ok&&r.label&&r.text));g.picks[1]=1;assert.equal(feedbackFor(1,g).filter(r=>r.ok).length,1);});
test('operational choices can finish with real delays and a revised plan can improve them',()=>{for(const id of [6,7,9,11,12]){const good=help(id,newActivity(id));assert.equal(missionResult(id,good).ready,true,id);assert.equal(missionResult(id,good).delay,0,id);const rough=help(id,newActivity(id));if(id===6)rough.owners=['jayden','mika','jayden','jayden'];if(id===7)rough.budget=[1,0,1,1];if(id===9)rough.picks={0:1,1:0,2:1};if(id===11)rough.change=0;if(id===12){rough.layout=0;rough.rounds=[8,8];}assert.equal(missionResult(id,rough).ready,true,id);assert.ok(missionResult(id,rough).delay>0,id);}});
test('pull cards preserve a deliberate stock buffer; overproduction and shortages change outcomes',()=>{const pull=flowState([1,2,1,2]);assert.equal(pull.stock,2);assert.equal(pull.served,6);assert.equal(pull.extra,0);assert.equal(pull.waiting,0);const push=flowState([3,3,3,3]);assert.equal(push.served,6);assert.ok(push.extra>0);assert.ok(push.delay>0);const empty=flowState([0,0,0,0]);assert.equal(empty.served,2);assert.equal(empty.waiting,4);});
test('jidoka stops faults at source; running on costs rework shifts',()=>{const g=help(10,newActivity(10));assert.equal(missionResult(10,g).delay,0);g.qualityKey=false;assert.equal(missionResult(10,g).ready,false);g.qualityMode=1;assert.equal(missionResult(10,g).ready,true);assert.equal(missionResult(10,g).delay,2);});
test('dispatch and repeated PDCA trials are required before new field reports',()=>{const g=help(8,newActivity(8));g.flowChoices=[];assert.equal(missionResult(8,g).ready,false);const k=help(12,newActivity(12));k.rounds=[4];assert.equal(missionResult(12,k).ready,false);});
test('board time records real start and finish transitions without charging blocked moves',()=>{const g=newActivity(8);boardMove(g,2);assert.equal(g.boardClock,0);boardMove(g,0);boardMove(g,0);assert.equal(g.started[0],1);assert.equal(g.finished[0],2);});
test('reports survive profile reload and current results determine the route without accumulating replay penalties',()=>{const p=freshProgress();p.reports[6]={delay:2,story:'Two shifts spent waiting.'};p.games[8]=help(8,newActivity(8));const cleaned=cleanProgress(JSON.parse(JSON.stringify(p)));assert.deepEqual(cleaned.games[8].flowChoices,[1,2,1,2]);assert.equal(cityOutcome(cleaned).stops,10);cleaned.reports[6]={delay:0,story:'Crew load fits.'};assert.equal(cityOutcome(cleaned).stops,12);const rough=newActivity(13);for(const a of finalActs)finalChoice(rough,1-a.right);assert.equal(missionResult(13,rough).delay,5);});
test('complete early planning choices can produce different reports instead of forcing corrections',()=>{for(let id=1;id<=5;id++){const g=help(id,newActivity(id));assert.equal(missionResult(id,g).ready,true);assert.equal(missionResult(id,g).delay,0);if(id===1)g.picks[0]=1;if(id===2)g.picks[0]=0;if(id===3)g.picks[3]=0;if(id===4)g.picks[0]=2;if(id===5)g.order=[3,2,1,0];const result=missionResult(id,g);assert.equal(result.ready,true,id);assert.ok(result.delay>0,id);assert.ok(result.story.length>40,id);}});

test('saved plan records distinguish the player’s actual risk, replenishment, and printer choices',async()=>{
 const {artifact,riskCards}=await import('../engine.js');
 const risk=help(9,newActivity(9));risk.picks={0:1,1:0,2:1};const text=artifact(9,risk);
 for(let i=0;i<3;i++)assert.ok(text.includes(riskCards[i].options[risk.picks[i]]));
 const flow=help(8,newActivity(8));flow.flowChoices=[0,2,1,2];assert.match(artifact(8,flow),/0, 2, 1, 2/);
 const printer=help(10,newActivity(10));assert.match(artifact(10,printer),/stopped, fixed/);printer.qualityMode=1;assert.match(artifact(10,printer),/kept printing/);assert.doesNotMatch(artifact(10,printer),/stopped, fixed/);
});
test('all five finale choices retain their own outcome and repair explanation',async()=>{
 const {artifact,finalRepairs}=await import('../engine.js');
 for(const correct of [true,false]){const g=newActivity(13);for(const a of finalActs)finalChoice(g,correct?a.right:1-a.right);const rows=feedbackFor(13,g);assert.equal(rows.length,5);rows.forEach((r,i)=>{assert.equal(r.ok,correct);assert.equal(r.text,correct?finalActs[i].why:finalRepairs[i]);assert.ok(artifact(13,g).includes(finalActs[i].options[g.answers[i]]));});}
 assert.match(finalRepairs[2],/three more tokens/);
});

test('saved review stays attached to its tested plan while a replacement is unfinished',async()=>{
 const {savedFeedback}=await import('../operations.js');const {artifact}=await import('../engine.js');
 const p=freshProgress(),g=help(11,newActivity(11));g.change=0;g.checked=true;p.done=[11];p.games[11]=g;p.plans[11]=artifact(11,g);const result=missionResult(11,g);p.reports[11]={delay:result.delay,story:result.story,checks:result.checks};
 p.games[11]=newActivity(11);p.games[11].change=2;p.games[11].checked=true;
 const reloaded=cleanProgress(JSON.parse(JSON.stringify(p)));assert.deepEqual(savedFeedback(reloaded,11),result.checks);assert.match(savedFeedback(reloaded,11)[0].text,/hub opens two hours later/);assert.equal(reloaded.games[11].change,2);
 delete reloaded.reports[11].checks;assert.deepEqual(savedFeedback(reloaded,11),[]);
});
test('the kanban working example records real start and finish times for all four jobs',()=>{
 const g=help(8,newActivity(8));assert.equal(g.boardClock,8);assert.equal(Object.keys(g.started).length,4);assert.equal(Object.keys(g.finished).length,4);for(let i=0;i<4;i++)assert.ok(g.finished[i]>g.started[i]);
});
test('activity art uses the same hour trade-off and budget facts as the activity',async()=>{
 const {issueArt}=await import('../art.js');const g=help(11,newActivity(11));g.change=0;assert.match(issueArt(11,{},g),/hub opens 2 hours later/);assert.doesNotMatch(issueArt(11,{},g),/shifts/);
 const b=help(7,newActivity(7));b.budget=[1,1,1,2];const html=issueArt(7,{},b);assert.match(html,/3 tokens over budget/);assert.doesNotMatch(html,/RESERVE|-3 tokens/);
});

test('sending every delivery does not hide an empty or excessive final buffer',()=>{
 for(const [choices,stock,ok] of [[[1,2,1,0],0,false],[[1,2,1,2],2,true],[[1,2,1,3],3,false]]){
  const g=help(8,newActivity(8));g.flowChoices=choices;const f=flowState(choices),result=missionResult(8,g);assert.equal(f.served,6);assert.equal(f.stock,stock);assert.equal(result.ready,true);assert.equal(feedbackFor(8,g).find(r=>r.label==='Stock').ok,ok);assert.match(result.story,new RegExp(stock+' boxes ready for next time'));
  if(stock===0)assert.match(result.story,/needs 2 more boxes before the next visit/);if(stock===3)assert.match(result.story,/packed more than we need/);
 }
});

test('unfinished feedback identifies missing choices, overspending, and the pending printer test',async()=>{
 const {unfinishedMessage}=await import('../operations.js');const budget=newActivity(7);
 assert.match(unfinishedMessage(7,budget),/Choose one option/);budget.budget=[1,1,1,2];assert.match(unfinishedMessage(7,budget),/14 tokens.*11.*lower-cost/);
 const quality=newActivity(10);assert.match(unfinishedMessage(10,quality),/all three hub parts/);quality.tested=[0,1,2];assert.match(unfinishedMessage(10,quality),/whether to stop/);quality.qualityMode=0;assert.match(unfinishedMessage(10,quality),/card holder and test/);assert.doesNotMatch(unfinishedMessage(10,quality),/all three hub parts/);
 const change=newActivity(11);assert.match(unfinishedMessage(11,change),/whether to build/);change.change=0;assert.match(unfinishedMessage(11,change),/Agree this plan/);
});
test('sorting reviews show the chosen category and explain the relevant concept',()=>{
 const g=help(1,newActivity(1));g.picks[0]=1;assert.match(feedbackFor(1,g)[0].text,/You chose Operations.*project/);
 const scope=help(3,newActivity(3));scope.picks[0]=1;assert.match(feedbackFor(3,scope)[0].text,/You chose Later.*neighbors need/);
 const groups=help(4,newActivity(4));groups.picks[0]=2;assert.match(feedbackFor(4,groups)[0].text,/You chose Quiet space.*Clear path/);
});
