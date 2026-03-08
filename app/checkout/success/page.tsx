'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Gift } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="rounded-lg border border-border bg-card p-8 text-center space-y-6">
          <CheckCircle className="h-16 w-16 text-accent mx-auto" />

          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order is being processed.
            </p>
          </div>

          <div className="bg-secondary rounded-lg p-6 space-y-4 text-left">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order ID</p>
              <p className="font-mono font-semibold text-foreground">{orderId || 'N/A'}</p>
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="font-semibold text-foreground mb-3">What's Next?</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-3">
                  <Gift className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Download link sent to your email</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Download className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Access downloads from your dashboard</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Support available for 30 days</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/dashboard" className="block">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/products" className="block">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground">
            Didn't receive your download? Check your spam folder or{' '}
            <Link href="/contact" className="text-primary hover:underline">
              contact support
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
