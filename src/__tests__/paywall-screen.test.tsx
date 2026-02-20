import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import PaywallScreen from '@/screens/onboarding/paywall-screen';
import { paywallData } from '@/data/paywall.data';

jest.mock('expo-status-bar', () => ({ StatusBar: () => null }));

jest.mock('expo-blur', () => ({
  BlurView: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

jest.mock('../../assets/images/design/paywall', () => {
  const ReactLocal = jest.requireActual('react');
  const { View } = jest.requireActual('react-native');

  const MockIcon = () => ReactLocal.createElement(View, null);

  return {
    SunIcon: MockIcon,
    LeavesIcon: MockIcon,
    SpeedometerIcon: MockIcon,
    ScannerIcon: MockIcon,
    CloseIcon: MockIcon,
  };
});

describe('PaywallScreen', () => {
  it('renders key paywall content', () => {
    const { getByText } = render(<PaywallScreen />);

    expect(getByText(paywallData.title.brand)).toBeTruthy();
    expect(getByText(paywallData.subtitle)).toBeTruthy();
    expect(getByText(paywallData.plans.monthly.title)).toBeTruthy();
    expect(getByText(paywallData.plans.yearly.title)).toBeTruthy();
    expect(getByText(paywallData.plans.yearly.badge)).toBeTruthy();
  });

  it('calls onComplete when CTA is pressed', () => {
    const onComplete = jest.fn();
    const { getByText } = render(<PaywallScreen onComplete={onComplete} />);

    fireEvent.press(getByText(paywallData.cta));

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button is pressed', () => {
    const onClose = jest.fn();
    const { UNSAFE_getByProps } = render(<PaywallScreen onClose={onClose} />);
    const closeButton = UNSAFE_getByProps({ accessibilityLabel: 'Close' });
    fireEvent.press(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('allows selecting both subscription options', () => {
    const { getByText } = render(<PaywallScreen />);

    const monthlyOption = getByText(paywallData.plans.monthly.title);
    const yearlyOption = getByText(paywallData.plans.yearly.title);

    expect(() => fireEvent.press(monthlyOption)).not.toThrow();
    expect(() => fireEvent.press(yearlyOption)).not.toThrow();
  });
});
