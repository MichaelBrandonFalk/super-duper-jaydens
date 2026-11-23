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
