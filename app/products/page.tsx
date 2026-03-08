'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

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

const CATEGORIES = [
  'All',
  'E-Commerce',
  'Dashboard',
  'Booking',
  'CRM',
  'Blog',
  'Landing Page',
  'Admin Panel',
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products?take=100');
        const data = await response.json();
        
        if (response.ok && data.products) {
          setProducts(Array.isArray(data.products) ? data.products : []);
        } else {
          console.error('[v0] API error:', data.error);
          setProducts([]);
        }
      } catch (error) {
        console.error('[v0] Failed to fetch products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log('[v0] Filter effect running. Selected category:', selectedCategory, 'Total products:', products.length);
    
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
      console.log('[v0] After category filter:', filtered.length);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      console.log('[v0] After search filter:', filtered.length);
    }

    console.log('[v0] Final filtered products:', filtered.length);
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Search Section */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Browse Templates
              </h1>
              <p className="text-muted-foreground">
                Discover thousands of premium website templates and scripts
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                className="pl-10 py-3 bg-background border border-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-48 flex-shrink-0">
            <div className="rounded-lg border border-border bg-card p-4 sticky top-20">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="h-5 w-5" />
                <h2 className="font-bold text-foreground">Categories</h2>
              </div>

              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      console.log('[v0] Category clicked:', category);
                      setSelectedCategory(category);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 animate-pulse mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading templates...</p>
                </div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <p className="text-xl font-semibold text-foreground mb-2">
                    No templates found
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} templates
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
