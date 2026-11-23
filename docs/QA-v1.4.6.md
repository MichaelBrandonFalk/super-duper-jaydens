# Result accuracy and lesson wording · v1.4.6

Reviewed November 23, 2026. Web only; desktop releases remain paused.

Reviewed result generators and incomplete/complete answer paths. A text-generation sweep covered 1,170 combinations across eleven activity types without missing-value text; this checks generated text integrity, not whether every possible plan is educationally ideal. The existing suite also covers scheduling and quality activities.

Corrected three concrete clarity problems: needs results counted omissions and extras as additional hub parts; workload results did not name the overloaded helper; risk results called every ineffective response a missing backup. Results now identify the actual requirements, helper hours, and effects. Needs reviews also distinguish adding an item from leaving it off.

Correction controls now distinguish editing from starting over. Editable plans retain their selections when Change our plan is chosen. Board, quality, and launch activities use Try this activity again and reset their current run. Saved results remain intact until a replacement is tested.

## Verification

- 57 automated tests pass, including regressions for missing/excess needs, named overloads, and agreement between risk outcomes and review explanations.
- Static build, JavaScript syntax check, and whitespace check pass.
- Browser: selected only the Giant spinning sign after reading all three notes. The result named all three omitted hub requirements and the unrequested extra, without inventing a fourth hub part.
- Browser: gave Bolt four hours of work with two available. The result named Bolt and both hour totals. Change our plan retained all four assignments; moving the panel job to Mika produced a plan within every helper’s capacity.
- Browser: protected spare parts and paper, then gave every job to Jayden. Only that response was identified as ineffective, with the same explanation in the summary and review.
- Browser: Try this activity again returned the kanban board to four Ready jobs.
- No browser console errors observed during these checks.

No profiles were deleted. No native packages, release tags, or desktop workflows were created.
