# Super Duper Jaydens!

An original superhero project-management learning game. Help Jayden, Mika, and Bolt build a Hero Hub and hand over a new Signal Rover. Twelve illustrated city missions teach through story, worked examples, and hands-on activities before a five-scene capstone.

Play: https://michaelbrandonfalk.github.io/super-duper-jaydens/

## What is included

- An opening comic before issue 1; original 1990s superhero-animation-inspired production art and a midnight/burgundy/amber/teal interface.
- Thirteen core mission activity structures: project sorting, stakeholder needs, scope, work breakdown, task sequencing, capacity, budget, a real WIP-limited board, risk backups, test/fix/retest, change decisions, a measured improvement, and integrated delivery.
- Thirteen simple story choices with immediate results, a plan book filled from tested plans, and a choice of the rover’s first neighborhood visit. All three neighborhoods are visited.
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

Each activity explains its own results. Missing needs cause repairs, an overloaded helper needs more time, and added scope can delay a launch. Replaying a lesson replaces its tested plan. Pull replenishment, jidoka, andon, error-proofing, repeated PDCA trials, workflow policies, and flow metrics connect the story to further study.

The web game has no tool inventory, supply-pack budget, route slots, or locked delivery neighborhoods. Numbers used to teach budget, capacity, and kanban stay inside those activities. Story choices are remembered at the next place and in the ending. See CHANGELOG.md for the earlier inventory-based versions.

## Download and desktop releases

[Download for Windows, Mac, or Linux Mint](https://michaelbrandonfalk.github.io/super-duper-jaydens/#download). Installers, portable options, and checksums use explicit version numbers. The native app includes the game’s local artwork and credited music. See [desktop build and release instructions](docs/DESKTOP.md).
