import { stepTwoData } from '@/data/onboarding.data';
import { Colors, FontFamily, FontSize, Radius, RgbaColors, Spacing } from '@/theme';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const BRUSH_IMAGE = require('../../../../assets/images/design/onboarding/brush.png');

interface Dot {
  id: string;
  isActive: boolean;
}

interface StepTwoProps {
  width: number;
  dots: Dot[];
  onPress: () => void;
  bottomSpacing: number;
}

export default function StepTwo({ width, dots, onPress, bottomSpacing }: StepTwoProps) {
  return (
    <View style={[styles.page, { width }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={[styles.titleMedium, styles.titleBase]}>{stepTwoData.title.part1}</Text>
          <View style={styles.titleBoldWrap}>
            <Text style={[styles.titleExtraBold, styles.titleBase]}>{stepTwoData.title.bold}</Text>
            {/* Decorative underline graphic aligned to the highlighted word. */}
            <Image source={BRUSH_IMAGE} style={styles.brushImage} />
          </View>
          <Text style={[styles.titleMedium, styles.titleBase]}>{stepTwoData.title.part2}</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image source={stepTwoData.image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={[styles.footer, { paddingBottom: bottomSpacing }]}>
        <Pressable
          onPress={onPress}
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel={stepTwoData.button}
        >
          <Text style={styles.buttonText}>{stepTwoData.button}</Text>
        </Pressable>
        <View style={styles.dotsSlot}>
          {/* Dots are controlled by parent step state for deterministic progression. */}
          <View style={styles.dotsContainer}>
            {dots.map((dot) => (
              <View
                key={dot.id}
                style={[styles.dot, dot.isActive ? styles.dotActive : styles.dotInactive]}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing[6],
    marginTop: Spacing[3],
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  titleBase: {
    color: Colors.textPrimary,
    fontSize: FontSize['5xl'],
    letterSpacing: -1,
  },
  titleMedium: {
    fontFamily: FontFamily.rubikMedium,
    flexShrink: 1,
  },
  titleExtraBold: {
    fontFamily: FontFamily.rubikExtraBold,
  },
  titleBoldWrap: {
    flexShrink: 1,
  },
  brushImage: {
    width: '100%',
    height: 12,
    position: 'absolute',
    bottom: -14,
    transform: [{ rotate: '3deg' }, { scaleX: 1.3 }],
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    paddingHorizontal: Spacing[6],
    paddingBottom: Spacing[3],
    gap: Spacing[3],
  },
  button: {
    height: Spacing[14],
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    lineHeight: 24,
    letterSpacing: -0.24,
    fontWeight: '600',
  },
  dotsSlot: {
    height: 34,
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
  },
  dot: {
    borderRadius: 999,
  },
  dotActive: {
    width: 10,
    height: 10,
    backgroundColor: Colors.textPrimary,
  },
  dotInactive: {
    width: 6,
    height: 6,
    backgroundColor: RgbaColors.blackOverlay24,
  },
});
