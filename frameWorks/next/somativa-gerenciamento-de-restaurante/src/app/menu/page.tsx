'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({ name: '', category: '', price: '' });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchMenu(token);
  }, [router]);

  const fetchMenu = async (token: string) => {
    try {
      const res = await fetch('/api/menu', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      } else {
        setError('Erro ao buscar menu.');
      }
    } catch (err) {
      setError('Erro ao buscar menu.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    const url = editingItem ? `/api/menu/${editingItem._id}` : '/api/menu';
    const method = editingItem ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price),
        }),
      });

      if (res.ok) {
        setSuccess(editingItem ? 'Item atualizado com sucesso!' : 'Item criado com sucesso!');
        setFormData({ name: '', category: '', price: '' });
        setShowForm(false);
        setEditingItem(null);
        fetchMenu(token!);
      } else {
        const data = await res.json();
        setError(data.message || 'Erro ao salvar item.');
      }
    } catch (err) {
      setError('Erro ao salvar item.');
    }
  };

  const deleteItem = async (itemId: string) => {
    if (!confirm('Tem certeza que deseja excluir este item?')) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/menu/${itemId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.ok) {
        setSuccess('Item excluído com sucesso!');
        fetchMenu(token!);
      } else {
        setError('Erro ao excluir item.');
      }
    } catch (err) {
      setError('Erro ao excluir item.');
    }
  };

  const startEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({ name: item.name, category: item.category, price: item.price.toString() });
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setFormData({ name: '', category: '', price: '' });
    setShowForm(false);
  };

  if (loading) return <div className="main-content">Carregando...</div>;

  return (
    <div className="main-content">
      <h1>Gerenciar Menu</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <button className="btn primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Adicionar Item'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Nome do Item"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Categoria"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Preço"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <button type="submit" className="btn primary">
            {editingItem ? 'Atualizar Item' : 'Criar Item'}
          </button>
          {editingItem && (
            <button type="button" className="btn secondary" onClick={cancelEdit}>
              Cancelar
            </button>
          )}
        </form>
      )}

      <div className="menu-list">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-item">
            <div className="item-name">{item.name}</div>
            <div className="item-category">{item.category}</div>
            <div className="item-price">R$ {item.price.toFixed(2)}</div>
            <div className="item-actions">
              <button className="btn secondary" onClick={() => startEdit(item)}>
                Editar
              </button>
              <button className="btn danger" onClick={() => deleteItem(item._id)}>
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
      {menuItems.length === 0 && <p>Nenhum item no menu.</p>}
    </div>
  );
}
