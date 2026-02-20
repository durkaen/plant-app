import { useFonts } from '@/hooks/use-fonts';
import { store } from '@/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import OnboardingModal from '@/screens/onboarding/onboarding-modal';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <OnboardingModal />
      <StatusBar style="dark" />
    </Provider>
  );
}
