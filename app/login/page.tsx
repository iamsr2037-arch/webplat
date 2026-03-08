'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        setIsLoading(false);
        return;
      }

      // Store user info (in production, use secure session management)
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('auth-token', data.user.id);

      // Redirect based on role
      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('[v0] Login error:', error);
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const quickLoginAdmin = () => {
    setEmail('admin@scriptmarket.com');
    setPassword('admin123456');
  };

  const quickLoginCustomer = () => {
    setEmail('customer@example.com');
    setPassword('customer123456');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-border bg-card p-8 space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Sign in to access your dashboard and manage your purchases
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Demo Credentials (for testing)</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Admin Account:</p>
                  <p className="text-sm font-mono bg-background/50 px-2 py-1 rounded text-foreground">admin@scriptmarket.com / admin123456</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={quickLoginAdmin}
                    disabled={isLoading}
                    className="w-full mt-1"
                  >
                    Login as Admin
                  </Button>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Customer Account:</p>
                  <p className="text-sm font-mono bg-background/50 px-2 py-1 rounded text-foreground">customer@example.com / customer123456</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={quickLoginCustomer}
                    disabled={isLoading}
                    className="w-full mt-1"
                  >
                    Login as Customer
                  </Button>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
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
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/register" className="text-primary hover:underline font-semibold">
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
