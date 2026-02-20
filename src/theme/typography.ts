// Font Families
export const FontFamily = {
  // Rubik — body, UI text
  rubikLight: 'Rubik-Light',
  rubikRegular: 'Rubik-Regular',
  rubikMedium: 'Rubik-Medium',
  rubikSemiBold: 'Rubik-SemiBold',
  rubikBold: 'Rubik-Bold',
  rubikExtraBold: 'Rubik-ExtraBold',

  // Visby — display, logo, strong headings
  visbyExtraBold: 'VisbyExtrabold',
} as const;

// Font Sizes (sp scale)
export const FontSize = {
  xs: 9,
  sm: 10,
  base: 12,
  md: 13,
  lg: 15,
  xl: 16,
  '2xl': 17,
  '3xl': 20,
  '4xl': 24,
  '5xl': 28,
  '6xl': 32,
  '7xl': 36,
} as const;

// Line Heights
export const LineHeight = {
  tight: 1.1,
  snug: 1.2,
  normal: 1.4,
  relaxed: 1.5,
  loose: 1.6,
} as const;

// Letter Spacing
export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.3,
} as const;

export type FontFamilyKey = keyof typeof FontFamily;
export type FontSizeKey = keyof typeof FontSize;
