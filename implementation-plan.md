# Shravana App — Implementation Plan (High Impact / Low Effort)

## Dependencies to add
```
@react-native-async-storage/async-storage   → features 6, 7
@react-native-community/slider              → features 2, 3
```

---

## Feature 1 — Lock screen / notification controls
**What:** Song title + artwork appear in the OS notification tray and lock screen while playing.

**Files changed:**
- `hooks/useAudioPlayer.ts` — call `player.updateNowPlayingInfo({ title, artist, artwork })` inside `loadAndPlay` after `player.replace()`

**Approach:** `expo-audio`'s player object exposes `updateNowPlayingInfo`. We pass the song title, `"Shravana"` as artist, and the bundled image URI. Background mode is already configured — this is just adding metadata.

**Risk:** `artwork` must be a URI string, not a `require()` reference. We'll use `Image.resolveAssetSource(song.image).uri` to convert it.

---

## Feature 2 — Progress bar
**What:** A scrub bar below the play controls showing playback position; tapping seeks.

**Files changed:**
- `hooks/useAudioPlayer.ts` — expose `currentTime`, `duration`, and `seekTo` from `status`
- `components/PlayerControls.tsx` — add `Slider` below the buttons row, wired to `currentTime/duration/seekTo`

**Approach:** `status.currentTime` and `status.duration` are already available from `useAudioPlayerStatus`. Add `@react-native-community/slider`, pass values down as props to `PlayerControls`.

---

## Feature 3 — Volume slider
**What:** A small volume knob/slider below the progress bar.

**Files changed:**
- `components/PlayerControls.tsx` — second `Slider` for volume, range 0–1
- `hooks/useAudioPlayer.ts` — expose `setVolume: (v: number) => { player.volume = v }`

**Approach:** `expo-audio` player has a `.volume` property (0.0–1.0). Simple local state in `PlayerControls` with the slider.

---

## Feature 4 & 5 — Mantra lyrics + description (grouped)
**What:** Collapsible panel below the category tag showing Sanskrit/Tamil text and a one-line description.

**Files changed:**
- `types/song.ts` — add `description: { en: string; ta: string }` and `lyrics: { en: string; ta: string }` fields
- `data/songs.ts` — populate description and lyrics for all 21 mantras
- `components/MantraInfo.tsx` *(new)* — collapsible accordion: tap to expand/collapse, shows lyrics + meaning
- `screens/PlayerScreen.tsx` — render `<MantraInfo>` between tags and controls

**Approach:** No new dependencies. Use `useState` for expanded/collapsed. Animate height with `react-native-reanimated` (already installed). Lyrics default to collapsed so the player UI stays clean.

---

## Feature 6 — Favorites / bookmark
**What:** Heart icon on the player; favorites filter in the song drawer.

**Files changed:**
- `hooks/useFavorites.ts` *(new)* — loads/saves Set of favorite IDs via `AsyncStorage`
- `screens/PlayerScreen.tsx` — heart `Pressable` in the title row, passes `favorites` + `toggleFavorite` down
- `components/SongDrawer.tsx` — "All / Favorites" toggle at the top of the list, filter songs accordingly
- `components/PlayerControls.tsx` — or title row in PlayerScreen for the heart icon placement

**Approach:** `AsyncStorage.getItem('favorites')` → parse JSON array → `Set<string>`. `toggleFavorite(id)` updates state and persists. Heart icon uses `lucide-react-native`'s `Heart` (already installed as part of lucide).

---

## Feature 7 — Last played persistence
**What:** App remembers your last selected mantra across restarts.

**Files changed:**
- `screens/PlayerScreen.tsx` — on mount, read `AsyncStorage.getItem('lastSongId')` and set `selectedSong` accordingly; on `handleSelectSong`, save the song ID

**Approach:** 4–5 lines. Wrapped in `useEffect` on mount. No new hook needed — piggybacks on the `AsyncStorage` installed for feature 6.

---

## Feature 8 — Fix i18n
**What:** Wire Tamil translations into all UI strings (currently empty files).

**Files changed:**
- `i18n/en.ts` — define strings object (`selectSong`, `confirmSelection`, `remaining`, `timeLeft`, `timer`, `repetition`, etc.)
- `i18n/ta.ts` — same keys in Tamil
- `hooks/useTranslations.ts` *(new)* — `const t = useTranslations(language)` returns the right strings object
- `components/SongDrawer.tsx` — replace hardcoded `"Select a Song"` / `"Confirm Selection"` with `t.selectSong` etc.; needs `language` prop (already passed in)
- `screens/PlayerScreen.tsx` — replace `"Remaining:"` / `"Time left:"` with `t.remaining` / `t.timeLeft`
- `components/ModeSelector.tsx` / `OptionsSelector.tsx` — any hardcoded labels

---

## Build order

```
7 → 6       Install AsyncStorage → last played persistence → favorites
4 + 5       Data model (Song type) + MantraInfo component + songs data
8           i18n — pure text, no logic risk
2 → 3       Install slider → progress bar → volume
1           Notification metadata — test on device last
```

---

## Summary

| # | Feature | New files | Files modified | New deps |
|---|---------|-----------|---------------|----------|
| 7 | Last played | — | `PlayerScreen.tsx` | `@react-native-async-storage/async-storage` |
| 6 | Favorites | `useFavorites.ts` | `PlayerScreen.tsx`, `SongDrawer.tsx` | (same) |
| 4+5 | Lyrics/desc | `MantraInfo.tsx` | `song.ts`, `songs.ts`, `PlayerScreen.tsx` | — |
| 8 | i18n | `useTranslations.ts` | `en.ts`, `ta.ts`, `SongDrawer.tsx`, `PlayerScreen.tsx`, mode/options components | — |
| 2 | Progress bar | — | `useAudioPlayer.ts`, `PlayerControls.tsx` | `@react-native-community/slider` |
| 3 | Volume | — | `useAudioPlayer.ts`, `PlayerControls.tsx` | (same) |
| 1 | Lock screen | — | `useAudioPlayer.ts` | — |
