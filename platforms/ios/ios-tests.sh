#!/bin/bash

set -eo pipefail

xcodebuild test \
  -scheme Emojibase \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 15,OS=17.2'