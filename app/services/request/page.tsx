'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ServiceRequestPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    businessType: '',
    budget: '',
    timeline: '',
    featuresNeeded: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = localStorage.getItem('user');
    if (!user) {
      window.location.href = '/login?redirect=' + window.location.pathname;
      return;
    }

    // Validation
    if (!formData.businessType || !formData.budget || !formData.timeline || !formData.featuresNeeded) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const userData = JSON.parse(user);
      const response = await fetch('/api/services/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId: userData.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit request');
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('[v0] Service request error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="rounded-lg border border-border bg-card p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Request Custom Development</h1>
            <p className="text-muted-foreground">
              Tell us about your project and we'll provide a quote tailored to your needs
            </p>
          </div>

          {success ? (
            <div className="rounded-lg border border-border bg-secondary p-6 text-center space-y-3">
              <h3 className="font-bold text-foreground">Request Submitted!</h3>
              <p className="text-muted-foreground">
                Thank you for your service request. Our team will review it and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Business Type *
            </label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              suppressHydrationWarning
            >
              <option value="">Select your business type</option>
              <option value="ecommerce">E-Commerce Store</option>
              <option value="saas">SaaS Platform</option>
              <option value="blog">Blog/Content Site</option>
              <option value="corporate">Corporate Website</option>
              <option value="portfolio">Portfolio</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Budget Range *
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              suppressHydrationWarning
            >
              <option value="">Select your budget</option>
              <option value="5000">$5,000 - $10,000</option>
              <option value="10000">$10,000 - $25,000</option>
              <option value="25000">$25,000 - $50,000</option>
              <option value="50000">$50,000+</option>
            </select>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Timeline *
            </label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              suppressHydrationWarning
            >
              <option value="">Select timeline</option>
              <option value="urgent">Urgent (1-2 weeks)</option>
              <option value="1month">1 Month</option>
              <option value="2months">2-3 Months</option>
              <option value="3months">3+ Months</option>
            </select>
          </div>

          {/* Features Needed */}
          <div>
            <label htmlFor="features" className="block text-sm font-medium text-foreground mb-2">
              Features & Requirements *
            </label>
            <Textarea
              id="features"
              name="featuresNeeded"
              placeholder="Describe what you need... (Features, integrations, design preferences, etc.)"
              value={formData.featuresNeeded}
              onChange={handleChange}
              className="min-h-32"
              required
            />
          </div>

          {error && (
            <div className="px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? 'Submitting...' : 'Submit Request'}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            We'll get back to you within 24 hours with a detailed quote
          </p>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
