'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, Clock, Headphones, Zap } from 'lucide-react';

export default function InstallationServices() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-border py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Installation & Setup Services
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                We handle the technical setup so you can focus on your business. Our expert team will install, configure, and deploy your script with professional precision.
              </p>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              What's Included in Our Service
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-border rounded-lg p-8 bg-card">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Full Installation
                    </h3>
                    <p className="text-muted-foreground">
                      Complete setup on your hosting environment including database configuration, file uploads, and initial deployment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-8 bg-card">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Configuration & Customization
                    </h3>
                    <p className="text-muted-foreground">
                      Tailor the script to your specific requirements including branding, settings, and initial data setup.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-8 bg-card">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Headphones className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Support & Training
                    </h3>
                    <p className="text-muted-foreground">
                      Comprehensive training for your team plus 30 days of technical support to ensure smooth operation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-lg p-8 bg-card">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Quick Turnaround
                    </h3>
                    <p className="text-muted-foreground">
                      Most installations completed within 3-5 business days. Your script will be live and ready to use quickly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Our Installation Process
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Assessment', description: 'Review your requirements and hosting setup' },
                { step: 2, title: 'Setup', description: 'Configure server, database, and dependencies' },
                { step: 3, title: 'Deployment', description: 'Deploy and test all functionality' },
                { step: 4, title: 'Handover', description: 'Training and documentation provided' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              Transparent Pricing
            </h2>

            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <p className="text-muted-foreground mb-6">
                Installation service pricing depends on your script complexity and hosting setup. Get a customized quote tailored to your needs.
              </p>
              <Link href="/services/request">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today and let our experts handle your installation. We'll have your script up and running in no time.
            </p>
            <Link href="/services/request">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Request Installation Service
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
