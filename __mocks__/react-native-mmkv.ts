export const createMMKV = jest.fn(() => {
  const store: Record<string, string | boolean | number> = {};
  return {
    getBoolean: jest.fn((key: string): boolean | undefined => {
      const val = store[key];
      return typeof val === 'boolean' ? val : undefined;
    }),
    getString: jest.fn((key: string): string | undefined => {
      const val = store[key];
      return typeof val === 'string' ? val : undefined;
    }),
    set: jest.fn((key: string, value: string | boolean | number) => {
      store[key] = value;
    }),
    delete: jest.fn((key: string) => {
      delete store[key];
    }),
  };
});
