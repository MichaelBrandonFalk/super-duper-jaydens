// Replay changes one familiar constraint at a time. Original lessons keep their defaults.
export const challenges={
 6:{id:'team-hours',title:'Two hours each',text:'Jayden, Mika, and Bolt each have two hours for these same four jobs.',kind:'clock'},
 7:{id:'budget-nine',title:'A nine-token budget',text:'This time we have nine tokens instead of eleven. Meet the same three needs and keep at least one token in reserve.',kind:'coins'},
 8:{id:'library-order',title:'New library requests',text:'The library asks for 2, 1, 2, and 1 boxes. Keep the same two-box buffer ready.',kind:'boxes'}
};
export const budgetLimit=g=>g?.challenge==='budget-nine'?9:11;
export const capacityFor=g=>g?.challenge==='team-hours'?{jayden:2,mika:2,bolt:2}:{jayden:3,mika:3,bolt:2};
export const demandFor=g=>g?.challenge==='library-order'?[2,1,2,1]:[1,2,1,2];
