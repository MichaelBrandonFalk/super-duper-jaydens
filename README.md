# Super Duper Jaydens!

An original superhero project-management learning game. Help Jayden, Mika, and Bolt build a Hero Hub, launch a city beacon, and hand over a new Signal Rover. Twelve illustrated city missions teach through story, worked examples, and hands-on activities before a five-scene capstone.

Play: https://michaelbrandonfalk.github.io/super-duper-jaydens/

## What is included

- An opening comic before issue 1; original 1990s superhero-animation-inspired production art and a midnight/burgundy/amber/teal interface.
- Thirteen core mission activity structures: project sorting, stakeholder needs, scope, work breakdown, task sequencing, capacity, budget, a real WIP-limited board, risk backups, test/fix/retest, change decisions, a measured improvement, and integrated delivery.
- Thirteen visible field-tool decisions, a priority signal and functional starting gadget, a plan book populated automatically from actual working plans, and a player-directed delivery ending.
- Three credited Kevin MacLeod background recordings and a separate orchestral finishing theme, sound settings and next-track control, quiet support, narration ducking, and original radio/paper/confirmation effects.
- Keyboard and touch controls without dragging, bigger text, contrast, fewer pictures, reduced motion, read-aloud, rest breaks, five optional local players, and a twice-confirmed restart.
- Adult learning notes connecting the ideas to MBA topics; readable, printable source credits.

## Run and build

The game has no runtime framework, remote fonts, analytics, or external media dependencies. Use a modern browser with JavaScript enabled.

```sh
npm start
npm test
npm run build
```

Open http://localhost:4190/ for source, or http://localhost:4190/dist/ after building. Deploy the static files in `dist/`, or publish the repository root with `.nojekyll`. GitHub Pages uses HTTPS, which supports player IDs and browser speech where available.

## Curriculum and commercial use

See [the curriculum and license audit](docs/CURRICULUM.md). CC BY is not public domain. Attribution is kept in the game; NonCommercial sections and third-party textbook media are excluded. The original game is not a publisher-endorsed course, professional certification, or MBA qualification.

The repository is public for review and version control. Public visibility does not grant a blanket open-source license to the original game. See [rights and third-party notices](LICENSE.md).

## Asset sources

[Art direction, exact prompts, and arm-continuity edits](docs/ART-DIRECTION.md) record the original illustration process. Soundtrack licenses, sources, and mastering changes are in [sound credits](docs/AUDIO.md). The historical original-score generator remains in scripts/compose.py but its recordings are not used in 1.1.0. Optimized art is tracked; local source PNGs and working outputs are excluded from web builds.

## Mission consequences and deeper operations

Tested operational choices can add shifts and reduce the rover’s first-day route. Replaying a mission replaces its report, letting players see how improved plans change the outcome. Pull replenishment, jidoka, andon, error-proofing, repeated PDCA trials, explicit workflow policies, and four kanban flow metrics connect the story to further professional study.

## Version 1.2.0: a city the player changes

Every mission has a field job and a choice of two single-use tools. Tools can solve different later jobs; spending one prevents using it elsewhere until that job is replanned. Five supply packs, two starting-gadget uses, crew shifts, and deferral create real alternatives. The hero kit shows each tool’s status and where it was used.

Thirteen visible upgrades open the city. District routes depend on specific working links. The map bench opens fourth stops, the workshop recovers a supply pack, and the test bay recovers a shift. Complete early workshop plans can also produce rework instead of requiring a prescribed answer. Players assign available route slots across three neighborhoods and see which deliveries arrive or wait until tomorrow. The initial priority signal reserves an available first stop in its neighborhood.

Replanning replaces a saved decision and releases its former resources; it does not create duplicate tools or spend supplies twice. Existing progress remains saved.
