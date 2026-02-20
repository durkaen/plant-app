import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'plant-app-storage',
});

export const StorageKeys = {
  ONBOARDING_COMPLETED: 'onboarding.completed',
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];
