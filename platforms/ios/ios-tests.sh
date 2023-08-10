#!/bin/bash

set -eo pipefail

xcodebuild test \
  -scheme Emojibase \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 14,OS=16.2'