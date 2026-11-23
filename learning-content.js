// Shared lesson objects keep promises, answer labels, work lists, and checks aligned.
export const hubParts={
 path:{id:'path',name:'Clear path',need:'I use a wheelchair. I need a clear path through the hub.',jobs:['Mark the Clear path','Move boxes off the Clear path'],check:{name:'Can a wheelchair use the Clear path?',issue:'A box blocks the Clear path.',options:['Paint the box','Move the box off the Clear path'],right:1}},
 desk:{id:'desk',name:'Message desk',need:'I need to reach the buttons at the message desk to send a message.',jobs:['Fit low buttons at the Message desk','Put the screen on the Message desk'],check:{name:'Can everyone reach the Message desk’s buttons?',issue:'The Message desk’s buttons are too far back.',options:['Move the buttons within reach','Make the desk brighter'],right:0}},
 quiet:{id:'quiet',name:'Quiet space',need:'I need a quiet space where I can sit and rest.',jobs:['Put seats in the Quiet space','Move noisy tools away from the Quiet space'],check:{name:'Is the Quiet space quiet enough to rest?',issue:'A loud radio is playing beside the Quiet space.',options:['Move the radio away from the Quiet space','Add brighter lights'],right:0}}
};
// Preserve existing answer indices and saved choices.
export const needParts=[hubParts.path,hubParts.quiet,hubParts.desk];
export const scopeParts=[hubParts.desk,hubParts.quiet,hubParts.path];
export const workParts=[hubParts.path,hubParts.desk,hubParts.quiet];
export const qualityParts=[hubParts.quiet,hubParts.path,hubParts.desk];
export const neighborNotes=needParts.map(p=>p.need);
export const workGroups=workParts.map(p=>p.name);
export const improvementChoices=['Add a bright poster','Move the cards beside the scanner','Ask Bolt to work faster'];
