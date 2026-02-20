import Svg, { Defs, LinearGradient, Stop, Text as SvgText, TSpan } from 'react-native-svg';

interface GradientTextSegment {
  text: string;
  fontFamily: string;
  fontWeight?: string;
}

interface GradientTextProps {
  segments: GradientTextSegment[];
  fontSize: number;
  height: number;
  letterSpacing?: number;
  colors: [string, string];
  opacity?: number;
  gradientWidth?: number;
}

export default function GradientText({
  segments,
  fontSize,
  height,
  letterSpacing = 0,
  colors,
  opacity = 1,
  gradientWidth,
}: GradientTextProps) {
  // Use absolute gradient coordinates when a fixed text width is provided.
  const useUserSpace = gradientWidth !== undefined;

  return (
    <Svg height={height} width="100%" opacity={opacity}>
      <Defs>
        <LinearGradient
          id="grad"
          x1="0"
          y1="0"
          x2={useUserSpace ? gradientWidth : 1}
          y2="0"
          gradientUnits={useUserSpace ? 'userSpaceOnUse' : 'objectBoundingBox'}
        >
          <Stop offset="0%" stopColor={colors[0]} />
          <Stop offset="100%" stopColor={colors[1]} />
        </LinearGradient>
      </Defs>
      <SvgText
        fill="url(#grad)"
        fontSize={fontSize}
        x="0"
        // Align baseline visually for the current font set and line-height expectations.
        y={height * 0.82}
        letterSpacing={letterSpacing}
      >
        {segments.map((seg, i) => (
          <TSpan
            key={i}
            fontFamily={seg.fontFamily}
            fontWeight={seg.fontWeight}
          >
            {seg.text}
          </TSpan>
        ))}
      </SvgText>
    </Svg>
  );
}
