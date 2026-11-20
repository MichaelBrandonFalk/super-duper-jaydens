# Sound design

All scores and effects are original to Super Duper Jaydens! No commercial song, superhero theme, recording, sampled orchestra, or third-party sound-effect library is used.

The goal is a hopeful 1990s superhero-animation atmosphere at reading volume: dark-city warmth, heroic melodic identity, brass-like leads, strings, bells, a rhythmic electric color, and controlled radio/gadget cues. There are no alarm sirens, combat sounds, jump scares, or punitive error buzzers.

## Scores

1. Signal City Overture: 123 seconds. Warm brass-like lead, string pulses, walking foundation, and a recurring original major-key motif.
2. Above the Skyline: about 95 seconds. A different six-beat string melody with bell-like accompaniment.
3. Dispatch Radio: about 114 seconds. Rhythmic synthesized electric lead and bass, with quiet percussion and a separate melody.
4. Light the Beacons: about 105 seconds. Broad brass-and-string phrases with more space between them.
5. A City Made Together: about 45 seconds. A separate closing theme for the accepted and handed-over Signal Rover. It is not part of the ordinary rotation.

The ordinary playlist runs for over seven minutes before returning to its first track. Tracks have different melodies, meters or phrasing, instrument palettes, and arrangements. Each file is rendered with a -20 LUFS loudness target and -2 dBTP ceiling. Playback volume is lower by default and remains adjustable.

Music starts after a user gesture and follows the current player’s saved choice. Quiet is always allowed. Next track is available in Sound. Background music ducks during requested narration and stops while taking a break or hiding the browser tab. The special finishing theme follows the music preference, replaces the normal track, and does not auto-play simply because a completed ending was reloaded.

Effects use a short filtered radio click, a soft noise-based panel/paper sweep, and a brief filtered major confirmation phrase. Effects follow their own setting and do not run during narration or in a hidden tab.

Regenerate recordings with Python + NumPy and ffmpeg via `scripts/compose.py`. Runtime effects and playback are in `audio.js`. File hashes and exact durations are recorded in `assets/audio/manifest.json`.
