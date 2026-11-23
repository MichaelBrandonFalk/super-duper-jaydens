# Stable selections and explicit retesting · v1.4.8

Reviewed November 23, 2026. Web only; desktop releases remain paused.

Reviewed less common interactions with selected choices and saved results. Reproduced a defect in the preview: tapping the already selected improvement option erased two recorded trials and removed the save-results action. The same selection pattern also cleared an agreed scope choice or a fitted printer holder.

Selected choices now preserve their checks, approval, trials, and feedback. A genuinely different option still invalidates the relevant checks. An explicit Test again action starts new improvement trials while retaining the chosen change and the earlier saved result. The prompt now distinguishes an already selected change from an unselected one.

## Verification

- 62 automated tests pass, including repeated-selection state preservation and invalidation when a choice changes.
- Static build, JavaScript syntax check, and whitespace check pass.
- Browser: tapped the selected improvement after the first trial and after both trials. The first feedback remained, and the completed trials remained savable.
- Browser: Test again retained the selected change and made the first-test action available. The prior four-and-five-trip result remained in the plan book.
- Browser: tapped an already agreed landing-pad choice. Agreement remained true. Choosing a different plan required agreement again.
- Browser: tapped the selected stop-and-fix printer response. The fitted/tested holder remained. Switching away and back required a new test.
- Browser: reloaded the selected-change prompt and verified its wording. The completed ending and saved visit order remained intact while new attempts were unfinished.
- No browser console errors observed during these checks.

Core lesson vocabulary, choices, and scoring outcomes are unchanged. No profiles were deleted. No native packages, release tags, or desktop workflows were created.
