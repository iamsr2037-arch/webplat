'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const failed = searchParams.get('failed');
  const cancelled = searchParams.get('cancelled');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="rounded-lg border border-border bg-card p-8 text-center space-y-6">
          <AlertCircle className="h-12 w-12 text-accent mx-auto" />

          {failed ? (
            <>
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Payment Failed</h1>
                <p className="text-muted-foreground">
                  We couldn't process your payment. Please try again or contact support.
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/products" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Try Another Product
                  </Button>
                </Link>
                <Link href="/contact" className="block">
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </>
          ) : cancelled ? (
            <>
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Payment Cancelled</h1>
                <p className="text-muted-foreground">
                  You cancelled the payment. Feel free to continue shopping or try again later.
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/products" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Checkout</h1>
                <p className="text-muted-foreground">
                  Select a product from our catalog to proceed with payment.
                </p>
              </div>

              <Link href="/products" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Browse Products
                </Button>
              </Link>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
