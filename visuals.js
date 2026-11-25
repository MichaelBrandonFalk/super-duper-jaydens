import {cityMoments,momentResult} from './city-story.js?v=1.5.1';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Painted equipment from the same visual world as the chapter illustrations.
// One shared transparent atlas keeps the small illustrations to one image request.
export const equipmentFrames={map:0,radio:1,tools:2,clock:3,coins:4,boxes:5,board:6,umbrella:7,scanner:8,drone:9,checklist:10,sign:11,rover:12,parts:13,seat:14,console:15};
const byIssue=['','sign','radio','map','parts','clock','tools','coins','board','umbrella','tools','drone','scanner','rover'];
export function gadgetArt(kind,size=60){const frame=equipmentFrames[kind]??equipmentFrames.tools;return `<span class="gadget-art painted-gadget" style="--gadget-size:${size}px;background-position:${frame%4*100/3}% ${Math.floor(frame/4)*100/3}%" aria-hidden="true"></span>`;}
export const issueGadget=(id,size=60)=>gadgetArt(byIssue[id],size);
export function choiceGallery(p){return cityMoments.map((m,i)=>momentResult(p,i+1)?`<div class="hub-choice">${issueGadget(i+1,54)}<span><strong>${esc(m.choices[p.storyChoices[i+1]][0])}</strong><small>${esc(momentResult(p,i+1))}</small></span></div>`:'').join('');}
export const hubPropFrames={street:0,entrance:1,shade:2,map:3,bowls:4,mat:5,stars:6,team:7,pad:8};
function hubProp(kind){const frame=hubPropFrames[kind];return `<span class="hub-prop hub-prop-${kind}" style="background-position:${frame%3*50}% ${Math.floor(frame/3)*50}%" aria-hidden="true"></span>`;}
export function hubView(p){
 if(!p.done.length)return '';
 const built=p.done.includes(10),pad=p.changePlan===0&&p.done.includes(11),stars=p.storyChoices?.[7]===0,team=p.storyChoices?.[7]===1,map=p.storyChoices?.[3],parts=p.storyChoices?.[4],sign=p.storyChoices?.[1];
 const labels=[built?'Our built Hero Hub.':'Our Hero Hub plan.',sign===0?'A lower street sign.':sign===1?'A second sign by the door.':'',map===0?'The map is in the shade.':map===1?'The map is on the wall.':'',stars?'The welcome sign has stars.':team?'The welcome sign shows the team.':'',parts===0?'Spare parts are in sorting bowls.':parts===1?'Spare parts match their paper outlines.':'',pad?'The agreed landing pad is built.':''].filter(Boolean).join(' ');
 const scene=built?'hub-painted':'hub-plan-painted';
 const props=built?[(sign===0?hubProp('street'):sign===1?hubProp('entrance'):''),(map===0?hubProp('shade'):map===1?hubProp('map'):''),(parts===0?hubProp('bowls'):parts===1?hubProp('mat'):''),(stars?hubProp('stars'):team?hubProp('team'):''),(pad?hubProp('pad'):'')].join(''):'';
 return `<section class="hub-display"><div class="hub-heading"><div><p class="tiny-label">${built?'BUILT BY OUR TEAM':'OUR PLAN TAKES SHAPE'}</p><h2>Our Hero Hub</h2></div>${gadgetArt(p.done.includes(13)?'rover':'tools',68)}</div><div class="hub-drawing painted-hub" role="img" aria-label="${esc(labels)}"><img class="hub-backdrop" src="assets/art/${scene}.webp" srcset="assets/art/${scene}-small.webp 960w, assets/art/${scene}.webp 1536w" sizes="(max-width:650px) 92vw, (max-width:1100px) 85vw, 920px" width="1536" height="1024" alt="" aria-hidden="true" loading="lazy" decoding="async">${props}</div><p class="hub-caption">${built?'Clear path, Message desk, and Quiet space, with details you chose.':'Our plan for Clear path, Message desk, and Quiet space, with details you chose.'}${pad?' Our landing pad is ready.':''}</p>${Object.keys(p.storyChoices||{}).length?`<details class="hub-memories"><summary>See our story choices</summary><div class="hub-choice-grid">${choiceGallery(p)}</div></details>`:''}</section>`;
}
