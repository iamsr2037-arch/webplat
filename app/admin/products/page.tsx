'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { ArrowLeft, Trash2, Edit2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductsAdmin() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    loadProducts();
  }, [router]);

  const loadProducts = () => {
    // Load demo products
    const demoProducts = [
      { id: '1', title: 'E-Commerce Platform', description: 'Full-featured e-commerce solution', price: 2999, category: 'E-Commerce' },
      { id: '2', title: 'SaaS Dashboard', description: 'Responsive SaaS dashboard template', price: 1499, category: 'Dashboard' },
      { id: '3', title: 'Booking System', description: 'Complete appointment booking system', price: 1899, category: 'Booking' },
    ];
    setProducts(demoProducts);
  };

  const handleAddProduct = () => {
    if (!formData.title || !formData.price) {
      alert('Title and price are required');
      return;
    }

    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
      setEditingId(null);
    } else {
      setProducts([...products, { ...formData, id: Date.now().toString() }]);
    }

    setFormData({ title: '', description: '', price: '', category: '' });
    setShowForm(false);
  };

  const handleEdit = (product: any) => {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/admin" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </Link>
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: '', description: '', price: '', category: '' }); }} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="rounded-lg border border-border bg-card p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Title *</label>
                <Input
                  placeholder="Product title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <Textarea
                  placeholder="Product description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Price (USD) *</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select category</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="Booking">Booking</option>
                    <option value="CRM">CRM</option>
                    <option value="Blog">Blog</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => { setShowForm(false); setEditingId(null); setFormData({ title: '', description: '', price: '', category: '' }); }}>
                  Cancel
                </Button>
                <Button onClick={handleAddProduct} className="bg-primary hover:bg-primary/90">
                  {editingId ? 'Update Product' : 'Add Product'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border bg-secondary/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground">{product.title}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{product.category || '-'}</td>
                  <td className="px-6 py-4 text-sm text-foreground font-semibold">${product.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(product)} className="flex items-center gap-1">
                        <Edit2 className="h-3 w-3" /> Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(product.id)} className="flex items-center gap-1 text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
