# Choice explanations and next steps · v1.4.4

Reviewed November 23, 2026. Web only; desktop releases remain paused.

Reviewed instructions against the activity controls and completion conditions. Replaced the generic incomplete-plan prompt with messages for missing notes, categories, assignments, budget choices, replenishment rounds, quality checks, printer tests, agreement, and improvement trials. Budget overspending identifies the selected cost and available tokens.

Sorting, scope, and work-list reviews name the player’s category and explain the expected concept. Risk responses describe their concrete effect. Saved reviews open when an explanation needs attention and remain collapsed when all choices fit. No new panels or controls were added.

## Verification

- 54 automated tests pass, including missing-step prompts and selected-category explanations.
- Static build, JavaScript syntax check, and whitespace check pass.
- Browser: selected all four expensive budget options. The prompt correctly said the plan costs 14 tokens, only 11 are available, and a lower-cost option is needed.
- Browser: stopped the printer after all three hub checks passed, then requested its result before fitting the holder. The prompt identified fitting and testing the holder, without asking for the completed hub checks again.
- Browser: marked building a new path as Operations. The result identified one sorting error and automatically opened a review naming that choice and explaining why the job is a project.
- Browser: saved the working example and verified its successful review remained collapsed.
- No browser console errors observed during these checks.

Existing saved history and player profiles remain intact. No native packages, release tags, or desktop workflows were created.
