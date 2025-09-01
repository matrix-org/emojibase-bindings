package io.element.android.emojibasebindings

import com.squareup.moshi.Json
import com.squareup.moshi.JsonClass
import kotlinx.collections.immutable.ImmutableList
import kotlinx.collections.immutable.ImmutableMap
import kotlinx.collections.immutable.toImmutableList

data class EmojibaseStore(
    val categories: ImmutableMap<EmojibaseCategory, ImmutableList<Emoji>>
) {
    val allEmojis: ImmutableList<Emoji> by lazy {
        categories.values.flatten().toImmutableList()
    }
}

fun EmojibaseStore.emojisFor(category: EmojibaseCategory): ImmutableList<Emoji>? {
    return categories[category]
}

@JsonClass(generateAdapter = true)
data class Emoji(
    val hexcode: String,
    val label: String,
    val tags: ImmutableList<String>?,
    val shortcodes: ImmutableList<String>,
    val unicode: String,
    val skins: ImmutableList<EmojiSkin>?
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