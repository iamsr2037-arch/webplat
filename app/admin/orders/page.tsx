'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrdersAdmin() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    loadOrders();
  }, [router]);

  const loadOrders = () => {
    // Load demo orders
    const demoOrders = [
      {
        id: 'ORD-001',
        customer: 'John Doe',
        product: 'E-Commerce Platform',
        amount: 2999,
        status: 'Completed',
        date: '2024-02-20',
        email: 'john@example.com',
      },
      {
        id: 'ORD-002',
        customer: 'Jane Smith',
        product: 'SaaS Dashboard',
        amount: 1499,
        status: 'Pending',
        date: '2024-02-21',
        email: 'jane@example.com',
      },
      {
        id: 'ORD-003',
        customer: 'Bob Wilson',
        product: 'Booking System',
        amount: 1899,
        status: 'Shipped',
        date: '2024-02-22',
        email: 'bob@example.com',
      },
      {
        id: 'ORD-004',
        customer: 'Alice Brown',
        product: 'CRM Platform',
        amount: 3499,
        status: 'Completed',
        date: '2024-02-23',
        email: 'alice@example.com',
      },
    ];
    setOrders(demoOrders);
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 text-green-600';
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-600';
      case 'Shipped':
        return 'bg-blue-500/10 text-blue-600';
      default:
        return 'bg-gray-500/10 text-gray-600';
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <Link href="/admin" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-foreground mb-6">Orders Management</h1>
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <table className="w-full">
                <thead className="border-b border-border bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Customer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-secondary/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-semibold text-foreground">{order.id}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{order.customer}</td>
                      <td className="px-6 py-4 text-sm text-foreground">${order.amount}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="h-3 w-3" /> View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Details */}
          {selectedOrder && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Order Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground uppercase">Order ID</label>
                  <p className="text-foreground font-semibold">{selectedOrder.id}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase">Customer</label>
                  <p className="text-foreground font-semibold">{selectedOrder.customer}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase">Email</label>
                  <p className="text-foreground">{selectedOrder.email}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase">Product</label>
                  <p className="text-foreground">{selectedOrder.product}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase">Amount</label>
                  <p className="text-2xl font-bold text-primary">${selectedOrder.amount}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase">Date</label>
                  <p className="text-foreground">{selectedOrder.date}</p>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground uppercase mb-2 block">Status</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                    className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <Button
                  onClick={() => setSelectedOrder(null)}
                  variant="outline"
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
