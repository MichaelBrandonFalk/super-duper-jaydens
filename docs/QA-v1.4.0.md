# Simpler adventure review: web v1.4.0

Reviewed November 23, 2026. Desktop builds remain paused.

## Changes

Removed the global tool inventory, matching-tool requirements, single-use supplies, gadget power, city-upgrade gates, route-slot calculations, and delivery penalties. The opening no longer asks players to understand those systems. Team color is cosmetic.

Each completed lesson offers two direct story actions with a visible outcome. Choices do not spend resources or affect which future actions are allowed. The previous choice is remembered in the next chapter and all chosen outcomes can be revisited in the ending. The plan book retains tested curriculum work and adds the new story choices.

The ending asks which neighborhood to visit first. Every option visits all three neighborhoods in a different order. Completion plays the celebration theme. Changing the first visit and reloading preserve the chosen order.

The budget, capacity, and kanban lessons retain quantities because they teach actual concepts. These are local practice models, not adventure currencies. The kanban practice packs boxes of pencils; unfilled replacement requests remain visible so a player can refill the buffer after underproducing.

## Verification

- 46 automated checks passed, including four new story/ending/save checks. Historical inventory tests remain only for compatibility with saved data; the current UI does not use that system.
- Tested all 13 story-choice sections through browser controls using an older player with existing inventory records. Every section offered two usable actions without resource controls, and each selection showed its result.
- Tested all three first-visit choices. Each visited all three neighborhoods, with the selected one first. The selection survived reload.
- Verified the map has no supply, power, upgrade, priority, or route-slot counters and no horizontal overflow at the narrow viewport.
- Verified the revised opening asks only for a team color.
- Tested the kanban board and a deliberately underfilled first request. The next card asked for the outstanding boxes; the result accurately recorded five boxes sent and one waiting.
- Core lesson definitions and the shared Clear path, Message desk, and Quiet space labels are retained. Existing completed lessons and tested plans remain saved.
