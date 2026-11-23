# Web learning clarity and concept review

Reviewed November 23, 2026. Desktop builds remain paused.

## Findings corrected

The previous game used recharge nook, quiet nook, and quiet space for the same object. It also used different labels in requirements, work lists, budgets, and answers. All current player-facing hub learning text now uses **Clear path**, **Message desk**, and **Quiet space**.

A shared content model supplies requirement labels, neighbor notes, grouped jobs, group buttons, budget headings, and acceptance checks. Tests verify that each promised part appears in all of those places and that no old story aliases reappear in lesson and answer content.

| Issue | Concept and clarity check |
| --- | --- |
| 1 | Project versus operations uses those exact answer labels; examples distinguish a new result from repeated work. |
| 2 | Neighbor notes and requirement choices name the same three parts. |
| 3 | Scope uses the same agreed parts and separates new ideas for later. Acceptance criteria are concrete conditions. |
| 4 | Each job names the exact part shown on its answer button. No recharge/nook alias is needed. |
| 5 | Dependencies order the familiar Clear path work: plan, build, test, open. No extra relay vocabulary is needed. |
| 6 | Capacity is measured in hours; assignment totals use the same unit as the jobs. |
| 7 | The budget covers all three scoped parts. Contingency is for a possible extra cost, not a known planned purchase. |
| 8 | WIP is enforced on the board. Returned kanban cards request replacement packs. Extra stock, missed packs, and making capacity are stated as game rules. |
| 9 | Risks might happen; the practice deliberately tests all three events. Response choices match those events. |
| 10 | Quiet space, Clear path, and Message desk each have a test and a matching fix. Printer work then introduces jidoka, andon, and error-proofing. |
| 11 | Extra scope can be approved with a stated time trade-off, or deferred. No unowned optional banner is assumed. |
| 12 | PDCA uses a measured baseline and two tests; the second test survives reload. |
| 13 | The capstone combines needs, dependencies, capacity, budget, quality, risk, acceptance, and handover. Repairs and planned extra work have visible consequences. |

A test-bench improvement can recover avoidable rework time; it does not cancel deliberately added scope or a chosen extra crew shift. The city arrow job remains independent of whether the player builds a new landing pad.

## Validation

- 42 automated checks passed, including six new learning/content/save/consequence regression checks.
- Static build and JavaScript syntax checks passed. The shared learning module is included in the web build.
- Played all 13 learning activities with a fresh local player using actual controls: sorting, neighbor notes, scope choices, grouping, job ordering, assignments, budget, kanban board and dispatch, risk responses, inspect/fix/retest and printer, change approval, two PDCA trials, and all five capstone scenes.
- Completed all 13 city jobs and allocated the final route. Deliberately approving two extra shifts resulted in 10 deliveries, with the two deferred deliveries identified by neighborhood.
- Checked a wrong Quiet space fix and its explanation, then completed the correct fix and test.
- Checked a prior-version player: saved wording uses current names and old quality completion explicitly notes the previously missing Quiet space check.
- Tool selection was moved out of Learn to the city-job section after practice; a separate fresh-player check confirmed no tools interrupt Learn, selection works after practice, and kit links return to the city job.
- Checked the revised question labels at narrow mobile and desktop widths without horizontal overflow.
- Final-scene feedback now appears before the next question, explicitly labelled as the result of the last choice; the order was verified in the browser.

This is an editorial and functional review, not a child usability study or a formal reading-age certification. The real curriculum terms are retained; surrounding examples are original.
