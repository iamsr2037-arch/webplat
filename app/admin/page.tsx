'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BarChart3, Package, ShoppingCart, Users, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('auth-token');
    router.push('/login');
  };

  if (!user) {
    return null;
  }

  const stats = [
    { label: 'Total Products', value: '24', icon: Package, color: 'bg-blue-500/10 text-blue-600' },
    { label: 'Total Orders', value: '156', icon: ShoppingCart, color: 'bg-green-500/10 text-green-600' },
    { label: 'Total Users', value: '892', icon: Users, color: 'bg-purple-500/10 text-purple-600' },
    { label: 'Revenue', value: '$45.2K', icon: BarChart3, color: 'bg-orange-500/10 text-orange-600' },
  ];

  const adminMenus = [
    { label: 'Products', href: '/admin/products', icon: Package, description: 'Add, edit, and manage products' },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart, description: 'View and manage customer orders' },
    { label: 'Users', href: '/admin/users', icon: Users, description: 'Manage user accounts and roles' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back, {user.name || 'Admin'}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-lg border border-border bg-card p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Admin Menu */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Management Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {adminMenus.map((menu) => {
              const Icon = menu.icon;
              return (
                <Link key={menu.href} href={menu.href}>
                  <div className="rounded-lg border border-border bg-card p-6 hover:border-primary transition-colors cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{menu.label}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{menu.description}</p>
                    <div className="mt-4">
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Manage →
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-border bg-secondary/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Event</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">New order received</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">2 hours ago</td>
                  <td className="px-6 py-4 text-sm"><span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600">Completed</span></td>
                </tr>
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">Product updated</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">4 hours ago</td>
                  <td className="px-6 py-4 text-sm"><span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600">Updated</span></td>
                </tr>
                <tr className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">New user registered</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">6 hours ago</td>
                  <td className="px-6 py-4 text-sm"><span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
