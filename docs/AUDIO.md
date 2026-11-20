# Soundtrack and sound credits

Version 1.1.0 replaces the original synthesized background playlist with licensed recordings by Kevin MacLeod.

Each track is by **Kevin MacLeod (incompetech.com)**, licensed under **Creative Commons: By Attribution 4.0**: https://creativecommons.org/licenses/by/4.0/

- Cipher: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100844
- Covert Affair: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100795
- Marty Gots a Plan: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1500015
- Heroic Age: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100848

The first three form a roughly ten-minute city playlist: electric-piano groove, noir jazz, and playful orchestral planning. Heroic Age is reserved for the mission finale. This music is not public domain; retain these credits and license links with any distribution or commercial release. No composer endorsement is implied.

## Source and changes

Official catalog: https://incompetech.com/music/royalty-free/pieces.json
Official licensing information: https://incompetech.com/music/royalty-free/licenses/

The recordings were downloaded from the composer’s official catalog, normalized with a -22 LUFS target and -2 dBTP ceiling, given a 1.5-second entrance fade, and re-encoded as MP3. No melodic edits were made. File hashes, durations, source URLs, creator, license, and changes are retained in assets/audio/manifest.json.

Sound settings show the track and composer and link to credits. Volume, next track, quiet, tab pause, rest breaks, and read-aloud ducking remain available. Music starts after a gesture, follows the player’s preference, and the finale replaces rather than layers over background music.

The brief radio, paper, and confirmation effects are original Web Audio cues in audio.js. The older score generator scripts/compose.py is retained as historical source only; its recordings are not used or shipped in version 1.1.0.
