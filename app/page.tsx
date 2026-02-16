'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle, BookOpen, BarChart3, Users, Zap, Target } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary">ClearTechnique</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Master Government Exams with <span className="text-primary">ClearTechnique</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Complete exam preparation platform with structured roadmaps, realistic mock tests, performance analytics, and access to expert coaching—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              View Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">No credit card required • 7-day free trial</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-muted-foreground">Comprehensive tools designed specifically for competitive exam preparation</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Exams */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Supported Exams</h2>
            <p className="text-lg text-muted-foreground">Currently specializing in SSC CGL with upcoming support for other exams</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['SSC CGL', 'UPSC (Coming Soon)', 'GATE (Coming Soon)', 'Banking (Coming Soon)'].map((exam, idx) => (
              <Card key={idx} className="p-6 text-center hover:bg-primary/5 transition-colors">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold">{exam}</h4>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-16 text-center">How It Works</h2>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-6 -right-4 w-8 h-1 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Choose the plan that fits your preparation needs</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pricing.map((plan, idx) => (
              <Card key={idx} className={`p-8 flex flex-col ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <Button className="w-full mb-6" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
                <div className="space-y-3 flex-1">
                  {plan.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Transform Your Exam Preparation?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of students already achieving their goals with ClearTechnique.</p>
          <Link href="/auth/sign-up">
            <Button size="lg" variant="secondary">
              Start Your Free Trial Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center text-muted-foreground text-sm">
          <p>&copy; 2024 ClearTechnique. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: 'Structured Roadmaps',
    description: 'Follow carefully designed study roadmaps tailored for each exam with topic progression and recommended timelines.',
    icon: Target
  },
  {
    title: 'Mock Tests',
    description: 'Practice with realistic full-length exams that mirror actual exam patterns and difficulty levels.',
    icon: BarChart3
  },
  {
    title: 'Progress Analytics',
    description: 'Track your performance with detailed analytics, weak areas identification, and personalized recommendations.',
    icon: Zap
  },
  {
    title: 'Expert Coaching',
    description: 'Connect with experienced coaches for personalized guidance, doubt solving, and strategy discussions.',
    icon: Users
  },
  {
    title: 'Topic Library',
    description: 'Access comprehensive study materials, video lectures, and practice questions for every topic.',
    icon: BookOpen
  },
  {
    title: '24/7 Support',
    description: 'Get help whenever you need it with our dedicated support team available round the clock.',
    icon: Zap
  }
]

const steps = [
  {
    title: 'Choose Your Exam',
    description: 'Select the exam you want to prepare for and we\'ll create a personalized roadmap.'
  },
  {
    title: 'Follow the Roadmap',
    description: 'Study according to the structured plan with daily goals and milestone tracking.'
  },
  {
    title: 'Practice & Analyze',
    description: 'Take mock tests regularly and review detailed analytics of your performance.'
  }
]

const pricing = [
  {
    name: 'Starter',
    description: 'Perfect for beginners',
    price: '99',
    popular: false,
    features: [
      'Access to study materials',
      '2 practice tests per month',
      'Basic progress tracking',
      'Mobile app access'
    ]
  },
  {
    name: 'Pro',
    description: 'Most popular choice',
    price: '299',
    popular: true,
    features: [
      'Everything in Starter',
      'Unlimited practice tests',
      'Advanced analytics',
      'Coaching marketplace access',
      'Priority support',
      'Offline downloads'
    ]
  },
  {
    name: 'Premium',
    description: 'For serious aspirants',
    price: '599',
    popular: false,
    features: [
      'Everything in Pro',
      '1-on-1 coaching sessions',
      'Personalized study plans',
      'Doubt solving priority',
      'Mock interview prep',
      'Lifetime updates'
    ]
  }
]
