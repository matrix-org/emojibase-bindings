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

public struct EmojibaseDatasource {
    private static var jsonFile: URL? {
        Bundle.module.url(forResource: "emojibase", withExtension: "json")
    }
    
    public init() {}
    
    public func load() throws -> EmojibaseStore {
        guard let jsonDataURL = Self.jsonFile else {
            throw DatasourceError.fileNotFound
        }
        do {
            let data = try Data(contentsOf: jsonDataURL)
            do {
                let categories = try JSONDecoder().decode([String:[Emoji]].self, from: data)
                return EmojibaseStore(categories: categories)
            } catch {
                throw DatasourceError.failedToParse(error)
            }
        } catch {
            throw DatasourceError.failedToLoadData(error)
        }
    }
    
    enum DatasourceError: Error {
        case fileNotFound
        case failedToLoadData(Error)
        case failedToParse(Error)
    }
}
