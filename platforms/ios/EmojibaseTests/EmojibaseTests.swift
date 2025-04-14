/*
Copyright 2023 The Matrix.org Foundation C.I.C.

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
import XCTest
@testable import Emojibase

final class EmojibaseTests: XCTestCase {
    
    var store: EmojibaseStore?
    
    override func setUp() async throws {
        self.store = try? await EmojibaseDatasource().load()
    }
    
    func testSpecificEmoji() async throws {
        let store = try XCTUnwrap(store)
        XCTAssertEqual(store.categories.count, EmojibaseCategory.allCases.count)
        let people = try XCTUnwrap(store.emojisFor(category: .people))
        let emoji = try XCTUnwrap(people.first(where: { $0.label == "OK hand" }))
        let tags = try XCTUnwrap(emoji.tags)
        XCTAssertEqual(tags, ["awesome", "bet", "dope", "fleek", "fosho", "got", "gotcha", "hand", "legit", "ok", "okay", "pinch", "rad", "sure", "sweet", "three"])
        let shortcodes = try XCTUnwrap(emoji.shortcodes)
        XCTAssertEqual(shortcodes, ["ok_hand"])
        let skins = try XCTUnwrap(emoji.skins)
        XCTAssertEqual(skins.count, 5)
        XCTAssertEqual(skins.last?.unicode, "👌🏿")
    }
    
    func testAllEmojisHaveShortcodes() async throws {
        let store = try XCTUnwrap(store)
        //All emojis have a shortcode
        XCTAssertTrue(store.allEmojis.allSatisfy({ $0.shortcodes.first != nil }))
    }
    
    func testSupportsEmoji16() async throws {
        let store = try XCTUnwrap(store)
        // Check 🪾 emoji is present
        XCTAssertEqual(store.allEmojis.first(where: {$0.hexcode == "1FABE"})?.label, "leafless tree")
    }
}
