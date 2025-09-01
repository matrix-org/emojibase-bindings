package io.element.android.emojibasebindings

import android.content.Context
import com.squareup.moshi.JsonDataException
import com.squareup.moshi.Moshi
import com.squareup.moshi.Types
import dev.zacsweers.moshix.adapters.immutable.ImmutableCollectionsJsonAdapterFactory
import kotlinx.collections.immutable.ImmutableList
import kotlinx.collections.immutable.ImmutableMap
import okio.buffer
import okio.source
import java.io.IOException

class EmojibaseDatasource {

    @Throws(IOException::class)
    fun load(context: Context): EmojibaseStore {
        val inputStream = context.assets.open("emojibase.json")
        val jsonBuffer = inputStream.source().buffer()
        val moshi = Moshi.Builder().add(ImmutableCollectionsJsonAdapterFactory()).build()
        val type = Types.newParameterizedType(
            ImmutableMap::class.java,
            EmojibaseCategory::class.java,
            Types.newParameterizedType(
                ImmutableList::class.java,
                Emoji::class.java
            )
        )
        val adapter = moshi.adapter<ImmutableMap<EmojibaseCategory, ImmutableList<Emoji>>>(type)
        return adapter.fromJson(jsonBuffer)?.let { EmojibaseStore(categories = it) }
            ?: throw JsonDataException("Failed to parse emojibase.json")
    }
}