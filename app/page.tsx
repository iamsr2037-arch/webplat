'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Code2, Zap, Shield, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background" suppressHydrationWarning>
      <Header />

      {/* Hero Section */}
      <section className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              <span className="text-balance">
                Premium Website Templates & Custom Development
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg">
              Browse thousands of ready-to-use website templates, purchase them with one click, or request custom development services. Everything you need to launch your next project.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                  Browse Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services/request">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Request Custom Service
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-6 pt-4 text-sm text-muted-foreground">
              <div>1,000+ Templates</div>
              <div>10,000+ Happy Customers</div>
              <div>24/7 Support</div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="hidden md:block">
            <div className="relative h-96 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <Code2 className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Why Choose Us?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide everything you need to launch professional websites quickly and affordably.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Zap,
              title: 'Instant Access',
              description: 'Get instant access to your purchased templates after payment'
            },
            {
              icon: Code2,
              title: 'Quality Code',
              description: 'Clean, maintainable code written by experienced developers'
            },
            {
              icon: Shield,
              title: 'Secure Checkout',
              description: 'Safe and secure payment processing with SSLCommerz'
            },
            {
              icon: Users,
              title: 'Expert Support',
              description: 'Get help from our support team whenever you need it'
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow">
                <Icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="rounded-xl bg-primary p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto mb-8">
            Browse our collection of premium templates or request a custom solution tailored to your needs.
          </p>
          <Link href="/products">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              Explore Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
