# Version 1.3.1 desktop verification

Checked November 20, 2026 (America/Phoenix).

## Automated and native checks

- Thirty-five local automated tests passed, including protocol confinement, external URL policy, consistent installer/version naming, complete download-manifest validation, the installed update screen, and the one-DMG Mac download layout.
- GitHub workflow 44860057423 passed all jobs. Its tagged source ran thirty-three tests per platform; two additional download-view regression tests were added locally afterward.
- Packaged Windows x64, Linux x64, and macOS universal apps passed hidden startup checks: home rendered, Node was unavailable to the renderer, local storage round-tripped, bundled art/scripts/audio loaded, audio metadata decoded, and no remote content was requested by the startup check.
- The Windows portable EXE wrapper completed its startup check.
- The Linux .deb installed on Ubuntu 24.04 (the Mint 22 base) and its installed application passed the same offline startup test. This is a Mint-base compatibility check, not testing every Mint desktop/hardware combination.
- An initial local v1.3.0 Mac universal build was inspected (the final v1.3.1 universal app passed CI startup): x86_64 and arm64 architectures, macOS 13.0 minimum, versioned DMG, valid ad-hoc signature. No Developer ID certificate or Apple notarization is claimed.
- Published GitHub asset sizes and SHA-256 digests match all five downloads.json records.

## Website checks

- Home and footer download navigation opens the new page.
- Ready catalog shows Windows Setup, one universal Mac DMG, Mint .deb, and separate Windows/Linux portable options. Every button and filename shows v1.3.1.
- The complete page at 320px has no horizontal document overflow. No console errors were observed in these interactions.
- The catalog is published only after all native and Mint-base checks pass; future tagged builds update it automatically.

Website and desktop saves remain separate. Updating the installed app uses its existing user-data directory. Read-aloud depends on installed system voices.
