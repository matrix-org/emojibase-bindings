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
        assertEquals(listOf("awesome", "bet", "dope", "fleek", "fosho", "got", "gotcha", "hand", "legit", "ok", "okay", "pinch", "rad", "sure", "sweet", "three"), emoji?.tags)
        assertEquals(listOf("ok_hand"), emoji?.shortcodes)
        assertEquals(5, emoji?.skins?.size)
        assertEquals("👌🏿", emoji?.skins?.last()?.unicode)
    }

    @Test
    fun testAllEmojisHaveShortcodes() {
        assert(store.allEmojis.all{ it.shortcodes.isNotEmpty() })
    }

    @Test
    fun testSupportsEmoji16() {
        // Check 🪾 emoji is present
        assertEquals(store.allEmojis.firstOrNull{ it.hexcode == "1FABE" }?.label, "leafless tree")
    }
}