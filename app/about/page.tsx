'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Code2, Users, Zap, Award, Target, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              About Script Marketplace
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Empowering developers and businesses with premium digital solutions and custom development services.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  To democratize access to high-quality web solutions by providing affordable, ready-to-use scripts and connecting businesses with expert developers for custom development projects.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  To become the leading marketplace for digital solutions, trusted by entrepreneurs, agencies, and enterprises for delivering quality, innovation, and reliable service.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Why Choose Us?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Quality Code */}
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Code2 className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Quality Code</h3>
                <p className="text-muted-foreground">
                  All scripts are built with clean, maintainable code following industry best practices and modern development standards.
                </p>
              </div>

              {/* Expert Team */}
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Expert Team</h3>
                <p className="text-muted-foreground">
                  Our experienced developers and designers bring years of industry expertise to every project and solution.
                </p>
              </div>

              {/* 24/7 Support */}
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  We provide responsive support and guidance to ensure your success with every purchase and custom project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">What We Offer</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Ready Scripts */}
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0 mt-1">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Ready-Made Scripts</h3>
                    <p className="text-muted-foreground">
                      Pre-built, tested solutions ready for immediate use. Save time and money with our production-ready templates and scripts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0 mt-1">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Installation Service</h3>
                    <p className="text-muted-foreground">
                      Let our experts handle the setup and configuration of your chosen script on your server.
                    </p>
                  </div>
                </div>
              </div>

              {/* Custom Development */}
              <div>
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0 mt-1">
                    <Code2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Custom Development</h3>
                    <p className="text-muted-foreground">
                      Tailored solutions built specifically for your unique business needs and requirements.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0 mt-1">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Consultation</h3>
                    <p className="text-muted-foreground">
                      Expert guidance to help you choose the right solution for your project and business goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our marketplace or request a custom development quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Browse Products
                </Button>
              </Link>
              <Link href="/services/request">
                <Button size="lg" variant="outline">
                  Request Custom Service
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
