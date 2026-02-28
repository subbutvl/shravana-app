# Shravana – Meditation Mantra App

A mobile meditation app for listening to devotional mantras with timer and repetition modes. Built with **Expo** and **React Native**, using **TypeScript** and **expo-audio**.

## Features

- **Audio playback** – Play devotional mantras with full playback controls (play, pause, stop)
- **Timer mode** – Set 5, 10, 15, or 30 minutes; the selected mantra loops until the timer ends
- **Repetition mode** – Choose 11, 27, 58, or 108 repetitions; the mantra replays automatically until the count is reached
- **Song library** – 21 mantras including Gayatri, Mrityunjaya, Hanuman Chalisa, Om Namah Shivaya, and more
- **Bilingual support** – English and Tamil (தமிழ்) for song titles
- **Bottom drawer** – Quick song selection with cover art and checkmarks
- **Background playback** – Continue listening when the app is in the background
- **Local-first** – All songs, images, and translations are bundled; no API or database

## Tech Stack

| Category  | Technology               |
| --------- | ------------------------ |
| Framework | Expo SDK 54              |
| UI        | React Native (core only) |
| Routing   | Expo Router              |
| Audio     | expo-audio               |
| Language  | TypeScript               |

## Project Structure

```
shravana-app/
├── app/
│   ├── _layout.tsx       # Root layout, fonts, splash screen
│   └── index.tsx         # Entry → PlayerScreen
├── assets/
│   ├── audio/            # .mp3 mantra files
│   ├── fonts/            # Anek Tamil font family
│   └── images/           # Icons, covers, splash
├── components/
│   ├── LanguageSwitcher.tsx
│   ├── ModeSelector.tsx      # Timer / Repetition toggle
│   ├── OptionsSelector.tsx   # Timer values / Repetition counts
│   ├── PlayerControls.tsx    # Stop, Play/Pause, Random
│   ├── SongCover.tsx
│   └── SongDrawer.tsx        # Bottom modal song list
├── data/
│   └── songs.ts          # Song definitions (metadata + asset refs)
├── hooks/
│   └── useAudioPlayer.ts # expo-audio wrapper
├── screens/
│   └── PlayerScreen.tsx  # Main player UI and logic
├── types/
│   └── song.ts           # Song type definition
├── app.json
├── eas.json              # EAS Build config (APK)
└── package.json
```

## Prerequisites

- **Node.js** 18+ and npm
- **Expo CLI** (installed via `npx`)
- **Expo Go** (for development) or **EAS Build** (for standalone APK)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd shravana-app

# Install dependencies
npm install

# Start development server
npm start
```

## Scripts

| Command               | Description                    |
| --------------------- | ------------------------------ |
| `npm start`           | Start Expo dev server          |
| `npm run start:clean` | Start with cleared Metro cache |
| `npm run prebuild`    | Run `expo prebuild --clean`    |
| `npm run android`     | Run on Android device/emulator |
| `npm run ios`         | Run on iOS simulator           |
| `npm run web`         | Run in web browser             |
| `npm run lint`        | Run ESLint                     |

## Building APK

Uses **EAS Build** for standalone Android APKs.

```bash
# Install EAS CLI (if needed)
npm install -g eas-cli

# Log in to Expo
eas login

# Build preview APK (for testing)
eas build --profile preview --platform android

# Build production APK
eas build --profile production --platform android
```

The `preview` profile produces an APK suitable for internal testing. Download the APK from the build link when the job completes.

## Adding New Songs

1. Add the audio file to `assets/audio/` (e.g. `my-mantra.mp3`).
2. Add the cover image to `assets/images/covers/` (e.g. `my-mantra.png`).
3. Extend `data/songs.ts`:

```ts
{
  id: "22",
  title: { en: "My Mantra", ta: "மை மந்திரம்" },
  category: "Devotional",
  image: require("../assets/images/covers/my-mantra.png"),
  audio: require("../assets/audio/my-mantra.mp3"),
},
```

> **Note:** Asset paths in `require()` must be static string literals (no variables) for Metro to bundle them correctly.

## Configuration

### App identity

- **Package:** `com.subbutvl.shravanaapp` (Android)
- **Scheme:** `shravanaapp`

### Splash screen and icons

Configured in `app.json` via plugins:

- **App icon:** `./assets/images/icon.png`
- **Android adaptive icon:** `foregroundImage`, `monochromeImage`, `backgroundColor`
- **Splash:** `expo-splash-screen` plugin (image, backgroundColor)

> Custom splash and app icons appear in standalone builds (APK). Expo Go uses its own shell and does not show your custom splash or app icon.

## License

Private project.
