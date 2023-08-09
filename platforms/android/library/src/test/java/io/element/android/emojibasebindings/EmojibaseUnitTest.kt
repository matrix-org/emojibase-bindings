package io.element.android.emojibasebindings

import org.junit.Test

import org.junit.Assert.*
import org.junit.Before

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class EmojibaseUnitTest {

    lateinit var store: EmojibaseStore

    @Before
    fun setUp() {
        store = EmojibaseDatasource().load()
    }

    @Test
    fun testSpecificEmoji() {
        assertEquals(store.categories.size, EmojibaseCategory.values().size)
        val people = store.emojisFor(EmojibaseCategory.People)
        assertNotNull(people)
        val emoji = people?.first { it.label == "OK hand" }
        assertEquals(emoji?.tags, listOf("hand", "ok"))
        assertEquals(emoji?.shortcodes, listOf("ok_hand"))
        assertEquals(emoji?.skins?.size, 5)
        assertEquals(emoji?.skins?.last()?.unicode, "👌🏿")
    }
}