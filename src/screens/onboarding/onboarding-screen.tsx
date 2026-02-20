import StepOne from '@/components/onboarding/steps/step-one';
import StepThree from '@/components/onboarding/steps/step-three';
import StepTwo from '@/components/onboarding/steps/step-two';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const BACKGROUND_IMAGE = require('../../../assets/images/design/onboarding/onboarding-first-bg.png');

interface OnboardingScreenProps {
  onComplete?: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { bottom } = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [width, setWidth] = useState(0);

  const goToStep = useCallback(
    (step: number) => {
      setCurrentStep(step);
    },
    [],
  );

  const handleContinue = useCallback(() => {
    if (currentStep < 2) {
      goToStep(currentStep + 1);
    } else {
      onComplete?.();
    }
  }, [currentStep, goToStep, onComplete]);

  useEffect(() => {
    if (width > 0) {
      // Keep the visual page in sync with the controlled step state.
      scrollRef.current?.scrollTo({ x: currentStep * width, animated: true });
    }
  }, [width, currentStep]);

  const dots = useMemo(
    () => [
      // StepOne has no dots in the design; indicators start from StepTwo.
      { id: 'dot-1', isActive: currentStep === 1 },
      { id: 'dot-2', isActive: currentStep === 2 },
      { id: 'dot-3', isActive: false },
    ],
    [currentStep],
  );

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          // Navigation is intentionally button-driven, not swipe-driven.
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.pager}
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        >
          <StepOne width={width} onPress={handleContinue} bottomSpacing={bottom} />
          <StepTwo width={width} dots={dots} onPress={handleContinue} bottomSpacing={bottom} />
          <StepThree width={width} dots={dots} onPress={handleContinue} bottomSpacing={bottom} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
});
