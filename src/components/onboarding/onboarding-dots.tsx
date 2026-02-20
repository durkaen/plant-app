import { Colors } from '@/theme';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';
import { View } from 'react-native';

interface OnboardingDotsProps {
  total: number;
  scrollX: SharedValue<number>;
  screenWidth: number;
  /** scrollX offset where index 0 starts (default 0) */
  offset?: number;
}

export function OnboardingDots({
  total,
  scrollX,
  screenWidth,
  offset = 0,
}: OnboardingDotsProps) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}>
      {Array.from({ length: total }).map((_, index) => (
        <Dot
          key={index}
          index={index}
          scrollX={scrollX}
          screenWidth={screenWidth}
          offset={offset}
        />
      ))}
    </View>
  );
}

interface DotProps {
  index: number;
  scrollX: SharedValue<number>;
  screenWidth: number;
  offset: number;
}

function Dot({ index, scrollX, screenWidth, offset }: DotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    // Allow consumers to reuse this indicator for pagers starting mid-track.
    const adjusted = scrollX.value - offset;
    const inputRange = [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ];

    const width = interpolate(adjusted, inputRange, [8, 20, 8], 'clamp');
    // Active dot morphs both width and color to emphasize current page.
    const backgroundColor = interpolateColor(adjusted, inputRange, [
      'rgba(19, 35, 27, 0.2)',
      Colors.primary,
      'rgba(19, 35, 27, 0.2)',
    ]);

    return { width, backgroundColor };
  });

  return (
    <Animated.View
      style={[
        { height: 8, borderRadius: 4 },
        animatedStyle,
      ]}
    />
  );
}
