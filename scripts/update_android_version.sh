#!/usr/bin/env bash

if (($# != 1)); then
  echo "There should be a single version argument passed."
  exit 1
fi

if [[ "$OSTYPE" == "darwin"* ]]; then
  if ! command -v gsed &> /dev/null; then
    echo "GNU-SED not found. Please install it using `brew install gnu-sed`."
    exit 1
  fi
  SED_CMD='gsed -i'
else
  SED_CMD="sed -i"
fi

VERSION=$1

GRADLE_PROPERTIES_REGEX="s/^VERSION_NAME=.*$/VERSION_NAME=$VERSION/g"

echo "Updating Android"
$SED_CMD "$GRADLE_PROPERTIES_REGEX" ./platforms/android/gradle.properties