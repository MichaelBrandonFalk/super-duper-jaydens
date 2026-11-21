# Desktop editions and releases

## Downloads

The game’s Downloads page reads the checked-in downloads.json catalog. Only a complete set of tested release files creates live buttons. Each filename includes its version.

- Windows x64: Setup.exe installer, plus a portable EXE.
- macOS: one universal DMG for Apple silicon and Intel.
- Linux Mint x64: .deb installer, plus an AppImage for running without installation.

The desktop app bundles the game, illustrations, music, and credits. It loads local assets through the secure jaydens://game origin, uses a sandboxed renderer without Node integration, and blocks remote content inside the game. Source links and updates open in the system browser.

Players are saved in the app’s normal user-data directory. Updating the app keeps that location. Website and desktop saves are separate. Portable here means the program can run without installation; saves stay on the computer, rather than being forced into a USB folder.

## Installation limits

These community builds are not signed with a developer certificate or Apple-notarized. Operating systems can show verification prompts or block first launch. The download page states this; the web game remains available. Read-aloud depends on installed system voices.

The .deb includes GTK, audio, NSS, and related runtime dependencies with alternatives for the Mint 21/22 Ubuntu package families. CI builds on Ubuntu 22.04 and installs/tests the package on the Ubuntu 24.04 base used by Mint 22. That is a base-compatibility check, not a claim of testing every Mint desktop and hardware combination. AppImages may need a FUSE compatibility package; .deb is the primary Mint download.

## Build locally

```sh
npm ci
npm exec -- install-electron --no
npm test
npm run desktop:build -- --mac --universal
node scripts/desktop-smoke.mjs
```

Build Windows on a Windows runner and Linux on a Linux runner with the matching --win --x64 or --linux --x64 flags. Desktop binaries and generated build/icon.png are ignored by Git.

## Publish the next version

1. Run npm run release:version -- 1.4.0 (substitute the new version). This updates package metadata, the app footer, cache-versioned imports, and the shared version constant.
2. Run npm test and npm run build. Commit and push the source to main.
3. Tag that commit v1.4.0 and push the tag.
4. The desktop workflow builds and smoke-tests each operating-system package, then checks installation on the Mint 22 base.
5. On success, it publishes versioned release assets and SHA256SUMS.txt, commits downloads.json, and requests a Pages rebuild.

The catalog stays on the last tested release while a new build runs. If main has already moved to another version, the older release can publish without replacing the newer website’s catalog. Never reuse an existing version tag for changed builds.
