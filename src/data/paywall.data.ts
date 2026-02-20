export const paywallData = {
  title: {
    brand: 'PlantApp',
    premium: ' Premium',
  },
  subtitle: 'Access All Features',
  features: [
    { id: 'unlimited', title: 'Unlimited', subtitle: 'Plant Identify' },
    { id: 'faster', title: 'Faster', subtitle: 'Process' },
    { id: 'detailed', title: 'Detailed', subtitle: 'Plant care' },
  ],
  plans: {
    monthly: {
      id: 'monthly',
      title: '1 Month',
      priceText: '$2.99/month',
      noteText: ', auto renewable',
    },
    yearly: {
      id: 'yearly',
      title: '1 Year',
      description: 'First 3 days free, then $529,99/year',
      badge: 'Save 50%',
    },
  },
  cta: 'Try free for 3 days',
  trialInfo:
    "After the 3-day free trial period you'll be charged ₺274.99 per year unless you cancel before the trial expires. Yearly Subscription is Auto-Renewable",
  terms: ['Terms', 'Privacy', 'Restore'],
} as const;
