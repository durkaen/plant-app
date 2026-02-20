// Modern CSS boxShadow API (RN 0.76+)
export const Shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 2px 8px rgba(0, 0, 0, 0.08)',
  lg: '0 4px 16px rgba(0, 0, 0, 0.10)',
  xl: '0 8px 24px rgba(0, 0, 0, 0.12)',
  card: '0 2px 12px rgba(0, 0, 0, 0.06)',
  tabBar: '0 -1px 0 rgba(0, 0, 0, 0.06)',
} as const;

export type ShadowKey = keyof typeof Shadows;
