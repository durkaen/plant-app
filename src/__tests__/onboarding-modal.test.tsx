import React from 'react';
import { Modal } from 'react-native';
import { act, fireEvent, render } from '@testing-library/react-native';
import OnboardingModal from '@/screens/onboarding/onboarding-modal';
import { storage, StorageKeys } from '@/lib/storage';
import * as SplashScreen from 'expo-splash-screen';

jest.mock('@/lib/storage', () => ({
  StorageKeys: {
    ONBOARDING_COMPLETED: 'onboarding.completed',
  },
  storage: {
    getBoolean: jest.fn(),
    set: jest.fn(),
  },
}));

jest.mock('@/hooks/use-shake', () => ({
  useShake: () => false,
}));

jest.mock('expo-splash-screen', () => ({
  hideAsync: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  default: {
    View: ({ children, ...rest }: { children?: React.ReactNode }) => <>{children}</>,
  },
  useSharedValue: (value: number) => ({ value }),
  useAnimatedStyle: () => ({}),
  withDelay: (_delay: number, value: number) => value,
  withSpring: (value: number) => value,
}));

jest.mock('../screens/onboarding/onboarding-screen', () => ({
  __esModule: true,
  default: ({ onComplete }: { onComplete?: () => void }) => {
    const ReactLocal = require('react');
    const { Pressable, Text } = require('react-native');
    return ReactLocal.createElement(
      Pressable,
      { testID: 'onboarding-complete', onPress: onComplete },
      ReactLocal.createElement(Text, null, 'Complete Onboarding'),
    );
  },
}));

jest.mock('../screens/onboarding/paywall-screen', () => ({
  __esModule: true,
  default: ({
    onClose,
    onComplete,
  }: {
    onClose?: () => void;
    onComplete?: () => void;
  }) => {
    const ReactLocal = require('react');
    const { Pressable, Text, View } = require('react-native');
    return ReactLocal.createElement(
      View,
      null,
      ReactLocal.createElement(Text, { testID: 'paywall-screen' }, 'Paywall'),
      ReactLocal.createElement(
        Pressable,
        { testID: 'paywall-close', onPress: onClose },
        ReactLocal.createElement(Text, null, 'Close Paywall'),
      ),
      ReactLocal.createElement(
        Pressable,
        { testID: 'paywall-complete', onPress: onComplete },
        ReactLocal.createElement(Text, null, 'Complete Paywall'),
      ),
    );
  },
}));

describe('OnboardingModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('is hidden when onboarding is already completed', () => {
    (storage.getBoolean as jest.Mock).mockReturnValue(true);
    const { UNSAFE_getByType } = render(<OnboardingModal />);

    act(() => {
      jest.runAllTimers();
    });

    const modal = UNSAFE_getByType(Modal);
    expect(modal.props.visible).toBe(false);
    expect(SplashScreen.hideAsync).toHaveBeenCalledTimes(1);
  });

  it('is visible when onboarding is not completed', () => {
    (storage.getBoolean as jest.Mock).mockReturnValue(false);
    const { UNSAFE_getByType } = render(<OnboardingModal />);

    const modal = UNSAFE_getByType(Modal);
    expect(modal.props.visible).toBe(true);
  });

  it('shows paywall after onboarding completion callback', () => {
    (storage.getBoolean as jest.Mock).mockReturnValue(false);
    const { getByTestId } = render(<OnboardingModal />);

    fireEvent.press(getByTestId('onboarding-complete'));

    expect(getByTestId('paywall-screen')).toBeTruthy();
  });

  it('persists completion and hides modal after paywall completion', () => {
    (storage.getBoolean as jest.Mock).mockReturnValue(false);
    const { getByTestId, UNSAFE_getByType } = render(<OnboardingModal />);

    fireEvent.press(getByTestId('onboarding-complete'));
    fireEvent.press(getByTestId('paywall-complete'));

    expect(storage.set).toHaveBeenCalledWith(StorageKeys.ONBOARDING_COMPLETED, true);

    const modal = UNSAFE_getByType(Modal);
    expect(modal.props.visible).toBe(false);
  });
});
