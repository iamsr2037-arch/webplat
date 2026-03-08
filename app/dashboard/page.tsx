'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { LogOut, Package, Download, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  productId?: string;
  amount: number;
  paymentStatus: string;
  deliveryStatus: string;
  downloadToken?: string;
  expiresAt?: string;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // TODO: Fetch orders from API
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleDownload = (token: string) => {
    if (token) {
      window.location.href = `/api/download/${token}`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/20 animate-pulse mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {user?.name}</p>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="mt-4 md:mt-0 flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Profile Info */}
        <div className="rounded-lg border border-border bg-card p-6 mb-8">
          <h2 className="font-bold text-foreground mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-semibold text-foreground">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold text-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Order History</h2>

          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-muted-foreground font-semibold">Order ID</th>
                    <th className="px-4 py-3 text-muted-foreground font-semibold">Amount</th>
                    <th className="px-4 py-3 text-muted-foreground font-semibold">Status</th>
                    <th className="px-4 py-3 text-muted-foreground font-semibold">Date</th>
                    <th className="px-4 py-3 text-muted-foreground font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-secondary/50">
                      <td className="px-4 py-3">
                        <code className="text-xs font-mono">{order.id.slice(0, 8)}...</code>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{order.amount}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`h-2 w-2 rounded-full ${
                              order.paymentStatus === 'COMPLETED' ? 'bg-accent' : 'bg-muted'
                            }`}
                          ></div>
                          <span className="text-sm">{order.paymentStatus}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center space-x-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {order.downloadToken && order.paymentStatus === 'COMPLETED' ? (
                          <Button
                            size="sm"
                            onClick={() => handleDownload(order.downloadToken!)}
                            className="bg-primary hover:bg-primary/90 text-xs"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card p-12 text-center space-y-4">
              <Package className="h-12 w-12 text-muted-foreground mx-auto opacity-50" />
              <div>
                <h3 className="font-bold text-foreground mb-2">No Orders Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start browsing templates and make your first purchase
                </p>
                <Link href="/products">
                  <Button className="bg-primary hover:bg-primary/90">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/products" className="block">
            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Package className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-bold text-foreground">Browse Products</h3>
              <p className="text-sm text-muted-foreground">Explore more templates</p>
            </div>
          </Link>

          <Link href="/services/request" className="block">
            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Package className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-bold text-foreground">Custom Service</h3>
              <p className="text-sm text-muted-foreground">Request custom development</p>
            </div>
          </Link>

          <Link href="/contact" className="block">
            <div className="rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Package className="h-6 w-6 text-primary mb-3" />
              <h3 className="font-bold text-foreground">Support</h3>
              <p className="text-sm text-muted-foreground">Get help from our team</p>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
