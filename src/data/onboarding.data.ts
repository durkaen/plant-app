const images = {
  step1: require('../../assets/images/design/onboarding/step-1.png'),
  step2: require('../../assets/images/design/onboarding/step-2.png'),
  step3: require('../../assets/images/design/onboarding/step-3.png'),
} as const;

export const stepOneData = {
  image: images.step1,
  title: {
    regular: 'Welcome to ',
    bold: 'PlantApp',
  },
  subtitle: 'Identify more than 3000+ plants and 88% accuracy.',
  button: 'Get Started',
  legal: {
    prefix: 'By tapping next, you are agreeing to PlantID',
    link1: 'Terms of Use',
    link2: 'Privacy Policy',
  },
} as const;

export const stepTwoData = {
  image: images.step2,
  title: {
    part1: 'Take a photo to ',
    bold: ' identify ',
    part2: 'the plant!',
  },
  button: 'Continue',
} as const;

export const stepThreeData = {
  image: images.step3,
  title: {
    part1: 'Get plant ',
    bold: 'care guides',
  },
  button: 'Continue',
} as const;
