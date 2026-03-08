'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In demo mode, just show success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('[v0] Contact form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('[v0] Contact form error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" suppressHydrationWarning>
      <Header />

      <main className="flex-1 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-20 w-full">
        <div className="space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions about our templates or services? We're here to help. Contact us and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Info & Form */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Email</h3>
                </div>
                <p className="text-muted-foreground">
                  For general inquiries and support
                </p>
                <a
                  href="mailto:support@scriptmarketplace.com"
                  className="text-primary hover:underline font-medium"
                >
                  support@scriptmarketplace.com
                </a>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Phone</h3>
                </div>
                <p className="text-muted-foreground">
                  Available for urgent support
                </p>
                <a href="tel:+8801234567890" className="text-primary hover:underline font-medium">
                  +880 123 456 7890
                </a>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Office</h3>
                </div>
                <p className="text-muted-foreground">
                  Dhaka, Bangladesh
                </p>
                <p className="text-muted-foreground text-sm">
                  Hours: Mon-Fri 9AM-6PM (UTC+6)
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-secondary/50 border border-border rounded-lg p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">✓</div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell us what you're looking for..."
                        value={formData.message}
                        onChange={handleChange}
                        className="min-h-32"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary hover:bg-primary/90"
                      size="lg"
                    >
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-secondary/30 border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">What's your response time?</h3>
                <p className="text-muted-foreground text-sm">
                  We typically respond to all inquiries within 24 business hours.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Do you offer custom development?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes! Visit our Custom Services page to request a quote for your project.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Can I get a refund?</h3>
                <p className="text-muted-foreground text-sm">
                  We offer a 7-day money-back guarantee on all product purchases.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Do you provide support?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer multiple support tiers. Check our support services page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
