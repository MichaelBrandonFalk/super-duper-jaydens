# Super Duper Jaydens!

An original superhero project-management learning game. Help Jayden, Mika, and Bolt build a Hero Hub, launch a city beacon, and hand over a new Signal Rover. Twelve illustrated city missions teach through story, worked examples, and hands-on activities before a five-scene capstone.

Play: https://michaelbrandonfalk.github.io/super-duper-jaydens/

## What is included

- An opening comic before issue 1; original 1990s superhero-animation-inspired production art and a midnight/burgundy/amber/teal interface.
- Thirteen different activity structures: project sorting, stakeholder needs, scope, work breakdown, task sequencing, capacity, budget, a real WIP-limited board, risk backups, test/fix/retest, change decisions, a measured improvement, and integrated delivery.
- Small optional story detours, a saved signal color and helper gadget, a plan book populated automatically from actual working plans, and a personalized ending.
- Four original music tracks and a separate finishing theme, sound settings and next-track control, quiet support, narration ducking, and original radio/paper/confirmation effects.
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

[Art direction, exact prompts, and arm-continuity edits](docs/ART-DIRECTION.md) record the original illustration process. `scripts/compose.py` contains the original score and synthesis code. It requires NumPy and ffmpeg only for regenerating recordings; no audio-generation dependencies are needed to play or build. Optimized art is tracked; local source PNGs and working outputs are excluded from web builds.
