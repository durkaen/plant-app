import { Colors, FontFamily, FontSize, Spacing } from '@/theme';
import GradientText from '@/components/ui/gradient-text';
import { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import EmailIcon from '../../../assets/images/design/home/icon-email.svg';
import ArrowRightIcon from '../../../assets/images/design/home/icon-arrow-right.svg';

export default function PremiumBanner() {
  const shimmerProgress = useSharedValue(0);

  useEffect(() => {
    // Run an infrequent shimmer sweep to keep the banner noticeable without constant motion.
    shimmerProgress.value = withRepeat(
      withSequence(
        withDelay(
          7000,
          withTiming(1, {
            duration: 1400,
            easing: Easing.out(Easing.cubic),
          }),
        ),
        withTiming(0, { duration: 0 }),
      ),
      -1,
      false,
    );
  }, [shimmerProgress]);

  const shimmerAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmerProgress.value, [0, 1], [-140, 400]);
    const opacity = interpolate(shimmerProgress.value, [0, 0.1, 0.45, 0.8, 1], [0, 0.2, 0.45, 0.2, 0]);

    return {
      opacity,
      transform: [{ translateX }, { rotate: '16deg' }],
    };
  });

  return (
    <TouchableOpacity style={styles.premiumBanner} activeOpacity={0.9} onPress={() => null}>
      <Animated.View pointerEvents="none" style={[styles.shimmerOverlay, shimmerAnimatedStyle]}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.32)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.shimmerGradient}
        />
      </Animated.View>
      <View style={styles.premiumIconWrap}>
        <EmailIcon width={32} height={24} />
        <View style={styles.premiumBadgeWrap}>
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>1</Text>
          </View>
        </View>
      </View>
      <View style={styles.premiumTextWrap}>
        <GradientText
          segments={[
            { text: 'FREE', fontFamily: FontFamily.rubikBold, fontWeight: '700' },
            { text: ' Premium Available', fontFamily: FontFamily.rubikSemiBold, fontWeight: '600' },
          ]}
          fontSize={FontSize.xl}
          height={20}
          letterSpacing={-0.32}
          colors={['#E5C990', '#E4B046']}
          gradientWidth={195}
        />
        <GradientText
          segments={[
            { text: 'Tap to upgrade your account!', fontFamily: FontFamily.rubikRegular, fontWeight: '400' },
          ]}
          fontSize={FontSize.md}
          height={16}
          colors={['#FFDE9C', '#F5C25B']}
          opacity={0.8}
        />
      </View>
      <ArrowRightIcon width={24} height={24} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  premiumBanner: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#24201A',
    borderRadius: 12,
    borderCurve: 'continuous',
    height: Spacing[16],
    paddingLeft: Spacing[5],
    paddingRight: Spacing[3],
    gap: Spacing[4],
  },
  shimmerOverlay: {
    position: 'absolute',
    top: -10,
    bottom: -10,
    left: -40,
    width: 96,
  },
  shimmerGradient: {
    flex: 1,
  },
  premiumIconWrap: {
    position: 'relative',
  },
  premiumBadgeWrap: {
    position: 'absolute',
    top: -6,
    right: -5,
  },
  premiumBadge: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: Colors.errorRed,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadgeText: {
    color: Colors.white,
    fontSize: FontSize.xs,
    fontFamily: FontFamily.rubikBold,
    lineHeight: 11,
  },
  premiumTextWrap: {
    flex: 1,
    gap: 2,
  },
});
