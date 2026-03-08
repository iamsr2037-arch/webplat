'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap, Clock, Users, CheckCircle } from 'lucide-react';

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-border py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Custom Development Services
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                Need a unique solution tailored to your specific business needs? Our expert developers are ready to bring your vision to life with custom development services.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              What We Offer
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Service 1 */}
              <div className="border border-border rounded-lg p-8 bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Web Application Development
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Full-stack web applications built with modern technologies. From single-page apps to complex enterprise solutions.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    React, Next.js, Vue development
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Node.js, Python, PHP backends
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Database design & optimization
                  </li>
                </ul>
              </div>

              {/* Service 2 */}
              <div className="border border-border rounded-lg p-8 bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Marketplace Solutions
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Build a complete e-commerce or service marketplace platform with payment integration and user management.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Product & vendor management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Payment gateway integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Order tracking & analytics
                  </li>
                </ul>
              </div>

              {/* Service 3 */}
              <div className="border border-border rounded-lg p-8 bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    UI/UX & Design Implementation
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Convert your designs into pixel-perfect, responsive web interfaces with modern frontend technologies.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Responsive design implementation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Animation & interactions
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Accessibility (WCAG) compliance
                  </li>
                </ul>
              </div>

              {/* Service 4 */}
              <div className="border border-border rounded-lg p-8 bg-card hover:border-primary/50 transition-colors">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Maintenance & Support
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Ongoing support, bug fixes, feature updates, and performance optimization for your existing applications.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    24/7 monitoring & support
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Security updates & patches
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-primary mr-2" />
                    Performance optimization
                  </li>
                </ul>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Let's Build Something Great Together
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Tell us about your project requirements, timeline, and budget. Our team will review your request and get back to you with a customized proposal.
              </p>
              <Link href="/services/request">
                <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                  Get a Custom Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="border-t border-border py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Our Process
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Consultation',
                  description: 'We discuss your requirements, goals, and timeline'
                },
                {
                  step: '02',
                  title: 'Proposal',
                  description: 'We provide a detailed scope, timeline, and cost estimate'
                },
                {
                  step: '03',
                  title: 'Development',
                  description: 'Our team builds your solution with regular updates'
                },
                {
                  step: '04',
                  title: 'Delivery',
                  description: 'Testing, deployment, and training included'
                }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-4">{item.step}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
