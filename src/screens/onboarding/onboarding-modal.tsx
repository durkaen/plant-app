import { storage, StorageKeys } from "@/lib/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Modal } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring } from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OnboardingScreen from "./onboarding-screen";
import PaywallScreen from "./paywall-screen";
import { useShake } from "@/hooks/use-shake";
import * as SplashScreen from 'expo-splash-screen';

export default function OnboardingModal() {
  const isShaking = useShake();
  const [visible, setVisible] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const slideAnim = useSharedValue<number>(1000);
  const isShaked = useRef(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const isOnboarded = storage.getBoolean(StorageKeys.ONBOARDING_COMPLETED) ?? false;
    setVisible(!isOnboarded);
    // Keep splash visible briefly to avoid a flash while modal visibility settles.
    timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setShowPaywall(true);
    slideAnim.value = withDelay(500, withSpring(0));
  }, [slideAnim]);

  const animatedTransform = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: slideAnim.value }],
    };
  });

  const handleDone = useCallback(() => {
    storage.set(StorageKeys.ONBOARDING_COMPLETED, true);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (isShaking && !visible && !isShaked.current) {
      // Guard against repeated alerts while a single shake event is still propagating.
      isShaked.current = true;
      Alert.alert(
        "Reset Onboarding",
        "Do you want to reset the onboarding flow and see it again?",
        [
          { text: "Cancel", style: "cancel", onPress: () => { isShaked.current = false; } },
          {
            text: "Reset",
            style: "destructive",
            onPress: () => {
              storage.set(StorageKeys.ONBOARDING_COMPLETED, false);
              slideAnim.value = 1000;
              setShowPaywall(false);
              setVisible(true);
              isShaked.current = false;
            },
          },
        ],
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShaking, visible]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      statusBarTranslucent
      presentationStyle="overFullScreen">
      <SafeAreaProvider>
        <OnboardingScreen onComplete={handleOnboardingComplete} />
        {showPaywall && (
          <Animated.View
            style={[StyleSheet.absoluteFillObject, animatedTransform]}
          >
            <PaywallScreen onClose={handleDone} onComplete={handleDone} />
          </Animated.View>
        )}
      </SafeAreaProvider>
    </Modal>
  );
}