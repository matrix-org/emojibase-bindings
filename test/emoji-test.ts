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
      EMOJI.every((emoji) => emoji.shortcodes.pop() !== undefined)
    ).toBeTruthy();
  });

  it("that we can get an emoji by unicode", async () => {
    expect(getEmojiFromUnicode("🙂")?.hexcode).toBe("1F642");
  });
});

describe("Emoticons", () => {
  it("should return an emoji", async () => {
    expect(EMOTICON_TO_EMOJI.get(":)")?.hexcode).toBe("1F642");
  });
});
