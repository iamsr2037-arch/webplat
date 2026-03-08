'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeft, Trash2, Edit2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UsersAdmin() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'CUSTOMER',
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(userData));
    loadUsers();
  }, [router]);

  const loadUsers = () => {
    // Load demo users
    const demoUsers = [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'CUSTOMER', joinDate: '2024-01-15' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'CUSTOMER', joinDate: '2024-01-20' },
      { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'CUSTOMER', joinDate: '2024-02-05' },
      { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'ADMIN', joinDate: '2023-12-01' },
    ];
    setUsers(demoUsers);
  };

  const handleAddUser = () => {
    if (!formData.name || !formData.email) {
      alert('Name and email are required');
      return;
    }

    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...formData } : u));
      setEditingId(null);
    } else {
      setUsers([...users, { ...formData, id: Date.now().toString(), joinDate: new Date().toISOString().split('T')[0] }]);
    }

    setFormData({ name: '', email: '', role: 'CUSTOMER' });
    setShowForm(false);
  };

  const handleEdit = (user: any) => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const getRoleColor = (role: string) => {
    return role === 'ADMIN' ? 'bg-red-500/10 text-red-600' : 'bg-blue-500/10 text-blue-600';
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
          <Button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ name: '', email: '', role: 'CUSTOMER' }); }} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="rounded-lg border border-border bg-card p-6 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-4">{editingId ? 'Edit User' : 'Add New User'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name *</label>
                <Input
                  placeholder="User name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="CUSTOMER">Customer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => { setShowForm(false); setEditingId(null); setFormData({ name: '', email: '', role: 'CUSTOMER' }); }}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser} className="bg-primary hover:bg-primary/90">
                  {editingId ? 'Update User' : 'Add User'}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Users List */}
        <h1 className="text-3xl font-bold text-foreground mb-6">Users Management</h1>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border bg-secondary/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Join Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-semibold text-foreground">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(user)} className="flex items-center gap-1">
                        <Edit2 className="h-3 w-3" /> Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(user.id)} className="flex items-center gap-1 text-destructive hover:text-destructive">
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
