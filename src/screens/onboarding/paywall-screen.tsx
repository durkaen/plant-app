import { paywallData } from '@/data/paywall.data';
import {
  Colors,
  FontFamily,
  FontSize,
  Radius,
  RgbaColors,
  Spacing,
} from '@/theme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Fragment, useCallback, useState } from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SunIcon, LeavesIcon, SpeedometerIcon, ScannerIcon, CloseIcon } from '../../../assets/images/design/paywall';
import { SvgProps } from 'react-native-svg';

const PAYWALL_FOREST_IMAGE = require('../../../assets/images/design/paywall/paywall-forest-img.jpg');
const CAMERA_LINE_IMAGE = require('../../../assets/images/design/paywall/camera-line.png');

// Feature IDs come from paywallData and are mapped to their visual icon components here.
const FEATURE_ICONS: Record<string, React.FC<SvgProps>> = {
  unlimited: ScannerIcon,
  faster: SpeedometerIcon,
  detailed: LeavesIcon,
};

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_SECTION_HEIGHT = SCREEN_HEIGHT * 0.6;

interface PaywallScreenProps {
  onClose?: () => void;
  onComplete?: () => void;
}

export default function PaywallScreen({ onClose, onComplete }: PaywallScreenProps) {
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  // Start content below the hero artwork while respecting notch/safe area.
  const contentTopOffset = insets.top + SCREEN_HEIGHT * 0.38;

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleSubscribe = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  const handleSelectMonthly = useCallback(() => {
    setSelectedPlan('monthly');
  }, []);

  const handleSelectYearly = useCallback(() => {
    setSelectedPlan('yearly');
  }, []);

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.imageSection}>
          <Image
            source={PAYWALL_FOREST_IMAGE}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            blurRadius={3}
          />
          <View style={styles.darkOverlay} />
          <SunIcon />
          <Image
            source={CAMERA_LINE_IMAGE}
            style={styles.cameraLineImage}
          />
        </View>

        <View>
          <View style={{ height: contentTopOffset }} />

          <View style={styles.titleSection}>
            <Text style={styles.title}>
              <Text style={styles.titleBrand}>{paywallData.title.brand}</Text>
              <Text style={styles.titlePremium}>{paywallData.title.premium}</Text>
            </Text>
            <Text style={styles.subtitle}>{paywallData.subtitle}</Text>
          </View>

          <View style={{backgroundColor: Colors.backgroundPaywall}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featureScrollContent}
              style={styles.featureScroll}
            >
              {paywallData.features.map((feature) => {
                // Data-driven icon resolution keeps copy/content editable without touching UI structure.
                const IconComponent = FEATURE_ICONS[feature.id];
                return (
                  <View key={feature.id} style={styles.featureCard}>
                    <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFillObject} />
                    <View style={styles.featureIconContainer}>
                      <IconComponent width={18} height={18} />
                    </View>
                    <View style={styles.featureTextContainer}>
                      <Text style={styles.featureTitle}>{feature.title}</Text>
                      <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            <View style={styles.optionsSection}>
              <Pressable
                onPress={handleSelectMonthly}
                style={[
                  styles.optionCard,
                  selectedPlan === 'monthly' && styles.selectedOptionCard,
                ]}
                accessibilityRole="radio"
                accessibilityState={{ selected: selectedPlan === 'monthly' }}
              >
                <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFillObject} />
                {selectedPlan === 'monthly' && (
                  <LinearGradient
                    colors={['rgba(40,175,110,0.168)', 'rgba(40,175,110,0)']}
                    start={{ x: 1, y: 0.5 }}
                    end={{ x: 0, y: 0.5 }}
                    locations={[0, 0.685]}
                    style={[StyleSheet.absoluteFillObject, { borderRadius: Radius.lg }]}
                  />
                )}
                <View style={styles.optionContent}>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedPlan === 'monthly' && styles.radioOuterSelected,
                    ]}
                  >
                    {selectedPlan === 'monthly' && <View style={styles.radioInner} />}
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionTitle}>{paywallData.plans.monthly.title}</Text>
                    <Text style={styles.optionSubtitle}>
                      <Text style={styles.optionSubtitleLight}>{paywallData.plans.monthly.priceText}</Text>
                      <Text>{paywallData.plans.monthly.noteText}</Text>
                    </Text>
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={handleSelectYearly}
                style={[
                  styles.optionCard,
                  selectedPlan === 'yearly' && styles.selectedOptionCard,
                ]}
                accessibilityRole="radio"
                accessibilityState={{ selected: selectedPlan === 'yearly' }}
              >
                <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFillObject} />
                {selectedPlan === 'yearly' && (
                  <LinearGradient
                    colors={['rgba(40,175,110,0.168)', 'rgba(40,175,110,0)']}
                    start={{ x: 1, y: 0.5 }}
                    end={{ x: 0, y: 0.5 }}
                    locations={[0, 0.685]}
                    style={[StyleSheet.absoluteFillObject, { borderRadius: Radius.lg }]}
                  />
                )}
                <View style={styles.saveBadge}>
                  <Text style={styles.saveBadgeText}>{paywallData.plans.yearly.badge}</Text>
                </View>
                <View style={styles.optionContent}>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedPlan === 'yearly' && styles.radioOuterSelected,
                    ]}
                  >
                    {selectedPlan === 'yearly' && <View style={styles.radioInner} />}
                  </View>
                  <View style={styles.optionTextContainer}>
                    <Text style={styles.optionTitle}>{paywallData.plans.yearly.title}</Text>
                    <Text style={styles.optionSubtitle}>
                      {paywallData.plans.yearly.description}
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>

            <Pressable
              onPress={handleSubscribe}
              style={styles.ctaButton}
              accessibilityRole="button"
              accessibilityLabel={paywallData.cta}
            >
              {/* CTA currently finishes onboarding flow; purchase logic is wired separately. */}
              <Text style={styles.ctaButtonText}>{paywallData.cta}</Text>
            </Pressable>

            <Text style={styles.trialInfoText}>{paywallData.trialInfo}</Text>

            <View style={styles.termsContainer}>
              {paywallData.terms.map((term, index) => (
                <Fragment key={term}>
                  {index > 0 && <Text style={styles.termsText}>•</Text>}
                  <Text style={styles.termsText} onPress={() => {}}>
                    {term}
                  </Text>
                </Fragment>
              ))}
            </View>

            <View style={{ height: insets.bottom + Spacing[4] }} />
          </View>
        </View>
      </ScrollView>

      <Pressable
        onPress={handleClose}
        style={[styles.closeButton, { top: insets.top + 11 }]}
        accessibilityRole="button"
        accessibilityLabel="Close"
        hitSlop={8}
      >
        <View style={styles.closeButtonCircle}>
          <CloseIcon width={24} height={24} />
        </View>
      </Pressable>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imageSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: IMAGE_SECTION_HEIGHT,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  cameraLineImage: {
    height: IMAGE_SECTION_HEIGHT * 0.8,
    width: '100%',
    bottom: IMAGE_SECTION_HEIGHT * 0.275,
  },
  scrollContent: {
    flexGrow: 1,
  },
  titleSection: {
    paddingHorizontal: Spacing[6],
  },
  title: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  titleBrand: {
    fontFamily: FontFamily.visbyExtraBold,
    fontSize: 30,
    color: Colors.white,
  },
  titlePremium: {
    fontFamily: FontFamily.rubikLight,
    fontSize: 27,
    color: Colors.white,
  },
  subtitle: {
    fontFamily: FontFamily.rubikLight,
    fontSize: FontSize['2xl'],
    color: RgbaColors.whiteOverlay70,
    lineHeight: 24,
    letterSpacing: 0.38,
  },
  featureScroll: {
    marginTop: Spacing[4],
    flexGrow: 0,
  },
  featureScrollContent: {
    paddingHorizontal: Spacing[6],
    gap: Spacing[2],
  },
  featureCard: {
    width: 156,
    height: 130,
    borderRadius: Radius.lg,
    backgroundColor: RgbaColors.whiteOverlay08,
    overflow: 'hidden',
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: RgbaColors.blackOverlay24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing[4],
    marginTop: Spacing[4],
  },
  featureIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.white,
  },
  featureTextContainer: {
    position: 'absolute',
    left: Spacing[4],
    bottom: Spacing[4],
    gap: Spacing[1],
  },
  featureTitle: {
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize['3xl'],
    color: Colors.white,
    lineHeight: 24,
    letterSpacing: 0.38,
  },
  featureSubtitle: {
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.md,
    color: RgbaColors.whiteOverlay70,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  optionsSection: {
    paddingHorizontal: Spacing[6],
    paddingTop: Spacing[6],
    gap: Spacing[4],
    backgroundColor: Colors.backgroundPaywall,
  },
  optionCard: {
    height: 60,
    borderRadius: Radius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 0.5,
    borderColor: RgbaColors.whiteOverlay30,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  selectedOptionCard: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    gap: Spacing[3],
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: RgbaColors.whiteOverlay30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize.xl,
    color: Colors.white,
  },
  optionSubtitle: {
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.base,
    color: RgbaColors.whiteOverlay70,
  },
  optionSubtitleLight: {
    fontFamily: FontFamily.rubikLight,
  },
  saveBadge: {
    position: 'absolute',
    top: -1,
    right: 0,
    height: 26,
    paddingHorizontal: Spacing[3],
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: Radius['2xl'],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  saveBadgeText: {
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize.base,
    color: Colors.white,
    lineHeight: 18,
  },
  ctaButton: {
    marginHorizontal: Spacing[6],
    marginTop: 26,
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ctaButtonText: {
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize.xl,
    color: Colors.white,
    lineHeight: 24,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
  trialInfoText: {
    fontFamily: FontFamily.rubikLight,
    fontSize: FontSize.xs,
    color: RgbaColors.whiteOverlay52,
    lineHeight: 12,
    textAlign: 'center',
    marginHorizontal: Spacing[6],
    marginTop: Spacing[2],
  },
  termsText: {
    fontFamily: FontFamily.rubikRegular,
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: Spacing[4],
    zIndex: 10,
  },
  closeButtonCircle: {
    borderRadius: Radius.md,
    backgroundColor: RgbaColors.blackOverlay40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 10,
  },
});
