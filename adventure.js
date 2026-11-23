// A saved decision ledger makes tools finite without silently spending them twice.
export const types={reach:'Reach high places',scan:'Find a hidden problem',sort:'Sort mixed parts',signal:'Send a city signal',shelter:'Keep work dry or shaded',carry:'Carry a light load',crew:'Bring a helper',repair:'Make a quick repair'};
export const finds=[
 [['Grapple ribbon','reach','Jayden clips a ribbon line onto the kit. It can reach a high rail.'],['Lens badge','scan','Mika fits a lens into our badge. It can spot a hidden fault.']],
 [['Roof-cat whistle','crew','The station keeper gives us a whistle. It can call a roof helper.'],['Echo clicker','signal','Bolt builds a clicker. It can send a clear signal across a gap.']],
 [['Fold-out shade','shelter','Mika folds a light cover into our kit. It opens into a shade for a work spot.'],['Pocket step','reach','Mika builds a folding step. It can reach a high marker.']],
 [['Captain Scoop','sort','Bolt makes a parts scoop from a spare spoon. It can sort a tray of tiny bolts.'],['Paper-bird drone','carry','Mika folds a paper bird around a tiny motor. It can carry a light wire or pack.']],
 [['Relay kite','signal','Jayden fits a signal lamp to a kite. It can send a message above the roofs.'],['Line glider','carry','Mika builds a glider that carries a light line across a gap.']],
 [['Star driver','repair','The star-shaped bit fits our tool handle. It can tighten a loose fitting.'],['Search goggles','scan','The spare goggles have a work light. They can find a part in a dark space.']],
 [['Pack sorter','sort','Folded dividers turn spare wrapping into a parts sorter.'],['Spare canopy','shelter','The depot keeper gives us a canopy. It can cover a small work spot.']],
 [['Helper radio','crew','Our radio can call a spare pair of hands for one job.'],['Code lamp','signal','Bolt fits a code lamp. It can guide a crew to the right bay.']],
 [['Rain wrap','shelter','Mika rolls a rain wrap into the kit. It can keep a work spot dry.'],['Patch roll','repair','Jayden packs a patch roll. It can mend a loose cover.']],
 [['Guide jig','repair','Mika makes a spare guide. It can hold a small fitting in place.'],['Test lens','scan','Bolt packs a test lens. It can find a mark that is out of line.']],
 [['Dock flag','signal','Jayden makes a bright dock flag. It can guide a crew from a distance.'],['Cargo hook','carry','Mika adds a cargo hook. It can move a light pack across a gap.']],
 [['Parts tray','sort','Bolt adds a tray with separate slots. It can sort a mixed pack.'],['Crew bell','crew','Mika packs a bell. It can call a nearby helper for one job.']],
 [['Launch line','reach','Jayden packs a launch line. It can reach the last high marker.'],['Beacon lens','scan','Mika packs a beacon lens. It can find the last signal fault.']]
];
export const fieldJobs=[
 ['The high roof marker','The marker is above the rail. Bring it down so the roof crew can read the route.',['reach','scan'],'Roof route marked','The roof crew can now find the hub.'],
 ['The quiet station signal','A crew on the far platform cannot see our board. Help them find the right bay.',['signal','crew'],'Station linked','The station crew can send signal packs to our hub.'],
 ['The sunny work bench','The bench needs shade before the crew can test the map screen.',['shelter','reach'],'Map bench open','The map team opens a fourth stop in each district.'],
 ['The scattered bolt tray','Small bolts have rolled into two trays. Get the right set to the gear crew.',['sort','carry'],'Gear bay supplied','The gear crew can finish the hub fittings.'],
 ['The quiet relay socket','The relay socket has a hidden loose fitting. Find the fault or steady the fitting to bring its signal back.',['repair','scan'],'Roof relay linked','The roof relay now carries the city signal.'],
 ['A pack for the workshop','A light parts pack waits across the yard in a sunny spot. Bring it to the bench or shade the spot so the crew can work there.',['carry','shelter'],'Workshop ready','The workshop adds one supply pack to our kit.'],
 ['The supply hatch','The supply hatch has a high latch and a loose lower handle. Reach the latch or fix the handle so the depot can open.',['reach','repair'],'Depot ready','The depot can send the right packs to each crew.'],
 ['The mixed dispatch cards','Cards for three bays are mixed. Sort them or call a helper to set out the next packs.',['sort','crew'],'Dispatch connected','The far bay can now send packs when a card comes back.'],
 ['A cover at the far bay','A dry gear cover waits across the yard. Carry its light line to us or signal the far crew to bring it.',['signal','carry'],'Dry gear bay','The packs have a dry waiting spot.'],
 ['The bright test bench','Glare hides a guide mark. Shade the bench so the crew can line it up, or fit a shaped guide that holds the mark steady.',['shelter','repair'],'Test bay ready','The test crew can save one extra shift if our plans have caused a delay.'],
 ['The high dock marker','The dock marker points the wrong way. Reach it or find the setting that turns it.',['scan','reach'],'Dock linked','The dock crew can find the hub route.'],
 ['Books across the courtyard','The library team needs a light guide line across the courtyard. Carry the line or signal the far crew to bring it.',['signal','carry'],'Library ready','The library crew can load books and messages.'],
 ['The last beacon marker','One high marker points away from the rover route. Reach it or find its hidden setting.',['reach','scan'],'Launch beacon aligned','The rover can follow the launch route.']
];
const actions=[
{reach:'lowers the high marker with its line.',scan:'finds the marker’s ground control. The crew turns it.'},
{signal:'signals the far platform. The crew finds our bay.',crew:'calls the roof helper, who guides the station crew.'},
{shelter:'shades the screen so the crew can check the map.',reach:'reaches the canopy rail. The crew hangs a shade.'},
{sort:'sorts the loose bolts into the right tray.',carry:'carries the tiny bolt pack to the gear crew.'},
{repair:'steadies the relay’s loose socket.',scan:'spots the loose socket. The crew tightens it.'},
{carry:'brings the light parts pack across the yard.',shelter:'shades the pack so the workshop crew can work there.'},
{reach:'reaches the high supply latch.',repair:'fixes the lower handle so the hatch opens.'},
{sort:'sorts the dispatch cards into their three bays.',crew:'calls a helper to set out the right dispatch packs.'},
{signal:'signals the far crew to bring the dry cover.',carry:'brings the cover’s light guide line across the yard.'},
{shelter:'cuts the glare. The test crew lines up the guide.',repair:'fits a steady guide at the test bench.'},
{scan:'finds the dock marker’s setting. The crew turns it.',reach:'reaches the high dock marker and turns it.'},
{signal:'signals the library crew to bring the guide line.',carry:'carries the library’s guide line across the courtyard.'},
{reach:'reaches and turns the launch marker.',scan:'finds the launch marker’s hidden setting. The crew aligns it.'}
];
export const districts=[{name:'Hill homes',need:4,unit:'home stops',benefit:'Neighbors receive their book and message packs.'},{name:'Sky station',need:4,unit:'platform stops',benefit:'Crews receive route updates and spare parts.'},{name:'River library',need:4,unit:'library stops',benefit:'Reading corners receive their book boxes.'}];
export function gearId(issue,choice){return issue+':'+choice;}
export function gear(p){const used=new Set(Object.values(p.fieldPlans||{}).filter(x=>x.kind==='gear').map(x=>x.gear));return Object.entries(p.detours||{}).map(([i,n])=>({id:gearId(Number(i),n),issue:Number(i),name:finds[Number(i)-1]?.[n]?.[0],type:finds[Number(i)-1]?.[n]?.[1],used:used.has(gearId(Number(i),n))})).filter(x=>x.name);}
export function suppliesLeft(p,except=0){return 5+(p.fieldPlans?.[6]?.done?1:0)-Object.entries(p.fieldPlans||{}).filter(([id,r])=>Number(id)!==except&&r.kind==='supply').length;}
export function availableGear(p,id){const reserved=new Set(Object.entries(p.fieldPlans||{}).filter(([k,r])=>Number(k)!==id&&r.kind==='gear').map(([,r])=>r.gear));return gear(p).filter(x=>x.issue<=id&&!reserved.has(x.id)&&fieldJobs[id-1][2].includes(x.type));}
export function chooseFind(p,id,n){if(![0,1].includes(n))return {ok:false,text:'Choose one tool.'};const old=gearId(id,p.detours[id]);if(Object.values(p.fieldPlans||{}).some(r=>r.kind==='gear'&&r.gear===old)&&p.detours[id]!==n)return {ok:false,text:'That tool has been used on a city job. Replan that job before swapping it.'};p.detours[id]=n;return {ok:true,text:finds[id-1][n][2]};}
export function resolveField(p,id,kind,tool=''){if(!fieldJobs[id-1]||!p.done.includes(id))return {ok:false,text:'Finish this mission plan before running its field job.'};let name='',story='',delay=0;if(kind==='gear'){const item=availableGear(p,id).find(x=>x.id===tool);if(!item)return {ok:false,text:'That tool is not available for this job.'};name=item.name;const type=item.type;story=name+' '+actions[id-1][type];}
else if(kind==='gadget'){const type=p.gadget==='projector'?'scan':'signal';if(!fieldJobs[id-1][2].includes(type))return {ok:false,text:'Our starting gadget does not fit this job.'};if(Object.entries(p.fieldPlans||{}).filter(([k,r])=>Number(k)!==id&&r.kind==='gadget').length>=2)return {ok:false,text:'Our two gadget power packs are used. Choose a tool, supply pack, or crew shift.'};name=p.gadget==='projector'?'Tiny projector':'Pocket kite';story=name+' '+actions[id-1][type];}
else if(kind==='supply'){if(suppliesLeft(p,id)<1)return {ok:false,text:'No supply packs are left. Replan another job or use a crew shift.'};name='Supply pack';story='The crew uses a supply pack to finish this job. One fewer pack remains for later.';}
else if(kind==='crew'){name='Crew shift';delay=1;story='The crew takes another shift to finish this job. It uses one of the rover’s route slots.';}
else if(kind==='tomorrow'){name='Tomorrow’s list';story='This job stays open until tomorrow. The city does not gain this upgrade today.';}
else return {ok:false,text:'Choose how to handle this field job.'};
const outcome={kind,gear:kind==='gear'?tool:'',delay,done:kind!=='tomorrow',name,story};p.fieldPlans??={};p.fieldPlans[id]=outcome;p.routeLaunched=false;return {ok:true,...outcome};}
export function fieldTotals(p){const rows=Object.values(p.fieldPlans||{});return {delay:rows.reduce((n,x)=>n+(x.delay||0),0),built:rows.filter(x=>x.done).length,open:13-rows.filter(x=>x.done).length};}
export function cleanAdventure(raw,p){p.fieldPlans={};for(const [k,r] of Object.entries(raw?.fieldPlans||{}).sort(([a],[b])=>Number(a)===6?-1:Number(b)===6?1:Number(a)-Number(b))){const id=Number(k);if(!p.done.includes(id)||!fieldJobs[id-1]||!['gear','gadget','supply','crew','tomorrow'].includes(r?.kind))continue;const result=resolveField(p,id,r.kind,typeof r.gear==='string'?r.gear:'');if(!result.ok)continue;}p.route=Array.from({length:3},(_,i)=>Number.isInteger(raw?.route?.[i])?Math.max(0,Math.min(4,raw.route[i])):0);p.routeLaunched=raw?.routeLaunched===true;return p;}
export const accessJobs=[[1,5,9],[2,8,11],[4,7,12]];
export function districtAccess(p,i){return accessJobs[i].filter(id=>!p.fieldPlans?.[id]?.done);}
export function districtLimit(p,i){return districtAccess(p,i).length?0:p.fieldPlans?.[3]?.done?4:3;}
export function priorityDistrict(p){return p.theme==='garden'?2:p.theme==='comic'?0:1;}
export function allocation(p,capacity){const slots=[0,0,0];if(!p.fieldPlans?.[13]?.done)return slots;let room=capacity;const focus=priorityDistrict(p);if(room>0&&districtLimit(p,focus)>0){slots[focus]=1;room--;}for(let i=0;i<3;i++){const n=Math.min(room,Math.max(0,(p.route?.[i]||0)-slots[i]),districtLimit(p,i)-slots[i]);slots[i]+=n;room-=n;}return slots;}
export function routeChange(p,index,delta,capacity){if(![0,1,2].includes(index)||!['fill','-1','1',-1,1].includes(delta)||!p.fieldPlans?.[13]?.done)return allocation(p,capacity);const slots=allocation(p,capacity),free=capacity-slots.reduce((n,v)=>n+v,0);const floor=index===priorityDistrict(p)&&capacity>0&&districtLimit(p,index)>0?1:0;slots[index]=Math.max(floor,Math.min(districtLimit(p,index),slots[index]+(delta==='fill'?free:Number(delta)),slots[index]+free));p.route=slots;p.routeLaunched=false;return slots;}

export function gadgetUsesLeft(p){return 2-Object.values(p.fieldPlans||{}).filter(r=>r.kind==='gadget').length;}
