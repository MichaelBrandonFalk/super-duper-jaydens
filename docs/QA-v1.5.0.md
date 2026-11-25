# Browser gameplay update · v1.5.0

Reviewed November 25, 2026. Browser release only. Desktop downloads, packages, release tags, and native build workflows remain unchanged at v1.4.9.

## Gameplay changes

- Kanban and hub-test action feedback appears beside the affected card or tool. A blocked move scrolls only enough to keep its explanation visible.
- Tested plans with a failed check offer a player-led repair. Useful answers remain in place. A library repair retains the completed board, and a printer repair retains the passed hub tests. The plan book retains unfinished test reports and marks them as needing repair.
- Wrong launch decisions stay on their scene until the player selects a working repair. The pending scene survives reload; the final outcome records repaired decisions and extra planning. Earlier completed endings remain available during replays.
- A bounded pair of actual tested results supports before-and-after comparisons. Editing an unfinished plan cannot rewrite an earlier snapshot. Different challenge conditions are explicitly excluded from direct comparisons.
- Optional replay challenges change one constraint in issues 6, 7, and 8: two hours per helper, a nine-token budget, or a different library request order. Hours, budget checks, reserve, helper examples, replacement requests, results, and art readouts use the same constraint data.
- Help starts with a concept hint, then a focused hint. Showing a working plan fills an example without saving or advancing the lesson. The player can edit and submit it.
- Home resumes an unfinished replay after game completion and also retains a link to the hub celebration.

## Graphics

Added original small cel-style SVG drawings for maps, radios, work cards, parts, seats, clocks, tools, scanners, drones, coins, boxes, signs, and the rover. They use the existing ink, teal, and gold palette, are decorative beside text, require no new bitmap downloads, and disappear with Fewer pictures.

The Hero Hub drawing develops from a plan into a built hub. Its street sign, map placement, workbench arrangement, welcome-sign design, and agreed landing pad reflect saved decisions. An expandable illustrated record retains all story choices. The hub is available on Home and in the celebration. Text descriptions and choice records remain available when pictures are hidden.

## Verification

- 74 automated tests pass, including new coverage for launch repair persistence, real challenge constraints, helpers without auto-submission, bounded result comparisons, legacy finale replay, saved resume state, and decision-dependent hub art.
- Static build, JavaScript syntax checks, and whitespace checks pass.
- Browser: a fresh isolated QA player completed the intro and all 13 issues. Issue 1 was tested with a wrong classification, repaired manually, and compared from 3/4 to 4/4. Working examples were separately tested as unsubmitted examples in the lesson flow.
- Browser: all five launch scenes were first answered incorrectly, then repaired by the player. A pending repair survived reload; the final result recorded all five repaired decisions. The ending visited all three neighborhoods in the chosen order.
- Browser: the team-hours challenge showed 3/2 hours and was repaired to fit; the nine-token challenge required a reserve; the reordered library challenge required maintaining the target buffer after each request. The library comparison showed 2/4 target-buffer rounds improving to 4/4, without repeating the completed board.
- Browser: manually inspected, fixed, and tested the three hub parts, then ran a faulty printer plan and repaired it. The new comparison showed six cards needing a new print becoming zero. The repair retained all three passed hub tests, and printer feedback appeared in the printer section.
- Browser: two ineffective PDCA trials were repaired to the useful layout, with comparisons of 8 to 4 trips and 8 to 5 trips.
- Browser: unfinished replay resume survived reload while the completed ending and agreed landing pad remained intact. Finishing that replay returned Home to Visit our hub.
- Browser: keyboard Tab/Enter moved from the hint panel to Another hint, then to Show a working plan. No automatic answer submission occurred.
- Browser: all 52 issue pages were checked at the existing narrow viewport with Biggest text, stronger contrast, reduced motion, and fewer pictures. No page overflow or missing-value text was found. Text choice records remained available with the hub drawing hidden.
- No browser console errors observed during these checks. Audible read-aloud playback was not newly verified in this release.
- The download page still reports desktop v1.4.9 alongside browser v1.5.0. No production player answers were changed in testing.
