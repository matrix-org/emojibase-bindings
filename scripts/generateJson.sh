#!/bin/bash

set -e

yarn start
cp build/emojibase.json platforms/ios/Emojibase/Resources/emojibase.json
cp build/emojibase.json platforms/android/library/src/main/assets/emojibase.json