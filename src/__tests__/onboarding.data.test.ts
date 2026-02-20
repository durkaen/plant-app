import {
  GetStartedData,
  Slide1Data,
  Slide2Data,
  PaywallData,
  DotsData,
} from '@/data/onboarding.data';

describe('GetStartedData', () => {
  it('has the correct title parts', () => {
    expect(GetStartedData.title.regular).toBe('Welcome to ');
    expect(GetStartedData.title.bold).toBe('PlantApp');
  });

  it('button text is "Get Started"', () => {
    expect(GetStartedData.button.text).toBe('Get Started');
  });

  it('has a subtitle text', () => {
    expect(GetStartedData.subtitle.text.length).toBeGreaterThan(0);
  });
});

describe('Slide1Data & Slide2Data', () => {
  it('both slides have "Continue" button text', () => {
    expect(Slide1Data.button.text).toBe('Continue');
    expect(Slide2Data.button.text).toBe('Continue');
  });

  it('both slides share the same primary button color', () => {
    expect(Slide1Data.button.backgroundColor).toBe(Slide2Data.button.backgroundColor);
  });
});

describe('PaywallData', () => {
  it('has exactly two plan options', () => {
    expect(PaywallData.plans).toHaveLength(2);
  });

  it('each plan has an id, period, and description', () => {
    for (const plan of PaywallData.plans) {
      expect(plan.id).toBeTruthy();
      expect(plan.period).toBeTruthy();
      expect(plan.description).toBeTruthy();
    }
  });

  it('the yearly plan has a "Save 50%" badge', () => {
    const yearly = PaywallData.plans.find((p) => p.id === 'year');
    expect(yearly?.badge).toBe('Save 50%');
  });

  it('close button shows after 2 seconds', () => {
    expect(PaywallData.closeButton.showAfterMs).toBe(2000);
  });
});

describe('DotsData', () => {
  it('total is 2 (slides 1 and 2 only)', () => {
    expect(DotsData.total).toBe(2);
  });

  it('active dot is larger than inactive dot', () => {
    expect(DotsData.activeDotSize).toBeGreaterThan(DotsData.inactiveDotSize);
  });
});
