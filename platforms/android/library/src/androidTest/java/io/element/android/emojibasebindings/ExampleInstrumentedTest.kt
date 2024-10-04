package io.element.android.emojibasebindings

import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.ext.junit.runners.AndroidJUnit4

import org.junit.Test
import org.junit.runner.RunWith

import org.junit.Assert.*
import org.junit.Before

/**
 * Instrumented test, which will execute on an Android device.
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
@RunWith(AndroidJUnit4::class)
class ExampleInstrumentedTest {

    private lateinit var store: EmojibaseStore

    @Before
    fun setUp() {
        val appContext = InstrumentationRegistry.getInstrumentation().targetContext
        store = EmojibaseDatasource().load(appContext)
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

    @Test
    fun testAllEmojisHaveShortcodes() {
        assert(store.allEmojis.all{ it.shortcodes.isNotEmpty() })
    }

    @Test
    fun testSupportsEmoji151() {
        // Check 🙂‍↔️ emoji is present
        assertEquals(store.allEmojis.firstOrNull{ it.hexcode == "1F642-200D-2194-FE0F" }?.label, "head shaking horizontally")
    }
}