# emojibase-bindings

Kotlin, Swift and Web bindings for emojibase json.

### Requirements

- Node LTS
- Yarn Classic

### Installation

Run `./scripts/setup.sh` to install dependencies for this project.

### Generating the emojibase.json

Run `./scripts/generateJson.sh` to generate the emojibase.json assets

## Updating Emoji Version

1. Update the emojibase `emojibase` version in a [package.json](package.json) to one that support the required emoji version.
2. To update the emoji version web uses change `MAX_EMOJI_VERSION_WEB` in [src/emoji.ts](src/emoji.ts)(Element Web imports this file directly).
   - **caveat**: This version should be changed in unison with the twemoji verison so that all emojis displayed in the picker can actually be rendered.
3. To update the emoji version iOS or Android use change `MAX_EMOJI_VERSION_ANDROID` or `MAX_EMOJI_VERSION_IOS` respectively in [scripts/generateJson.sh](scripts/generateJson.sh)(This script generates the `emojibase.json` file packaged with the iOS and Android packages)

## Releasing

Use "[Run workflow](https://github.com/matrix-org/emojibase-bindings/actions/workflows/release.yaml)".
Refer to [SemVer](https://semver.org/) for versioning semantics.
This workflow will bump the version, publish to NPM/Maven and create a GitHub release.
The Swift consumer uses [SwiftPM](./Package.swift) and can target the latest released version.
