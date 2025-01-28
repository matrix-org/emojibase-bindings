/*
Copyright 2019-2024 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import EMOJIBASE from "emojibase-data/en/compact.json";
import SHORTCODES from "emojibase-data/en/shortcodes/iamcal.json";
import VERSIONS from "emojibase-data/versions/emoji.json";
import { CompactEmoji, generateEmoticonPermutations } from "emojibase";

export interface Emoji extends Omit<CompactEmoji, "shortcodes"> {
  // We generate a shortcode based on the label if none exist in the dataset
  shortcodes: string[];
}

const MAX_EMOJI_VERSION_WEB = 15.1;

// The unicode is stored without the variant selector
const UNICODE_TO_EMOJI = new Map<string, Emoji>(); // not exported as gets for it are handled by getEmojiFromUnicode
export const EMOTICON_TO_EMOJI = new Map<string, Emoji>();

export const getEmojiFromUnicode = (unicode: string): Emoji | undefined =>
  UNICODE_TO_EMOJI.get(stripVariation(unicode));

const isRegionalIndicator = (x: string): boolean => {
  // First verify that the string is a single character. We use Array.from
  // to make sure we count by characters, not UTF-8 code units.
  return (
    Array.from(x).length === 1 &&
    // Next verify that the character is within the code point range for
    // regional indicators.
    // http://unicode.org/charts/PDF/Unicode-6.0/U60-1F100.pdf
    x >= "\u{1f1e6}" &&
    x <= "\u{1f1ff}"
  );
};

const EMOJIBASE_GROUP_ID_TO_CATEGORY = [
  "people", // smileys
  "people", // actually people
  "control", // modifiers and such, not displayed in picker
  "nature",
  "foods",
  "places",
  "activity",
  "objects",
  "symbols",
  "flags",
];

export const DATA_BY_CATEGORY: Record<string, Emoji[]> = {
  people: [],
  nature: [],
  foods: [],
  places: [],
  activity: [],
  objects: [],
  symbols: [],
  flags: [],
};

// The MAX emoji version to be included in exported data.
// This can be present as an env variable when it is being run for the mobile context.
// We support setting a max emoji version so that we can upgrade emojibase for its library
// features but not force a version on all platforms. Web for example needs to be upgraded
// in unison with twemoji.
const MAX_EMOJI_VERSION: number =
  parseFloat(<string>process.env.MAX_EMOJI_VERSION) || MAX_EMOJI_VERSION_WEB;

// The compact version of emojibase does not have version stored on the emoji object
// but there does existing a map of version to emoji.
// Create a map of emoji to version so that we can lookup an emoji version and filter.
const EMOJI_TO_VERSION = new Map<string, number>();
for (const [versionString, emojis] of Object.entries(VERSIONS)) {
  const version = parseFloat(versionString);
  emojis.forEach((emoji) => EMOJI_TO_VERSION.set(emoji, version));
}

// Store various mappings from unicode/emoticon/shortcode to the Emoji objects
export const EMOJI: Emoji[] = EMOJIBASE.filter((emojiData) => {
  // filter emojis that are less than or equal to MAX_EMOJI_VERSION
  const version = EMOJI_TO_VERSION.get(emojiData.hexcode);
  return version !== undefined && version <= MAX_EMOJI_VERSION;
}).map((emojiData) => {
  // If there's ever a gap in shortcode coverage, we fudge it by
  // filling it in with the emoji's CLDR annotation
  const shortcodeData = SHORTCODES[emojiData.hexcode] ?? [
    emojiData.label.toLowerCase().replace(/\W+/g, "_"),
  ];

  const emoji: Emoji = {
    ...emojiData,
    // Homogenize shortcodes by ensuring that everything is an array
    shortcodes:
      typeof shortcodeData === "string" ? [shortcodeData] : shortcodeData,
  };
  return emoji;
});

EMOJI.forEach((emoji) => {
  // We manually include regional indicators in the symbols group, since
  // Emojibase intentionally leaves them uncategorized
  const categoryId =
    EMOJIBASE_GROUP_ID_TO_CATEGORY[emoji.group!] ??
    (isRegionalIndicator(emoji.unicode) ? "symbols" : null);

  if (DATA_BY_CATEGORY.hasOwnProperty(categoryId)) {
    DATA_BY_CATEGORY[categoryId].push(emoji);
  }

  // Add mapping from unicode to Emoji object
  // The 'unicode' field that we use in emojibase has either
  // VS15 or VS16 appended to any characters that can take
  // variation selectors. Which one it appends depends
  // on whether emojibase considers their type to be 'text' or
  // 'emoji'. We therefore strip any variation chars from strings
  // both when building the map and when looking up.
  UNICODE_TO_EMOJI.set(stripVariation(emoji.unicode), emoji);
  if (emoji.emoticon) {
    // Add mapping from emoticon to Emoji object
    const emoticons = [emoji.emoticon]
      //flatten, in case `emoji.emoticon` is an array
      .flat()
      .flatMap((x) => generateEmoticonPermutations(x));
    emoticons.forEach((x) => EMOTICON_TO_EMOJI.set(x, emoji));
  }
});

/**
 * Strips variation selectors from the end of given string
 * NB. Skin tone modifiers are not variation selectors:
 * this function does not touch them. (Should it?)
 *
 * @param {string} str string to strip
 * @returns {string} stripped string
 */
function stripVariation(str: string): string {
  return str.replace(/[\uFE00-\uFE0F]$/, "");
}
