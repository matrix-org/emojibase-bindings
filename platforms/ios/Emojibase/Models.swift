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
import Foundation

public struct EmojibaseStore {
    public var categories: [String: [Emoji]]
}

public extension EmojibaseStore {
    func emojisFor(category: EmojibaseCategory) -> [Emoji]? {
        return categories[category.rawValue]
    }
    
    var allEmojis: [Emoji] {
        Array(categories.values.joined())
    }
}

public struct Emoji: Codable {
    let group: Int?
    public  let hexcode: String
    public  let label: String
    let order: Int?
    public let tags: [String]?
    public let shortcodes: [String]
    public let unicode: String
    public let skins: [EmojiSkin]?
}

public struct EmojiSkin: Codable {
    let group: Int?
    public let hexcode: String
    public let label: String
    let order: Int?
    public let unicode: String
}

public enum EmojibaseCategory: String, Codable, CaseIterable {
    case people
    case nature
    case foods
    case activity
    case places
    case objects
    case symbols
    case flags
}
