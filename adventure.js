// A saved decision ledger makes tools finite without silently spending them twice.
export const types={reach:'Reach high places',scan:'Find a hidden problem',sort:'Sort mixed parts',signal:'Send a message to a crew',shelter:'Keep work dry or shaded',carry:'Carry a light load',crew:'Bring a helper',repair:'Make a quick repair'};
export const finds=[
  [
    [
      "Grapple ribbon",
      "reach",
      "Jayden clips a ribbon line onto the kit. It can reach a high rail."
    ],
    [
      "Lens badge",
      "scan",
      "Mika fits a lens into our badge. It can spot a hidden fault."
    ]
  ],
  [
    [
      "Roof-cat whistle",
      "crew",
      "The station keeper gives us a whistle. It can call a roof helper."
    ],
    [
      "Echo clicker",
      "signal",
      "Bolt builds a clicker. It can send a clear signal across a gap."
    ]
  ],
  [
    [
      "Fold-out shade",
      "shelter",
      "Mika folds a light cover into our kit. It opens into a shade for a work spot."
    ],
    [
      "Pocket step",
      "reach",
      "Mika builds a folding step. It can reach a high marker."
    ]
  ],
  [
    [
      "Captain Scoop",
      "sort",
      "Bolt makes a parts scoop from a spare spoon. It can sort a tray of tiny bolts."
    ],
    [
      "Paper-bird drone",
      "carry",
      "Mika folds a paper bird around a tiny motor. It can carry a light wire or pack."
    ]
  ],
  [
    [
      "Relay kite",
      "signal",
      "Jayden fits a signal lamp to a kite. It can send a message above the roofs."
    ],
    [
      "Line glider",
      "carry",
      "Mika builds a glider that carries a light line across a gap."
    ]
  ],
  [
    [
      "Star driver",
      "repair",
      "The star-shaped bit fits our tool handle. It can tighten a loose fitting."
    ],
    [
      "Search goggles",
      "scan",
      "The spare goggles have a work light. They can find a part in a dark space."
    ]
  ],
  [
    [
      "Pack sorter",
      "sort",
      "Folded dividers turn spare wrapping into a parts sorter."
    ],
    [
      "Spare canopy",
      "shelter",
      "The depot keeper gives us a canopy. It can cover a small work spot."
    ]
  ],
  [
    [
      "Helper radio",
      "crew",
      "Our radio can call a spare pair of hands for one job."
    ],
    [
      "Code lamp",
      "signal",
      "Bolt fits a code lamp. It can guide a crew to the right bay."
    ]
  ],
  [
    [
      "Rain wrap",
      "shelter",
      "Mika rolls a rain wrap into the kit. It can keep a work spot dry."
    ],
    [
      "Patch roll",
      "repair",
      "Jayden packs a patch roll. It can mend a loose cover."
    ]
  ],
  [
    [
      "Guide jig",
      "repair",
      "Mika makes a spare guide. It can hold a small fitting in place."
    ],
    [
      "Test lens",
      "scan",
      "Bolt packs a test lens. It can find a mark that is out of line."
    ]
  ],
  [
    [
      "Dock flag",
      "signal",
      "Jayden makes a bright dock flag. It can guide a crew from a distance."
    ],
    [
      "Cargo hook",
      "carry",
      "Mika adds a cargo hook. It can move a light pack across a gap."
    ]
  ],
  [
    [
      "Parts tray",
      "sort",
      "Bolt adds a tray with separate slots. It can sort a mixed pack."
    ],
    [
      "Crew bell",
      "crew",
      "Mika packs a bell. It can call a nearby helper for one job."
    ]
  ],
  [
    [
      "Launch line",
      "reach",
      "Jayden packs a launch line. It can reach the last high route arrow."
    ],
    [
      "Route lens",
      "scan",
      "Mika packs a route lens. It can find a hidden setting on a route arrow."
    ]
  ]
];
export const fieldJobs=[
  [
    "The high roof arrow",
    "A route arrow is above the rail. Lower it or turn it from the ground so the roof crew can find the hub.",
    [
      "reach",
      "scan"
    ],
    "Roof route marked",
    "The roof crew can now find the hub."
  ],
  [
    "The far station crew",
    "The crew on the far platform cannot see where to bring its parts packs. Send a message or call a helper to show the way.",
    [
      "signal",
      "crew"
    ],
    "Station crew connected",
    "The station crew can bring parts packs to the hub."
  ],
  [
    "The sunny map table",
    "The map team plans the rover’s stops on a screen at the map table. Glare makes the screen hard to read. Help shade it.",
    [
      "shelter",
      "reach"
    ],
    "Map table ready",
    "The map team can now plan a fourth stop in each district."
  ],
  [
    "The scattered bolts",
    "The workbench needs a set of small bolts to build the signal desk. Sort the loose bolts or carry a ready set to the workbench.",
    [
      "sort",
      "carry"
    ],
    "Workbench bolts ready",
    "The crew has the bolts it needs for the signal desk."
  ],
  [
    "The loose relay socket",
    "After moving the relay from the workbench to the roof, the crew finds a loose socket. Find it or hold it steady so the crew can tighten it.",
    [
      "repair",
      "scan"
    ],
    "Roof relay connected",
    "The relay can now pass messages from the signal desk to the beacon."
  ],
  [
    "Parts for the workbench",
    "A light parts pack waits across the yard in the sun. Bring it to the workbench, or shade the spot so the crew can pack supplies there.",
    [
      "carry",
      "shelter"
    ],
    "Workbench stocked",
    "With these parts, the crew adds one supply pack to our kit."
  ],
  [
    "The supply hatch",
    "The supply hatch has a high latch and a loose lower handle. Reach the latch or fix the handle so the depot can open.",
    [
      "reach",
      "repair"
    ],
    "Depot ready",
    "The depot can send parts packs to each crew."
  ],
  [
    "The mixed kanban cards",
    "Returned kanban cards from three crews are mixed together. Sort them or call a helper so each crew gets the right replacement parts.",
    [
      "sort",
      "crew"
    ],
    "Parts dispatch ready",
    "The dispatch team can now send replacement parts packs to the right crews."
  ],
  [
    "A cover for the spare parts",
    "A light rain cover waits across the yard. Carry it over or send a message asking the far crew to bring it.",
    [
      "signal",
      "carry"
    ],
    "Covered storage ready",
    "Spare beacon parts can now wait under the rain cover."
  ],
  [
    "The test bench’s card guide",
    "The route-card printer sits on the test bench. Glare hides the mark used to line up its card guide. Shade the bench or fit a guide that holds cards straight.",
    [
      "shelter",
      "repair"
    ],
    "Test bench ready",
    "The test crew can save one extra shift if our plans have caused a delay."
  ],
  [
    "The high dock arrow",
    "An arrow above the dock points away from the hub. Reach it or find its ground control to turn it the right way.",
    [
      "scan",
      "reach"
    ],
    "Dock route marked",
    "The dock crew can now find the hub."
  ],
  [
    "Route cards for the library",
    "A light box of route cards waits across the courtyard. Carry it over or ask the far crew to bring it to the library.",
    [
      "signal",
      "carry"
    ],
    "Library ready",
    "The library crew can match books and messages to the rover’s stops."
  ],
  [
    "The last route arrow",
    "One high arrow points away from the rover’s route. Reach it or find its ground control to turn it.",
    [
      "reach",
      "scan"
    ],
    "Launch route marked",
    "The rover can now follow the marked delivery route."
  ]
];
const actions=[
{reach:'lowers the high route arrow with its line.',scan:'finds the route arrow’s ground control. The crew turns it.'},
{signal:'sends a message to the far platform. The crew finds the hub.',crew:'calls the roof helper, who guides the station crew.'},
{shelter:'shades the map table’s screen so the crew can plan the route.',reach:'reaches the canopy rail. The crew hangs a shade.'},
{sort:'sorts the loose bolts for the workbench.',carry:'carries the small bolt pack to the workbench.'},
{repair:'holds the loose socket steady while the crew tightens it.',scan:'spots the loose socket. The crew tightens it.'},
{carry:'brings the light parts pack across the yard to the workbench.',shelter:'shades the parts pack so the crew can pack supplies there.'},
{reach:'reaches the high supply latch.',repair:'fixes the lower handle so the hatch opens.'},
{sort:'sorts the returned kanban cards by crew.',crew:'calls a helper to match returned kanban cards to parts packs.'},
{signal:'sends a message asking the far crew to bring the rain cover.',carry:'brings the light rain cover across the yard.'},
{shelter:'shades the test bench. The crew lines up the printer’s card guide.',repair:'helps the crew fit a shaped card guide to the printer on the test bench.'},
{scan:'finds the dock arrow’s ground control. The crew turns it.',reach:'reaches the high dock arrow and turns it.'},
{signal:'sends a message asking the far crew to bring the route-card box to the library.',carry:'carries the light route-card box across the courtyard to the library.'},
{reach:'reaches and turns the last route arrow.',scan:'finds the last route arrow’s ground control. The crew turns the arrow.'}
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
