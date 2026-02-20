# PlantApp

A React Native (Expo) mobile app for plant identification and care.

---

## Prerequisites

- Node.js 18+
- Xcode (iOS) or Android Studio (Android)
- [EAS CLI](https://docs.expo.dev/eas/) — optional, for builds

---

## Setup

```bash
git clone <repo-url>
cd plant-app
npm install
```

> **Note:** This project uses native modules (MMKV, Reanimated, Sensors). It does **not** run in Expo Go — you need a development build.

### iOS

```bash
npx expo run:ios
```

### Android

```bash
npx expo run:android
```

---

## Project Structure

```
src/
├── app/                  # Expo Router screens
│   ├── _layout.tsx       # Root layout (Redux, fonts, onboarding modal)
│   └── (tabs)/           # Tab navigation (Home, Diagnose, Scanner, My Garden, Profile)
├── screens/              # Screen components
│   ├── home/
│   └── onboarding/       # Onboarding + Paywall screens
├── components/
│   ├── onboarding/       # OnboardingDots
│   └── ui/               # Shared UI (gradient-text)
├── hooks/
│   ├── use-fonts.ts      # Font loading
│   └── use-shake.ts      # Shake detection via expo-sensors
├── lib/
│   └── storage.ts        # MMKV persistent storage
├── store/
│   ├── index.ts          # Redux store
│   └── api/plant-api.ts  # RTK Query endpoints
├── theme/                # Colors, typography, spacing, radius, shadows
└── types/                # API types
```

---

## Screens

| Screen | Status |
|---|---|
| Onboarding (3 steps) | Implemented |
| Paywall | Implemented (subscription logic pending) |
| Home | Implemented |
| Diagnose | Placeholder |
| Scanner | Placeholder |
| My Garden | Placeholder |
| Profile | Placeholder |

---

## Onboarding Flow

Onboarding runs as a `Modal` on top of the app at the root layout level. On first launch the modal is visible; once the user completes the paywall step it is dismissed and `onboarding.completed` is persisted via MMKV.

**Resetting onboarding (dev/QA):** Shake the device — a dialog will appear asking whether to reset. Confirming clears the storage flag and reopens the onboarding flow from the beginning.

- iOS Simulator: `Device > Shake` or `Cmd + Ctrl + Z`
- Android Emulator: Extended Controls → Virtual sensors → Shake

---

## API

Connected to a dummy REST API: `https://dummy-api-jtg6bessta-ey.a.run.app`

- `GET /categories` — plant categories
- `GET /questions` — featured questions/guides

State managed via RTK Query.

---

## Testing

```bash
npm test          # Run all tests once
npm run test:watch  # Watch mode (re-runs on file change)
```

Tests live in `src/__tests__/` and use **Jest** (`jest-expo` preset) + **@testing-library/react-native**.

| Test file | What it covers |
|---|---|
| `onboarding.data.test.ts` | Data constants (titles, button text, plan options) |
| `storage.test.ts` | `StorageKeys` values + MMKV get/set behavior |
| `onboarding-screen.test.tsx` | Step navigation logic (3 steps → `onComplete`) |

Native modules (MMKV, Reanimated, Sensors) are mocked — no device or simulator needed to run tests.

---

## Tech Stack

- **Expo SDK 54** / Expo Router 6
- **React Native 0.81** (New Architecture enabled)
- **Redux Toolkit** + RTK Query
- **React Native Reanimated 4**
- **MMKV** — persistent storage
- **expo-sensors** — shake detection
- **react-native-svg** — SVG icon rendering
