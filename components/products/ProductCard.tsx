'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const firstImage = product.images?.[0] || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop';

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={firstImage}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          onLoadingComplete={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted-foreground/10 animate-pulse" />
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground">
            {product.category}
          </span>
        </div>

        {/* Demo Button */}
        {product.demoUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors duration-300 opacity-0 group-hover:opacity-100">
            <a
              href={product.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center space-x-2 transition-colors"
            >
              <span>View Demo</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, idx) => (
              <span
                key={idx}
                className="inline-block px-2 py-1 text-xs bg-secondary text-foreground rounded"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="inline-block px-2 py-1 text-xs bg-secondary text-muted-foreground rounded">
                +{product.features.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="text-2xl font-bold text-primary">${product.price}</p>
          </div>

          <Link href={`/products/${product.id}`}>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Buy Now
            </Button>
          </Link>
        </div>

        {/* Installation Service Badge */}
        {product.installationService && (
          <div className="text-xs text-accent font-semibold flex items-center space-x-1">
            <span>📦 Installation Service Available</span>
          </div>
        )}
      </div>
    </div>
  );
}
