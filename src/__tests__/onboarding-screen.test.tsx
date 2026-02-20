import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OnboardingScreen from '@/screens/onboarding/onboarding-screen';

// Mock the step components so we only test OnboardingScreen's navigation logic.
// Each mock renders a simple button that calls the onPress prop (= handleContinue).
jest.mock('@/components/onboarding/steps/step-one', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return function MockStepOne({ onPress }: { onPress: () => void }) {
    return (
      <TouchableOpacity testID="btn-step-one" onPress={onPress}>
        <Text>Get Started</Text>
      </TouchableOpacity>
    );
  };
});

jest.mock('@/components/onboarding/steps/step-two', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return function MockStepTwo({ onPress }: { onPress: () => void }) {
    return (
      <TouchableOpacity testID="btn-step-two" onPress={onPress}>
        <Text>Continue</Text>
      </TouchableOpacity>
    );
  };
});

jest.mock('@/components/onboarding/steps/step-three', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return function MockStepThree({ onPress }: { onPress: () => void }) {
    return (
      <TouchableOpacity testID="btn-step-three" onPress={onPress}>
        <Text>Continue</Text>
      </TouchableOpacity>
    );
  };
});

jest.mock('expo-status-bar', () => ({ StatusBar: () => null }));

jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return { SafeAreaView: View, SafeAreaProvider: View };
});

describe('OnboardingScreen', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<OnboardingScreen />);
    expect(getByTestId('btn-step-one')).toBeTruthy();
  });

  it('calls onComplete after progressing through all three steps', () => {
    const onComplete = jest.fn();
    const { getByTestId } = render(<OnboardingScreen onComplete={onComplete} />);

    // All three step buttons exist in the scroll view simultaneously.
    // Each press advances the internal currentStep counter via handleContinue.
    fireEvent.press(getByTestId('btn-step-one'));   // step 0 → 1
    fireEvent.press(getByTestId('btn-step-two'));   // step 1 → 2
    fireEvent.press(getByTestId('btn-step-three')); // step 2 → onComplete()

    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('does not call onComplete before reaching the last step', () => {
    const onComplete = jest.fn();
    const { getByTestId } = render(<OnboardingScreen onComplete={onComplete} />);

    fireEvent.press(getByTestId('btn-step-one'));
    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('btn-step-two'));
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('works without an onComplete prop (no crash)', () => {
    const { getByTestId } = render(<OnboardingScreen />);
    fireEvent.press(getByTestId('btn-step-one'));
    fireEvent.press(getByTestId('btn-step-two'));
    // Pressing the last step without onComplete should not throw
    expect(() => fireEvent.press(getByTestId('btn-step-three'))).not.toThrow();
  });
});
