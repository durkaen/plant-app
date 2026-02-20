export const Colors = {
  primary: '#28AF6E',
  white: '#FFFFFF',
  black: '#000000',

  // Text
  textPrimary: '#13231B',
  textSecondary: '#597165',
  textMuted: '#9B9B9B',
  textLight: '#ABABAB',

  // Backgrounds
  backgroundPrimary: '#FBFAFA',
  backgroundPaywall: '#101E17',
  backgroundDark: '#1A1A1A',

  // Accents
  goldLight: '#F0D399',
  goldDark: '#D9A846',
  errorRed: '#FF3B30',
} as const;

export const RgbaColors = {
  whiteOverlay95: 'rgba(255, 255, 255, 0.95)',
  whiteOverlay70: 'rgba(255, 255, 255, 0.7)',
  whiteOverlay52: 'rgba(255, 255, 255, 0.52)',
  whiteOverlay30: 'rgba(255, 255, 255, 0.3)',
  whiteOverlay10: 'rgba(255, 255, 255, 0.1)',
  whiteOverlay08: 'rgba(255, 255, 255, 0.08)',
  blackOverlay40: 'rgba(0, 0, 0, 0.4)',
  blackOverlay24: 'rgba(0, 0, 0, 0.24)',
  blackOverlay20: 'rgba(0, 0, 0, 0.2)',
  blackOverlay10: 'rgba(0, 0, 0, 0.1)',
  primaryOverlay20: 'rgba(40, 175, 110, 0.2)',
} as const;

export type ColorKey = keyof typeof Colors;
export type RgbaColorKey = keyof typeof RgbaColors;
