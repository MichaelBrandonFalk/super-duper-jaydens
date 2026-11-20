export const detours=[
 ['A tiny hero break','Try a cape pose','Jayden’s cape curls over his head. Bolt calls it a very small tent.','Draw a funny team badge','Mika draws a spoon with wings. Bolt votes for it at once.'],
 ['A sound at the station','Wave to the roof cat','The roof cat waves one paw, then returns to its very busy nap.','Try Bolt’s robot hello','Everyone gets a tiny beep and a very grand bow.'],
 ['One silly idea for Later','A moon made of toast','Bolt draws a toast moon on the Later page. It has one butter crater.','A hat for the whole city','Jayden draws a hat big enough to shade six towers. “A summer project,” says Mika.'],
 ['The smallest work shelf','Give a spoon a name','The spoon is now Captain Scoop. It will oversee snack time.','Make a paper helper','Mika folds a paper bird. It guards the spare work cards.'],
 ['While the relay charges','Invent a slow dance','Bolt’s very slow wheel dance uses exactly one tile.','Watch the kite tails','The kite tail makes a loop that looks just like a question mark.'],
 ['A garage discovery','Open the tiny drawer','Inside is a button shaped like a star. Jayden adds it to the plan book.','Try on the spare goggles','Bolt wears the goggles on his antenna. He can now see the ceiling very well.'],
 ['A free extra at the depot','Take a paper star','The gear keeper folds the spare wrapping into a star for our hub.','Take a leaf bookmark','Mika presses a fallen leaf into the plan book. A tiny free treasure.'],
 ['A card just for fun','Draw a snack card','The snack card goes in Done after everyone has a pear slice.','Draw a dance card','The dance card can have the whole team in Doing. It is a break, not a work job.'],
 ['That cloud looks like…','A sleepy whale','Jayden sketches a whale with a pillow. The sketch goes in our book.','A loaf with wheels','Bolt calls it a bread bus. Mika draws a tiny bus stop.'],
 ['A test for fun','Test a paper hat','The hat fits Bolt’s antenna. The team calls that a very good fit.','Test the cape as a shade','The cape shades one little flower. Jayden holds still while it rests.'],
 ['A second idea for Later','A tiny plant parade','Mika draws leaves wearing little shoes on the Later page.','A story-telling bench','Jayden draws a bench with a very large pair of listening ears.'],
 ['A lab name for our test','Call it the Short Hop','Bolt gives the signal-card station a tiny flag that says SHORT HOP.','Call it Cards Next Door','Mika draws a small door beside the signal-card stack. “Good neighbors,” she says.'],
 ['One last team photo','Our best cape pose','The team makes one big triangle with their capes and arms. Bolt is the point.','Our funniest robot pose','Everyone makes a square smile. Bolt says they are all very fine robots.']
];
export function rememberedDetour(id,p){const previous=p.detours?.[id-1];if(previous===undefined||id<2)return '';return 'In our book: '+detours[id-2][previous===0?2:4];}
