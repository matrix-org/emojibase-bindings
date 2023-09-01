# emojibase-bindings
Kotlin, Swift and Web bindings for emojibase json.

### Requirements

+ Node LTS
+ Yarn Classic

### Installation

Run `./scripts/setup.sh` to install dependencies for this project.

### Generating the emojibase.json

Run `./scripts/generateJson.sh` to generate the emojibase.json assets

## Releasing

Use "[Run workflow](https://github.com/matrix-org/emojibase-bindings/actions/workflows/release.yaml)".
Refer to [SemVer](https://semver.org/) for versioning semantics.
This workflow will bump the version, publish to NPM/Maven and create a GitHub release.
The Swift consumer uses [SwiftPM](./Package.swift) and can target the latest released version.
