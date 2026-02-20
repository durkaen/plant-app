# AGENTS.md

## Project Overview

This is an Expo/React Native mobile application for plant identification and care. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Documentation Resources

When working on this project, **always consult the official Expo documentation** available at:

- **https://docs.expo.dev/llms.txt** - Index of all available documentation files
- **https://docs.expo.dev/llms-full.txt** - Complete Expo documentation including Expo Router, Expo Modules API, development process
- **https://docs.expo.dev/llms-eas.txt** - Complete EAS (Expo Application Services) documentation
- **https://docs.expo.dev/llms-sdk.txt** - Complete Expo SDK documentation
- **https://reactnative.dev/docs/getting-started** - Complete React Native documentation

These documentation files are specifically formatted for AI agents and should be your **primary reference** for:

- Expo APIs and best practices
- Expo Router navigation patterns
- EAS Build, Submit, and Update workflows
- Expo SDK modules and their usage
- Development and deployment processes

## Project Structure

```
/
├── src/                       # All application source code
│   ├── app/                   # Expo Router file-based routing
│   │   ├── _layout.tsx        # Root layout (Redux Provider, fonts, OnboardingModal)
│   │   └── (tabs)/            # Tab navigation
│   │       ├── _layout.tsx    # Tab bar layout (Home, Diagnose, Scanner, My Garden, Profile)
│   │       ├── index.tsx      # Home tab → renders HomeScreen
│   │       ├── diagnose.tsx   # Diagnose tab (placeholder)
│   │       ├── scanner.tsx    # Scanner tab (placeholder)
│   │       ├── my-garden.tsx  # My Garden tab (placeholder)
│   │       └── profile.tsx    # Profile tab (placeholder)
│   ├── screens/               # Full-screen React components
│   │   ├── home/
│   │   │   └── home-screen.tsx
│   │   └── onboarding/
│   │       ├── onboarding-screen.tsx   # 3-step onboarding carousel
│   │       ├── onboarding-modal.tsx    # Modal wrapper shown on first launch
│   │       └── paywall-screen.tsx      # Subscription paywall (logic pending)
│   ├── components/            # Reusable UI components
│   │   ├── ui/
│   │   │   └── gradient-text.tsx
│   │   └── onboarding/
│   │       ├── onboarding-dots.tsx
│   │       └── steps/
│   │           ├── step-one.tsx
│   │           ├── step-two.tsx
│   │           └── step-three.tsx
│   ├── hooks/
│   │   ├── use-fonts.ts       # Custom font loading (Rubik + Visby)
│   │   └── use-shake.ts       # Shake detection via expo-sensors
│   ├── lib/
│   │   └── storage.ts         # MMKV persistent key-value storage
│   ├── data/
│   │   └── onboarding.data.ts # Static onboarding step content
│   ├── store/
│   │   ├── index.ts           # Redux store configuration
│   │   ├── hooks.ts           # Typed useAppDispatch / useAppSelector
│   │   └── api/
│   │       └── plant-api.ts   # RTK Query endpoints (categories, questions)
│   ├── theme/                 # Design tokens
│   │   ├── index.ts           # Re-exports all tokens
│   │   ├── colors.ts          # Colors + RgbaColors
│   │   ├── typography.ts      # Font families, sizes, weights
│   │   ├── spacing.ts         # Spacing scale
│   │   ├── radius.ts          # Border radius scale
│   │   └── shadows.ts         # Shadow definitions
│   └── types/
│       └── api.ts             # API response types
├── assets/
│   ├── fonts/
│   │   ├── rubik-static/      # Rubik font family (all weights)
│   │   └── visby/             # Visby font family (all weights)
│   └── images/design/         # Screen-specific image assets
│       ├── home/
│       ├── onboarding/
│       ├── paywall/
│       └── tabbar/
├── app.json                   # Expo configuration
├── metro.config.js            # Metro bundler config (SVG transformer)
├── tsconfig.json              # TypeScript config (paths alias: @/ → src/)
└── package.json
```

## Path Aliases

The project uses `@/` as an alias for the `src/` directory (configured in `tsconfig.json`).

```ts
// Correct
import { Colors } from '@/theme/colors';
import { store } from '@/store';
const source = require('../../../assets/images/design/paywall/camera-line.png');

// Incorrect
import { Colors } from '../../theme/colors';
```

> **Exception:** Relative paths are acceptable for static asset `require(...)` usage (for example, local images in `assets/`).

## Essential Commands

### Development

```bash
npx expo start                  # Start dev server
npx expo start --clear          # Clear cache and start dev server
npx expo install <package>      # Install packages with compatible versions
npx expo install --check        # Check which installed packages need to be updated
npx expo install --fix          # Automatically update any invalid package versions
```

### Testing

```bash
npm test                # Run all tests once
npm run test:watch      # Watch mode (re-runs on file change)
```

Tests live in `src/__tests__/` and use `jest-expo` preset + `@testing-library/react-native`.
Native modules (MMKV, Reanimated, Sensors) are mocked — no device needed.
Module mocks for `node_modules` go in `__mocks__/` at the project root.

### Building

```bash
npx expo run:ios                # Build and run on iOS simulator/device
npx expo run:android            # Build and run on Android emulator/device
npx expo doctor                 # Check project health and dependencies
npx expo lint                   # Run ESLint
```

### Production (EAS)

```bash
npx eas-cli@latest build --platform ios -s      # Build + submit to App Store
npx eas-cli@latest build --platform android -s  # Build + submit to Google Play
```

> **Note:** This project requires a **development build** — it does NOT run in Expo Go due to native modules (MMKV, Reanimated, Sensors).

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| Expo SDK | ~54.0.33 | Core framework |
| Expo Router | ~6.0.23 | File-based navigation |
| React | 19.1.0 | UI framework |
| React Native | 0.81.5 | Native runtime (New Architecture enabled) |
| Redux Toolkit | ^2.11.2 | State management |
| RTK Query | (bundled with RTK) | Data fetching + caching |
| React Native Reanimated | ~4.1.1 | Performant animations |
| react-native-mmkv | ^4.1.2 | Fast persistent key-value storage |
| expo-sensors | ~15.0.8 | Shake detection |
| react-native-svg | 15.12.1 | SVG rendering |
| expo-image | ~3.0.11 | Optimized image loading |
| expo-linear-gradient | ~15.0.8 | Gradient UI elements |
| react-native-gesture-handler | ~2.28.0 | Native gesture recognition |
| jest-expo | ~54.0.17 | Jest preset for Expo/RN |
| @testing-library/react-native | ^13.3.3 | Component testing utilities |

## Development Guidelines

### Code Style & Standards

- **TypeScript First**: Use TypeScript for all new code with strict type checking
- **Naming Conventions**: Use kebab-case for file names (e.g. `home-screen.tsx`), PascalCase for components
- **Self-Documenting Code**: Write clear, readable code; only add comments for non-obvious logic
- **React 19 Patterns**: Function components with hooks, proper dependency arrays, memoization where appropriate

### Navigation & Routing

- Use **Expo Router** for all navigation (file-based routing under `src/app/`)
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`
- Docs: https://docs.expo.dev/router/introduction/

### State Management

- Use **Redux Toolkit** + **RTK Query** for all state and server data
- Use typed hooks from `@/store/hooks` (`useAppDispatch`, `useAppSelector`)
- API endpoints are defined in `@/store/api/plant-api.ts`

### Storage

- Use **`react-native-mmkv`** via the wrapper in `@/lib/storage.ts` for all persistent key-value storage
- Do **not** use `AsyncStorage` or `expo-sqlite` — the project is standardized on MMKV

### Theming

- All design tokens are in `src/theme/` — always import from `@/theme` instead of hardcoding values
- Colors: `@/theme/colors` → `Colors`, `RgbaColors`
- Typography, spacing, radius, shadows are all exported from `@/theme`

### Recommended Libraries (already installed)

- **Images**: `expo-image` for optimized image handling
- **Animations**: `react-native-reanimated` for native-thread animations
- **Gestures**: `react-native-gesture-handler`
- **Gradients**: `expo-linear-gradient`
- **SVGs**: `react-native-svg` + `react-native-svg-transformer` (import `.svg` files as React components)

## Screens & Status

| Screen | File | Status |
|---|---|---|
| Onboarding (3 steps) | `src/screens/onboarding/onboarding-screen.tsx` | Implemented |
| Paywall | `src/screens/onboarding/paywall-screen.tsx` | Implemented (subscription logic pending) |
| Home | `src/screens/home/home-screen.tsx` | Implemented |
| Diagnose | `src/app/(tabs)/diagnose.tsx` | Placeholder |
| Scanner | `src/app/(tabs)/scanner.tsx` | Placeholder |
| My Garden | `src/app/(tabs)/my-garden.tsx` | Placeholder |
| Profile | `src/app/(tabs)/profile.tsx` | Placeholder |

## Onboarding Flow

Onboarding runs as a `Modal` on top of the app at the root layout level (`src/app/_layout.tsx`). On first launch the modal is visible; once the user completes the paywall step it is dismissed and `onboarding.completed` is persisted via MMKV.

**Resetting onboarding (dev/QA):** Shake the device — a dialog will appear asking whether to reset. Confirming clears the storage flag and reopens the onboarding flow.

- iOS Simulator: `Device > Shake` or `Cmd + Ctrl + Z`
- Android Emulator: Extended Controls → Virtual sensors → Shake

## API

Connected to a dummy REST API: `https://dummy-api-jtg6bessta-ey.a.run.app`

- `GET /categories` — plant categories
- `GET /questions` — featured questions/guides

State managed via RTK Query (`src/store/api/plant-api.ts`).

## Debugging & Development Tools

- **React Native DevTools**: Use MCP `open_devtools` command to launch debugging tools
- **Network Inspection**: Monitor API calls in DevTools
- **Logging**: `console.log` for debugging, `console.warn` for deprecations, `console.error` for errors

## AI Agent Instructions

When working on this project:

1. **Always consult official documentation first**:
   - General Expo: https://docs.expo.dev/llms-full.txt
   - EAS/deployment: https://docs.expo.dev/llms-eas.txt
   - SDK/API reference: https://docs.expo.dev/llms-sdk.txt

2. **Understand before implementing**: Read existing screens and components before writing new code

3. **Follow existing patterns**: All source code lives under `src/`, uses `@/` path aliases, kebab-case file names, and imports design tokens from `@/theme`

4. **Do not introduce new dependencies** without checking if an existing installed library already covers the use case
