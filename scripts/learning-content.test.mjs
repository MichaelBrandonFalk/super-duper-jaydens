import test from 'node:test';
import assert from 'node:assert/strict';
import {hubParts,needParts,workParts,workGroups,qualityParts,neighborNotes} from '../learning-content.js';
import {missions} from '../data.js';
import {needCards,scopeCards,workCards,costs,tests,newActivity,help,cleanProgress,freshProgress,evaluate} from '../engine.js';
import {missionResult,feedbackFor} from '../operations.js';

test('the same three promised parts are named in needs, scope, work groups, budget, and quality checks',()=>{
 const names=Object.values(hubParts).map(p=>p.name).sort();
 for(const labels of [needCards.slice(0,3),scopeCards.slice(0,3),workGroups,costs.slice(0,3).map(c=>c.name),qualityParts.map(p=>p.name)])assert.deepEqual([...labels].sort(),names);
 needParts.forEach((p,i)=>assert.ok(neighborNotes[i].toLowerCase().includes(p.name.toLowerCase()),p.name));
 workParts.forEach(p=>p.jobs.forEach(job=>assert.ok(job.includes(p.name),job)));
 for(const id of [2,3,4,7,10]){const text=missions[id-1].story.join(' ');for(const name of names)assert.ok(text.includes(name),'Issue '+id+': '+name);}
 const groupText=missions[3].instruction;for(const name of names)assert.ok(groupText.includes(name));
});

test('every scope requirement has a quality check and all three are needed before printer work',()=>{
 assert.deepEqual(tests.map(t=>t.part).sort(),Object.keys(hubParts).sort());
 const complete=help(10,newActivity(10));assert.equal(missionResult(10,complete).ready,true);
 for(let i=0;i<tests.length;i++){const g=structuredClone(complete);g.tested=g.tested.filter(n=>n!==i);assert.equal(missionResult(10,g).ready,false,tests[i].name);assert.equal(feedbackFor(10,g).filter(r=>!r.ok).length,1);}
});

test('player-facing lesson and answer text does not reintroduce retired story aliases',()=>{
 const text=JSON.stringify({missions:missions.map(({adult,...m})=>m),needCards,scopeCards,workCards,costs,tests,neighborNotes});
 assert.doesNotMatch(text,/recharge|nook|work boxes|signal desk|relay|beacon/i);
 for(const m of missions)for(const key of ['lesson','example','instruction'])assert.ok(m[key]);
});

test('an old quality completion is retained without pretending its screen check tested the Quiet space',()=>{
 const raw=freshProgress();delete raw.lessonRevision;raw.done=[10];raw.games[10]=help(10,newActivity(10));raw.reports[10]={delay:2,story:'Earlier printer run took two extra shifts.'};raw.plans[10]='Code panel, route, and signal controls tested after their fixes.';
 const p=cleanProgress(raw);assert.deepEqual(p.done,[10]);assert.equal(p.reports[10].delay,2);assert.ok(!p.games[10].tested.includes(0));assert.match(p.reports[10].story,/did not check the Quiet space/);
 assert.equal(missionResult(10,p.games[10]).ready,false);
 assert.equal(cleanProgress(p).reports[10].story,p.reports[10].story);
 const current=freshProgress();current.games[10]=help(10,newActivity(10));assert.equal(cleanProgress(current).games[10].tested.length,3);
});

test('a second PDCA result survives reload and approved extra work has an explicit time trade-off',()=>{
 const p=freshProgress();p.games[12]=help(12,newActivity(12));assert.equal(cleanProgress(p).games[12].trips,5);
 const add=help(11,newActivity(11));add.change=0;assert.equal(evaluate(11,add).ok,true);assert.equal(missionResult(11,add).ready,true);assert.equal(missionResult(11,add).delay,2);
 const later=help(11,newActivity(11));assert.equal(missionResult(11,later).delay,0);
});

test('a quality improvement saves rework time without cancelling agreed new scope or city-job work',async()=>{
 const {cityOutcome}=await import('../operations.js');
 const p=freshProgress();p.fieldPlans[10]={done:true,kind:'gear',delay:0};p.reports[11]={delay:2,story:'Agreed extra work.'};
 assert.equal(cityOutcome(p).recovered,0);assert.equal(cityOutcome(p).stops,10);
 p.reports[6]={delay:1,story:'Overloaded work.'};assert.equal(cityOutcome(p).recovered,1);assert.equal(cityOutcome(p).stops,10);
 p.fieldPlans[1]={done:true,kind:'crew',delay:1};assert.equal(cityOutcome(p).stops,9);
});

test('closing a neighbor note keeps the read history and selected requirements through reload',async()=>{
 const {toggleNeighborNote}=await import('../engine.js');const p=freshProgress(),g=newActivity(2);p.games[2]=g;
 for(let i=0;i<3;i++){assert.equal(toggleNeighborNote(g,i),true);g.picks[i]=1;assert.equal(toggleNeighborNote(g,i),true);}
 assert.deepEqual(g.openNotes,[]);assert.deepEqual(g.seen,[0,1,2]);assert.equal(evaluate(2,g).ok,true);
 const restored=cleanProgress(JSON.parse(JSON.stringify(p))).games[2];assert.deepEqual(restored.openNotes,[]);assert.deepEqual(restored.picks,g.picks);assert.equal(evaluate(2,restored).ok,true);
 assert.equal(toggleNeighborNote(restored,5),false);assert.deepEqual(restored.openNotes,[]);
 const older=help(2,newActivity(2));delete older.openNotes;p.games[2]=older;assert.deepEqual(cleanProgress(p).games[2].openNotes,[0,1,2]);
});
test('scheduling review connects a misplaced step to its dependency',()=>{
 const g=newActivity(5);g.order=[2,0,1,3];const rows=feedbackFor(5,g);assert.equal(rows[0].ok,false);assert.match(rows[0].text,/step 1.*step 3.*Test the path before opening/);assert.match(rows[2].text,/built before it can be tested/);
});

test('reselecting a current plan option retains tests, approval, and feedback; changing it requires new checks',async()=>{
 const {selectPlanOption}=await import('../engine.js');
 for(const [id,kind,current,next] of [[10,'quality',0,1],[11,'change',2,0],[12,'layout',1,0]]){
  const g=help(id,newActivity(id));g.checked=true;g.feedback='Recorded test feedback.';const before=structuredClone(g);
  assert.equal(selectPlanOption(g,kind,current),false);assert.deepEqual(g,before);
  assert.equal(selectPlanOption(g,kind,99),false);assert.deepEqual(g,before);
  assert.equal(selectPlanOption(g,kind,next),true);assert.equal(g.checked,false);assert.equal(g.feedback,'');
  if(kind==='quality')assert.equal(g.qualityKey,false);if(kind==='change')assert.equal(g.approved,false);if(kind==='layout'){assert.deepEqual(g.rounds,[]);assert.equal(g.trips,null);}
 }
});

test('reloading current plans preserves every job and repairs the previously shortened desk job',async()=>{
 const {artifact}=await import('../engine.js');const p=freshProgress();
 for(let id=1;id<=13;id++){p.done.push(id);p.games[id]=help(id,newActivity(id));p.plans[id]=artifact(id,p.games[id]);}
 assert.deepEqual(cleanProgress(p).plans,p.plans);
 p.plans[4]=p.plans[4].replace('Fit low buttons at the Message desk: Message desk','Fit Message desk: Message desk');
 const restored=cleanProgress(p);assert.equal(restored.plans[4],artifact(4,p.games[4]));
 p.plans[2]='Clear path · Low buttons at the Message desk · Quiet space';
 assert.equal(cleanProgress(p).plans[2],'Clear path · Message desk · Quiet space');
 assert.equal(cleanProgress(restored).plans[4],restored.plans[4]);
});
