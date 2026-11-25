# Painted artwork revision · v1.5.1

The browser equipment illustrations and Hero Hub now use the same painted cel-animation treatment as the existing chapter scenes: textured surfaces, confident ink contours, brass fittings, indigo shadows, and amber lighting. The flat equipment drawings and schematic hub were replaced.

The built-in `image_gen.imagegen` tool generated the artwork from the game's existing cover and chapter illustrations as style references. The hub workbench was then edited with the same tool to leave room for the player's chosen parts. The full [generation and edit prompts](ART-PROMPTS-v1.5.1.json) are saved alongside these notes. No fallback API or CLI image-generation workflow was used.

## Saved artwork files

- [Equipment sheet](../assets/art/equipment-painted.webp): 16 painted props in a transparent 4 × 4 sheet. Includes map, radio, tools, stopwatch, tokens, crates, work board, umbrella, scanner, drone, checklist, street sign, book rover, spare parts, chair, and message console.
- [Hub choice sheet](../assets/art/hub-props-painted.webp): nine transparent painted details for the two street-sign choices, two map choices, two workbench choices, two welcome-sign designs, and the agreed landing pad.
- [Finished hub](../assets/art/hub-painted.webp) and [smaller finished hub](../assets/art/hub-painted-small.webp).
- [Architectural plan](../assets/art/hub-plan-painted.webp) and [smaller architectural plan](../assets/art/hub-plan-painted-small.webp).
- [Reviewed file manifest](../assets/art/painted-manifest.json): dimensions, file sizes, atlas layout, and SHA-256 hashes.

The original generated PNGs are also retained locally in `assets/art/*-original.png`. They are excluded from the website build. WebP conversion preserves transparency for both sheets. The background uses responsive 960- and 1536-pixel files; each equipment illustration shares one cached sheet rather than a separate request.

## Integration and verification

The sign, map, workbench parts, welcome design, and saved landing-pad decision remain driven by the player's existing choices. Painted details are positioned at the scene's wall, tabletop, sign mount, and courtyard. A plan image is used before the hub is built; the finished scene appears after the hub lesson. Characters were not added on top of existing characters. Only small painted portraits appear within the optional team welcome sign.

Both groups of choices were checked in the local browser preview at the narrow layout and desktop breakpoint. The team sign was fitted within its mounting area. All 26 lesson and activity pages were checked for equipment rendering and overflow. The fresh-player planning stage was checked separately from the completed hub. Fewer pictures still hides the artwork while retaining captions, choice records, and controls. No browser console errors were observed.

76 automated tests pass, including reviewed asset hashes, complete atlas mappings, plan-versus-built rendering, and saved-choice descriptions. Static build, JavaScript syntax checks, and whitespace checks pass.

This is a browser-only release. Download files and their catalog remain at v1.4.9. No native build or release tag was created.
