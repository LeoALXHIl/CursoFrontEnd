'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
}

interface OrderItem {
  menuItemId: string;
  quantity: number;
}

export default function CreateOrder() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [tableNumber, setTableNumber] = useState('');
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
      }
    } catch (err) {
      console.error('Erro ao buscar menu:', err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) return;
    const existingIndex = selectedItems.findIndex(item => item.menuItemId === menuItemId);
    if (existingIndex >= 0) {
      setSelectedItems(prev => prev.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setSelectedItems(prev => [...prev, { menuItemId, quantity }]);
    }
  };

  const removeItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => {
      const menuItem = menuItems.find(mi => mi._id === item.menuItemId);
      return total + (menuItem ? menuItem.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!tableNumber || selectedItems.length === 0) {
      setError('Número da mesa e pelo menos um item são obrigatórios.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tableNumber: parseInt(tableNumber), items: selectedItems }),
      });

      if (res.ok) {
        setSuccess('Pedido criado com sucesso!');
        setTimeout(() => router.push('/orders'), 2000);
      } else {
        const data = await res.json();
        setError(data.message || 'Falha ao criar pedido.');
      }
    } catch (err) {
      setError('Erro ao criar pedido.');
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Carregando...</div>;

  return (
    <div className="main-content">
      <h1>Criar Pedido</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="number"
          placeholder="Número da Mesa"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          required
          min="1"
        />
        <h3>Itens do Menu</h3>
        <div className="menu-list">
          {menuItems.map((item) => (
            <div key={item._id} className="menu-item">
              <div className="item-name">{item.name} - R$ {item.price.toFixed(2)}</div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Qtd"
                  min="1"
                  style={{ width: '60px' }}
                  onChange={(e) => {
                    const qty = parseInt(e.target.value);
                    if (qty > 0) addItem(item._id, qty);
                  }}
                />
                <button type="button" onClick={() => addItem(item._id, 1)} className="btn secondary" style={{ padding: '5px 10px' }}>Adicionar</button>
              </div>
            </div>
          ))}
        </div>
        {selectedItems.length > 0 && (
          <div>
            <h3>Itens Selecionados</h3>
            <ul>
              {selectedItems.map((selItem, index) => {
                const menuItem = menuItems.find(mi => mi._id === selItem.menuItemId);
                return (
                  <li key={index}>
                    {menuItem?.name} x {selItem.quantity} - R$ {(menuItem ? menuItem.price * selItem.quantity : 0).toFixed(2)}
                    <button type="button" onClick={() => removeItem(index)} className="btn danger" style={{ marginLeft: '10px' }}>Remover</button>
                  </li>
                );
              })}
            </ul>
            <p><strong>Total: R$ {calculateTotal().toFixed(2)}</strong></p>
          </div>
        )}
        <button type="submit" className="btn primary">Criar Pedido</button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}
