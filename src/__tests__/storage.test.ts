import { storage, StorageKeys } from '@/lib/storage';

describe('StorageKeys', () => {
  it('ONBOARDING_COMPLETED key has the correct value', () => {
    expect(StorageKeys.ONBOARDING_COMPLETED).toBe('onboarding.completed');
  });

  it('all keys are non-empty strings', () => {
    for (const value of Object.values(StorageKeys)) {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
    }
  });
});

describe('storage (mocked MMKV)', () => {
  it('returns undefined for a key that has not been set', () => {
    expect(storage.getBoolean('nonexistent.key')).toBeUndefined();
  });

  it('stores and retrieves a boolean value', () => {
    storage.set(StorageKeys.ONBOARDING_COMPLETED, true);
    expect(storage.getBoolean(StorageKeys.ONBOARDING_COMPLETED)).toBe(true);
  });

  it('can overwrite an existing value', () => {
    storage.set(StorageKeys.ONBOARDING_COMPLETED, true);
    storage.set(StorageKeys.ONBOARDING_COMPLETED, false);
    expect(storage.getBoolean(StorageKeys.ONBOARDING_COMPLETED)).toBe(false);
  });
});
