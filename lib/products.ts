export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  priceInINR: number
  billingPeriod: 'month' | 'year'
  features: string[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'starter-monthly',
    name: 'Starter',
    description: 'Perfect for beginners',
    priceInCents: 1299, // $12.99
    priceInINR: 99,
    billingPeriod: 'month',
    features: [
      'Access to study materials',
      '2 practice tests per month',
      'Basic progress tracking',
      'Mobile app access',
      'Email support'
    ]
  },
  {
    id: 'pro-monthly',
    name: 'Pro',
    description: 'Most popular choice',
    priceInCents: 3899, // $38.99
    priceInINR: 299,
    billingPeriod: 'month',
    features: [
      'Everything in Starter',
      'Unlimited practice tests',
      'Advanced analytics',
      'Coaching marketplace access',
      'Priority support',
      'Offline downloads',
      'Custom study plans'
    ]
  },
  {
    id: 'premium-monthly',
    name: 'Premium',
    description: 'For serious aspirants',
    priceInCents: 7799, // $77.99
    priceInINR: 599,
    billingPeriod: 'month',
    features: [
      'Everything in Pro',
      '1-on-1 coaching sessions',
      'Personalized study plans',
      'Doubt solving priority',
      'Mock interview prep',
      'Weekly progress calls',
      'Lifetime updates',
      'Dedicated support'
    ]
  },
  {
    id: 'pro-yearly',
    name: 'Pro (Yearly)',
    description: 'Save 20% with annual billing',
    priceInCents: 37190, // $371.99 (20% off)
    priceInINR: 2850,
    billingPeriod: 'year',
    features: [
      'Everything in Pro',
      'Plus all yearly benefits',
      '20% discount vs monthly',
      'Priority support'
    ]
  },
  {
    id: 'premium-yearly',
    name: 'Premium (Yearly)',
    description: 'Save 25% with annual billing',
    priceInCents: 58492, // $584.92 (25% off)
    priceInINR: 4490,
    billingPeriod: 'year',
    features: [
      'Everything in Premium',
      'Plus all yearly benefits',
      '25% discount vs monthly',
      'Dedicated support'
    ]
  }
]

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function getProductsByBillingPeriod(period: 'month' | 'year'): Product[] {
  return PRODUCTS.filter(p => p.billingPeriod === period)
}
