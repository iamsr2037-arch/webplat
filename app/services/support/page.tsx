'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Zap, Clock, Award, Phone, Mail, MessageSquare } from 'lucide-react';

export default function SupportPage() {
  const supportTiers = [
    {
      name: 'Basic Support',
      description: 'Email support for your purchased scripts',
      price: 'Included',
      features: [
        'Email support',
        'Response time: 24-48 hours',
        'Bug fixes and updates',
        'Documentation access',
      ],
    },
    {
      name: 'Priority Support',
      description: 'Fast-track support with priority handling',
      price: '$49/month',
      features: [
        'Email & chat support',
        'Response time: 4-8 hours',
        'Priority bug fixes',
        'Monthly video consultation',
        'Access to private support channel',
      ],
      highlighted: true,
    },
    {
      name: 'Premium Support',
      description: 'Dedicated account manager and 24/7 support',
      price: '$149/month',
      features: [
        '24/7 phone, email & chat',
        'Response time: 1 hour',
        'Dedicated account manager',
        'Weekly video consultations',
        'Custom development assistance',
        'Priority feature requests',
      ],
    },
  ];

  const supportChannels = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send detailed questions and receive comprehensive responses within 24 hours',
      contact: 'support@scriptmarket.com',
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Real-time chat support during business hours (9 AM - 6 PM UTC)',
      contact: 'Available in dashboard',
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'For Premium tier members, direct phone support with our technical team',
      contact: '+1 (555) 123-4567',
    },
  ];

  const faqs = [
    {
      question: 'What is included in Basic Support?',
      answer: 'Basic Support includes email assistance for setup, bug reports, and general questions. You\'ll receive responses within 24-48 hours and have access to all documentation and updates for your scripts.',
    },
    {
      question: 'Can I upgrade my support tier later?',
      answer: 'Yes! You can upgrade to Priority or Premium Support at any time. We\'ll pro-rate your charges and you\'ll immediately get access to the higher tier benefits.',
    },
    {
      question: 'What types of issues are covered?',
      answer: 'We support installation issues, bug fixes, feature questions, update assistance, and integration help. Custom development requests are handled separately through our Custom Development Service.',
    },
    {
      question: 'Is there a support SLA?',
      answer: 'Yes, all support tiers have guaranteed response times. Basic: 24-48h, Priority: 4-8h, Premium: 1 hour. Critical issues receive priority handling.',
    },
    {
      question: 'How do I contact support?',
      answer: 'Log in to your dashboard to access support channels, or email support@scriptmarket.com. Premium members can call our dedicated support line.',
    },
    {
      question: 'What happens after 12 months?',
      answer: 'Support subscriptions auto-renew monthly unless cancelled. You can manage your subscription in your dashboard at any time.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Expert Support for Your Scripts
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            We're here to help you succeed. Choose the support tier that fits your needs and get assistance when you need it.
          </p>
        </div>
      </section>

      {/* Support Tiers */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 w-full">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Support Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {supportTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-xl border overflow-hidden transition-all ${
                tier.highlighted
                  ? 'border-primary bg-primary/5 shadow-lg scale-105'
                  : 'border-border bg-card'
              }`}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>

                <div className="mb-8">
                  <p className="text-3xl font-bold text-primary">{tier.price}</p>
                  {tier.price !== 'Included' && <p className="text-sm text-muted-foreground">per month, billed monthly</p>}
                </div>

                <Button className="w-full mb-8 bg-primary hover:bg-primary/90">
                  {tier.price === 'Included' ? 'Get Started' : 'Subscribe Now'}
                </Button>

                <div className="space-y-4">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Channels */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 w-full">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How to Reach Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div key={index} className="border border-border rounded-lg p-8 bg-card">
                <Icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">{channel.title}</h3>
                <p className="text-muted-foreground mb-6">{channel.description}</p>
                <p className="text-primary font-semibold">{channel.contact}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Response Time Guarantees */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 w-full">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Commitment</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border border-border rounded-lg p-8 bg-card text-center">
            <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Fast Response</h3>
            <p className="text-muted-foreground">Guaranteed response times based on your support tier, every single time</p>
          </div>
          <div className="border border-border rounded-lg p-8 bg-card text-center">
            <Award className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Expert Help</h3>
            <p className="text-muted-foreground">Our team has decades of combined experience with web development and support</p>
          </div>
          <div className="border border-border rounded-lg p-8 bg-card text-center">
            <Zap className="h-12 w-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Proactive Support</h3>
            <p className="text-muted-foreground">We help you succeed with guides, tutorials, and best practices</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 w-full">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-3">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 w-full text-center">
        <h2 className="text-3xl font-bold text-foreground mb-6">Ready to get started?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Choose your support tier and get the help you need. If you have questions, email us anytime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/services/request">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Request Custom Support
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="lg" variant="outline">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
