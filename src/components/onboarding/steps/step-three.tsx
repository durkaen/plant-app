import { stepThreeData } from '@/data/onboarding.data';
import { Colors, FontFamily, FontSize, Radius, RgbaColors, Spacing } from '@/theme';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const BRUSH_IMAGE = require('../../../../assets/images/design/onboarding/brush.png');
const OVERLAY_IMAGE = require('../../../../assets/images/design/onboarding/onboarding-third-overlay.png');

interface Dot {
  id: string;
  isActive: boolean;
}

interface StepThreeProps {
  width: number;
  dots: Dot[];
  onPress: () => void;
  bottomSpacing: number;
}

export default function StepThree({ width, dots, onPress, bottomSpacing }: StepThreeProps) {
  return (
    <View style={[styles.page, { width }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={[styles.titleMedium, styles.titleBase]}>{stepThreeData.title.part1}</Text>
          <View style={styles.titleBoldWrap}>
            <Text style={[styles.titleExtraBold, styles.titleBase]}>{stepThreeData.title.bold}</Text>
            <View style={styles.brushShadowContainer}>
              {/* Shadowed brush gives the final step title more depth/contrast. */}
              <Image source={BRUSH_IMAGE} style={styles.brushImage} />
            </View>
          </View>
        </View>
      </View>

      <View style={[styles.imageContainer, { paddingBottom: bottomSpacing }]}>
        <Image source={stepThreeData.image} style={styles.image} resizeMode="contain" />
      </View>

      {/* Bottom overlay improves legibility where CTA and indicators sit. */}
      <Image source={OVERLAY_IMAGE} style={styles.overlayImage} resizeMode="cover" />
      <View style={[styles.footer, { paddingBottom: bottomSpacing }]}>
        <Pressable
          onPress={onPress}
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel={stepThreeData.button}
        >
          <Text style={styles.buttonText}>{stepThreeData.button}</Text>
        </Pressable>
        <View style={styles.dotsSlot}>
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
    lineHeight: 34,
    letterSpacing: -1,
    paddingBottom: Spacing[1],
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  titleMedium: {
    fontFamily: FontFamily.rubikMedium,
    flexShrink: 1,
  },
  titleBoldWrap: {
    flexShrink: 1,
  },
  titleExtraBold: {
    fontFamily: FontFamily.rubikExtraBold,
  },
  brushShadowContainer: {
    position: 'absolute',
    bottom: -12,
    width: '100%',
    height: 12,
    transform: [{ rotate: '3deg' }, { scaleX: 1.1 }],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  brushImage: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlayImage: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 255,
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
