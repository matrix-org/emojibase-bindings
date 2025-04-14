#!/bin/bash

set -e

MAX_EMOJI_VERSION_ANDROID=15.1
MAX_EMOJI_VERSION_IOS=16.0

EMOJIJSON_FILE="build/emojibase.json"
KOTLIN_PATH="platforms/android/library/src/main/assets"
SWIFT_PATH="platforms/ios/Emojibase/Resources"

# generate android json
export MAX_EMOJI_VERSION=$MAX_EMOJI_VERSION_ANDROID
yarn start
mkdir -p "$KOTLIN_PATH" && cp "$EMOJIJSON_FILE" "$KOTLIN_PATH"

# generate ios json
export MAX_EMOJI_VERSION=$MAX_EMOJI_VERSION_IOS
yarn start
cp "$EMOJIJSON_FILE" "$SWIFT_PATH"
