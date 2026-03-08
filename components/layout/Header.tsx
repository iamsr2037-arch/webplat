'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">SM</span>
            </div>
            <span className="hidden font-bold text-foreground sm:inline-block">
              Script Market
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/products"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Products
            </Link>
            <Link
              href="/services"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </div>

          {/* Auth & Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Register
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              suppressHydrationWarning
            >
              {isMounted && (isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMounted && isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/products"
              className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
            >
              Products
            </Link>
            <Link
              href="/services"
              className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
            >
              About
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
