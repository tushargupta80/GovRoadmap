'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Checkout from '@/components/checkout'
import { PRODUCTS, getProductsByBillingPeriod } from '@/lib/products'
import { CheckCircle } from 'lucide-react'
import { Target } from 'lucide-react'

export default function PricingPage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month')

  const products = getProductsByBillingPeriod(billingPeriod)

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4 sm:p-8">
          <div className="max-w-2xl mx-auto">
            <Link href="/pricing">
              <Button variant="outline" className="mb-6">← Back to Pricing</Button>
            </Link>
            <Checkout productId={selectedProduct} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">ClearTechnique</span>
          </Link>
          <Link href="/">
            <Button variant="ghost">Back to Home</Button>
          </Link>
        </div>
      </nav>

      <main className="p-4 sm:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your exam preparation journey. All plans include a 7-day free trial.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-4 bg-muted p-1 rounded-lg">
              <button
                onClick={() => setBillingPeriod('month')}
                className={`px-6 py-2 rounded-md font-semibold transition-all ${
                  billingPeriod === 'month'
                    ? 'bg-background text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('year')}
                className={`px-6 py-2 rounded-md font-semibold transition-all flex items-center gap-2 ${
                  billingPeriod === 'year'
                    ? 'bg-background text-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                Yearly
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">Save up to 25%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {products.map((product) => {
              const isPopular = product.id.includes('pro-monthly') || product.id.includes('pro-yearly')
              const isPremium = product.id.includes('premium')
              
              return (
                <Card
                  key={product.id}
                  className={`p-8 flex flex-col transition-all ${
                    isPopular ? 'ring-2 ring-primary lg:scale-105' : ''
                  }`}
                >
                  {isPopular && (
                    <div className="mb-4">
                      <span className="text-xs font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{product.description}</p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-5xl font-bold">₹{product.priceInINR}</span>
                    <span className="text-muted-foreground ml-2">/{product.billingPeriod === 'month' ? 'month' : 'year'}</span>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => setSelectedProduct(product.id)}
                    variant={isPopular ? 'default' : 'outline'}
                    className="w-full mb-8"
                  >
                    Get Started
                  </Button>

                  {/* Features */}
                  <div className="space-y-4 flex-1">
                    <p className="text-sm font-semibold text-muted-foreground mb-4">What's included:</p>
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: 'Can I change my plan anytime?',
                  a: 'Yes, you can upgrade or downgrade your plan at any time. Changes will reflect in your next billing cycle.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, debit cards, and online payment methods through Stripe.'
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Yes! All plans come with a 7-day free trial. No credit card required to start.'
                },
                {
                  q: 'What happens after my trial ends?',
                  a: 'Your plan will automatically convert to a paid subscription. You\'ll receive a reminder email before the trial ends.'
                },
                {
                  q: 'Can I cancel anytime?',
                  a: 'Absolutely. You can cancel your subscription anytime from your dashboard without any penalty.'
                },
                {
                  q: 'Do you offer refunds?',
                  a: 'We offer a 7-day money-back guarantee if you\'re not satisfied with our service.'
                }
              ].map((faq, idx) => (
                <Card key={idx} className="p-6">
                  <h4 className="font-semibold mb-2">{faq.q}</h4>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">Questions? Reach out to our support team</p>
            <div className="flex gap-4 justify-center">
              <Button variant="outline">Contact Support</Button>
              <Button>Start Free Trial</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
