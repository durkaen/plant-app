import { stepOneData } from '@/data/onboarding.data';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '@/theme';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface StepOneProps {
  width: number;
  onPress: () => void;
  bottomSpacing: number;
}

export default function StepOne({ width, onPress, bottomSpacing }: StepOneProps) {
  return (
    <View style={[styles.page, { width }]}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.titleRegular}>{stepOneData.title.regular}</Text>
          <Text style={styles.titleSemiBold}>{stepOneData.title.bold}</Text>
        </Text>
        <Text style={styles.subtitle}>{stepOneData.subtitle}</Text>
      </View>

      {/* ── Image Section ── */}
      <Image source={stepOneData.image} style={styles.image} resizeMode="contain" />

      {/* ── Footer ── */}
      <View style={[styles.footer, { paddingBottom: bottomSpacing }]}>
        <Pressable
          onPress={onPress}
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel={stepOneData.button}
        >
          <Text style={styles.buttonText}>{stepOneData.button}</Text>
        </Pressable>
        <View style={styles.legalSlot}>
          <Text style={styles.legalText}>
            {/* Keep legal links visible on first step without pushing the CTA down. */}
            {stepOneData.legal.prefix}{'\n'}
            <Text style={styles.legalLink} onPress={() => {}}>{stepOneData.legal.link1}</Text>
            {' & '}
            <Text style={styles.legalLink} onPress={() => {}}>{stepOneData.legal.link2}</Text>.
          </Text>
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
    gap: Spacing[2],
  },
  title: {
    fontSize: FontSize['5xl'],
    letterSpacing: 0.07,
    maxWidth: 286,
  },
  titleRegular: {
    fontFamily: FontFamily.rubikRegular,
    color: Colors.textPrimary,
  },
  titleSemiBold: {
    fontFamily: FontFamily.rubikSemiBold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.xl,
    lineHeight: 22,
    letterSpacing: 0.07,
    color: 'rgba(19, 35, 27, 0.7)',
    maxWidth: 300,
  },
  image: {
    flex: 1,
    width: '100%',
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
    fontSize: FontSize.lg,
    lineHeight: 24,
    letterSpacing: -0.24,
    fontWeight: '600',
    color: Colors.white,
  },
  legalSlot: {
    height: 34,
    justifyContent: 'center',
  },
  legalText: {
    fontFamily: FontFamily.rubikRegular,
    fontSize: 11,
    lineHeight: 15,
    letterSpacing: 0.07,
    color: 'rgba(89, 113, 101, 0.7)',
    textAlign: 'center',
  },
  legalLink: {
    textDecorationLine: 'underline',
  },
});
