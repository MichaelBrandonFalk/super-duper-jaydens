# Instructions and consequences · v1.4.3

Reviewed November 23, 2026. Web only; desktop releases remain paused.

Checked the current instructions, choice labels, result generators, activity transitions, and saved summaries. Preserved the project-management terms and existing story choices.

The kanban practice now reports deliveries and replenishment separately. Sending all six boxes does not imply that the final two-box buffer is ready. An empty buffer needs replenishment before the next visit; excess stock is also identified. Instructions explain that service continues after the four practice rounds.

The finale states Mika’s available time, Jayden’s lack of time, the panel’s three-token cost, and the money used by each choice. Printer practice identifies its six-card batch before the decision. Changing a printer response or helper assignment clears old feedback. Completing the work board directs the player to the library practice. Budget records identify reserve before the replacement test; token labels use singular where appropriate. Improvement rounds count fetching and delivery trips for the same number of cards.

## Verification

- 52 automated tests pass, including all-deliveries-sent cases with final buffers of zero, two, and three boxes.
- Static build, JavaScript syntax check, and whitespace check pass.
- Browser: completed all four work-board jobs and verified the next-step message.
- Browser: packed 1, 2, 1, 0 boxes. The result showed six deliveries sent, an empty buffer, and a Stock review instead of a false successful stock result.
- Browser: changed from continuing the faulty printer to stopping it. The old review disappeared; fitting and testing the holder produced feedback about a straight test card.
- Browser: replayed the first two finale scenes and verified that scene three uses explicit time and spending descriptions.

Saved history remains unchanged until the player tests a replacement plan. No player profiles were deleted. No native packages, tags, or desktop workflows were created.
