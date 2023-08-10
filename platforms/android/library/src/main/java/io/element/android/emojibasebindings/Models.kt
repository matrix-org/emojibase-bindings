package io.element.android.emojibasebindings

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass

data class EmojibaseStore(
    var categories: Map<EmojibaseCategory, List<Emoji>>
)

fun EmojibaseStore.emojisFor(category: EmojibaseCategory): List<Emoji>? {
    return categories[category]
}

val EmojibaseStore.allEmojis: List<Emoji> get() {
    return categories.values.flatten()
}

@JsonClass(generateAdapter = true)
data class Emoji(
    val hexcode: String,
    val label: String,
    val tags: List<String>?,
    val shortcodes: List<String>,
    val unicode: String,
    val skins: List<EmojiSkin>?
)

@JsonClass(generateAdapter = true)
data class EmojiSkin(
    val hexcode: String,
    val label: String,
    val unicode: String,
)

@JsonClass(generateAdapter = false)
enum class EmojibaseCategory {
    @Json(name = "people")
    People,
    @Json(name = "nature")
    Nature,
    @Json(name = "foods")
    Foods,
    @Json(name = "activity")
    Activity,
    @Json(name = "places")
    Places,
    @Json(name = "objects")
    Objects,
    @Json(name = "symbols")
    Symbols,
    @Json(name = "flags")
    Flags
}