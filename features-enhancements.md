# Shravana App — Features & Enhancements

## Current State

Well-built single-screen Expo app — 21 bundled mantras, timer/repetition modes, bilingual EN/Tamil UI, clean component structure. Solid v1 foundation.

---

## Features & Enhancements (Prioritized)

### High Impact / Low Effort (ship with v1 or v1.1)

| # | Feature | Why |
|---|---------|-----|
| 1 | **Lock screen / notification controls** | Play/Pause from notification tray — expected in any audio app |
| 2 | **Progress bar on player** | Users want to see where in the mantra they are |
| 3 | **Volume slider** | Basic UX expectation |
| 4 | **Mantra lyrics / text display** | Show Sanskrit/Tamil text while playing — very high value for devotional users |
| 5 | **Mantra meaning / description** | One-paragraph description of each mantra — educational |
| 6 | **Favorites / bookmark** | Quick access to frequently used mantras |
| 7 | **Last played persistence** | Remember last song across app restarts (AsyncStorage) |
| 8 | **Fix i18n** | The `i18n/en.ts` and `i18n/ta.ts` files are empty — Tamil UI strings need to be wired up |

### Medium Impact (v1.x)

| # | Feature | Why |
|---|---------|-----|
| 9 | **Daily reminder / alarm** | "Play Gayatri at 6am daily" — meditation apps live by this |
| 10 | **Chant counter (Japa mala tracker)** | Track how many times user has chanted in a session/lifetime |
| 11 | **Session history** | Log past sessions (mantra, duration, date) |
| 12 | **Sleep timer** | "Stop after 30 min" independent of repetition mode |
| 13 | **Categories / filters in drawer** | Group mantras by deity (Shiva, Vishnu, Ganesha, etc.) |
| 14 | **Search in song drawer** | Already has placeholder? — wire it up if not |
| 15 | **Haptic feedback on play/stop** | `expo-haptics` is already installed, just not wired up |
| 16 | **Share mantra** | "I'm chanting X today" — social sharing |
| 17 | **iOS support** | `eas.json` only has Android builds configured |

### Bigger / Future (v2)

| # | Feature | Why |
|---|---------|-----|
| 18 | **Custom background sounds** | Add rain / temple bells ambience layer |
| 19 | **Widget (Android/iOS)** | Mantra of the day or quick-play widget |
| 20 | **More languages** | Hindi, Telugu, Kannada (existing i18n structure supports this) |
| 21 | **Offline stats / streaks** | "7-day chanting streak" — engagement hook |
| 22 | **Apple Watch / Wear OS companion** | Japa counter on wrist |

---

## Quick Wins to Ship Before v1 Release

1. **Wire up haptics** — `expo-haptics` is already installed, just call `Haptics.impactAsync()` on Play/Stop/Select
2. **Persist last selected song** — 5 lines of AsyncStorage code
3. **Fix the i18n gap** — Tamil translations are empty files right now
4. **Add mantra descriptions to `songs.ts`** — data change only, no new components
5. **Lock screen media controls** — `expo-audio` with background mode already configured, just needs `AudioSession` metadata (title, artwork)

---

## Legal: Bundled Audio Files

**This is a real concern.** Mantras themselves (the Sanskrit/Tamil text) are ancient and in the public domain. But the audio recordings are not. Whoever recorded, produced, and mixed these MP3s holds copyright — typically for 70 years from creation.

### What to Check For Each File

| Source Type | Legally Usable? |
|-------------|----------------|
| You recorded it yourself | Yes |
| Commissioned from a musician with license grant | Yes (get it in writing) |
| Creative Commons (CC0, CC-BY, CC-BY-SA) | Yes (follow license terms) |
| Downloaded from a free devotional site | **Risky — "free" ≠ license to redistribute** |
| Ripped from a published album (e.g., T-Series) | **No — clear copyright infringement** |
| YouTube download | **No — violates YouTube ToS + likely copyrighted** |

### For App Store Distribution (v1 goal)

Both Google Play and Apple App Store require you to have rights to all bundled content. Distributing without rights can get the app removed and result in a DMCA takedown.

### Recommended Path

1. **Audit each MP3's source** — where did it come from?
2. For uncertain ones: replace with recordings from [archive.org](https://archive.org) (search "mantra" under Creative Commons), or sites like Naadbrahma, Stotram.org (check individual licenses)
3. Consider commissioning clean recordings — for 21 short mantras a studio musician may charge $200–500 total
4. Add a credits section in the app listing the source/license for each audio
