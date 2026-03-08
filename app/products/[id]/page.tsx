'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, Check, Package, Clock, Shield, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  demoUrl?: string;
  images?: string[];
  features?: string[];
  installationService?: boolean;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [installationChecked, setInstallationChecked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (error) {
        console.error('[v0] Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleBuyNow = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      // Redirect to login
      window.location.href = '/login?redirect=' + window.location.pathname;
      return;
    }

    const userData = JSON.parse(user);

    try {
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          userId: userData.id,
          installationService: installationChecked && product?.installationService,
        }),
      });

      const data = await response.json();

      if (data.paymentUrl) {
        // Redirect to SSLCommerz payment gateway
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error('[v0] Failed to initiate payment:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/20 animate-pulse mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-semibold text-foreground mb-4">Product not found</p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90">
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const firstImage = product.images?.[0] || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop';
  const totalPrice = product.price + (installationChecked && product.installationService ? 99.99 : 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted border border-border">
              <Image
                src={firstImage}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                      selectedImage === idx ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Tag className="h-5 w-5 text-primary" />
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-primary text-primary-foreground">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-foreground">{product.title}</h1>
              <p className="text-lg text-muted-foreground">{product.description}</p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-foreground">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Services */}
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Base Price</p>
                <p className="text-3xl font-bold text-primary">${product.price}</p>
              </div>

              {product.installationService && (
                <div className="border-t border-border pt-4 space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={installationChecked}
                      onChange={(e) => setInstallationChecked(e.target.checked)}
                      className="w-4 h-4 rounded border-border mt-1"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        Add Installation Service (+$99.99)
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Let our experts install and set up the template for you
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Total */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground">Subtotal</span>
                  <span className="font-semibold">${product.price}</span>
                </div>
                {installationChecked && product.installationService && (
                  <div className="flex justify-between">
                    <span className="text-foreground">Installation</span>
                    <span className="font-semibold">$99.99</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Demo & Action Buttons */}
            <div className="space-y-3">
              {product.demoUrl && (
                <a href={product.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/5"
                    size="lg"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live Demo
                  </Button>
                </a>
              )}

              <Button
                onClick={handleBuyNow}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                <Package className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-secondary">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Delivery</p>
                  <p className="font-semibold text-foreground">Instant</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Support</p>
                  <p className="font-semibold text-foreground">24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
