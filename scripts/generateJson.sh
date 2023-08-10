#!/bin/bash

set -e

yarn start

EMOJIJSON_FILE="build/emojibase.json"
SWIFT_PATH="platforms/ios/Emojibase/Resources/emojibase.json"
KOTLIN_PATH="platforms/android/library/src/main/assets/emojibase.json"

cp "$EMOJIJSON_FILE" "$SWIFT_PATH"
mkdir -p "$KOTLIN_PATH" && cp "$EMOJIJSON_FILE" "$KOTLIN_PATH"