/*
Copyright 2024 The Matrix.org Foundation C.I.C.

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

import {
  DATA_BY_CATEGORY,
  EMOJI,
  EMOTICON_TO_EMOJI,
  getEmojiFromUnicode,
} from "../src/emoji";

describe("Emojis", () => {
  it("specific emoji", async () => {
    const people = DATA_BY_CATEGORY.people;
    const emoji = people.find((emoji) => emoji.label == "OK hand");
    expect(emoji?.tags).toStrictEqual(["hand", "ok"]);
    expect(emoji?.shortcodes).toStrictEqual(["ok_hand"]);
    expect(emoji?.skins?.length).toBe(5);
    expect(emoji?.skins?.slice(-1)?.pop()?.unicode).toBe("👌🏿");
  });

  it("that all emojis have shortcodes", async () => {
    expect(
      EMOJI.every((emoji) => emoji.shortcodes.pop() !== undefined),
    ).toBeTruthy();
  });

  it("that we can get an emoji by unicode", async () => {
    expect(getEmojiFromUnicode("🙂")?.hexcode).toBe("1F642");
  });

  it("that emojis with version greater than MAX_EMOJI_VERSION_WEB are not included", async () => {
    expect(getEmojiFromUnicode("🙂‍↔️")?.hexcode).toBeUndefined();
  });

  it("that emojis emojis with version===1 should work", async () => {
    expect(EMOJI.find((emoji) => emoji.hexcode == "1F1E6")?.label).toBe('regional indicator A');
  });
});

describe("Emoticons", () => {
  it("should return an emoji", async () => {
    expect(EMOTICON_TO_EMOJI.get(":)")?.hexcode).toBe("1F642");
  });

  it("should include emoticon variations", async () => {
    expect(EMOTICON_TO_EMOJI.get("=-]")?.emoticon).toBe(":)");
  });
});
