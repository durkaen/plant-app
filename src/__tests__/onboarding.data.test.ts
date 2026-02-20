import { stepOneData, stepTwoData, stepThreeData } from '@/data/onboarding.data';

describe('stepOneData', () => {
  it('has the correct title parts', () => {
    expect(stepOneData.title.regular).toBe('Welcome to ');
    expect(stepOneData.title.bold).toBe('PlantApp');
  });

  it('button text is "Get Started"', () => {
    expect(stepOneData.button).toBe('Get Started');
  });

  it('has a non-empty subtitle', () => {
    expect(stepOneData.subtitle.length).toBeGreaterThan(0);
  });

  it('has legal prefix and two link labels', () => {
    expect(stepOneData.legal.prefix.length).toBeGreaterThan(0);
    expect(stepOneData.legal.link1.length).toBeGreaterThan(0);
    expect(stepOneData.legal.link2.length).toBeGreaterThan(0);
  });

  it('has an image source', () => {
    expect(stepOneData.image).toBeTruthy();
  });
});

describe('stepTwoData', () => {
  it('button text is "Continue"', () => {
    expect(stepTwoData.button).toBe('Continue');
  });

  it('has all three title parts', () => {
    expect(stepTwoData.title.part1.length).toBeGreaterThan(0);
    expect(stepTwoData.title.bold.length).toBeGreaterThan(0);
    expect(stepTwoData.title.part2.length).toBeGreaterThan(0);
  });

  it('has an image source', () => {
    expect(stepTwoData.image).toBeTruthy();
  });
});

describe('stepThreeData', () => {
  it('button text is "Continue"', () => {
    expect(stepThreeData.button).toBe('Continue');
  });

  it('has both title parts', () => {
    expect(stepThreeData.title.part1.length).toBeGreaterThan(0);
    expect(stepThreeData.title.bold.length).toBeGreaterThan(0);
  });

  it('has an image source', () => {
    expect(stepThreeData.image).toBeTruthy();
  });

  it('steps two and three share the same button text', () => {
    expect(stepTwoData.button).toBe(stepThreeData.button);
  });
});
