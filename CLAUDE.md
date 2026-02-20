# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Primary Reference

See `AGENTS.md` for the full project documentation (structure, tech stack, conventions, commands).

## Quick Reference

- **All source code** lives under `src/` — never modify files outside `src/` unless it's config (`app.json`, `metro.config.js`, `tsconfig.json`, `package.json`)
- **Path alias**: `@/` maps to `src/` — always use this, never relative `../../` imports (except static asset `require(...)` paths from `assets/`)
- **File naming**: kebab-case for all files (e.g. `home-screen.tsx`, `use-fonts.ts`)
- **Storage**: use `react-native-mmkv` via `@/lib/storage.ts` — not AsyncStorage, not expo-sqlite
- **Theming**: import all design tokens from `@/theme` — never hardcode colors, spacing, or font sizes
- **State**: Redux Toolkit + RTK Query — use typed hooks from `@/store/hooks`

## Key Files

| Path | Purpose |
|---|---|
| `src/app/_layout.tsx` | Root layout — Redux Provider, font loading, OnboardingModal |
| `src/app/(tabs)/_layout.tsx` | Tab bar configuration |
| `src/store/index.ts` | Redux store |
| `src/store/api/plant-api.ts` | RTK Query API endpoints |
| `src/lib/storage.ts` | MMKV storage wrapper |
| `src/theme/index.ts` | All design tokens (re-exports) |

## Constraints

- This project does **not** run in Expo Go — a development build is required (uses MMKV, Reanimated, Sensors)
- New Architecture is **enabled** — avoid libraries incompatible with the New Architecture
- Do not add new dependencies without checking if an existing installed library covers the need
