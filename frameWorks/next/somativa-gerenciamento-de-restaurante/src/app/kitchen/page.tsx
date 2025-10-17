'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  _id: string;
  tableNumber: number;
  items: Array<{ menuItemId: { _id?: string; name: string; price: number }; quantity: number }>;
  total: number;
  status: 'recebido' | 'em-preparo' | 'entregue';
  createdAt: string;
}

export default function Kitchen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchOrders(token);
  }, [router]);

  const fetchOrders = async (token: string) => {
    try {
      const res = await fetch('/api/kitchen', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        setError('Erro ao buscar pedidos.');
      }
    } catch (err) {
      setError('Erro ao buscar pedidos.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: 'em-preparo') => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders(prev => prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
      } else {
        setError('Erro ao atualizar status.');
      }
    } catch (err) {
      setError('Erro ao atualizar status.');
    }
  };

  if (loading) return <div className="main-content">Carregando...</div>;

  return (
    <div className="main-content">
      <h1>Cozinha</h1>
      {error && <p className="error">{error}</p>}
      <div className="orders-table">
        <div className="table-header">
          <span>Mesa</span>
          <span>Itens</span>
          <span>Total</span>
          <span>Data</span>
          <span>Ações</span>
        </div>
        {orders.map((order) => (
          <div key={order._id} className="table-row">
            <span>{order.tableNumber}</span>
            <span>
              {order.items.map(item => (
                <div key={item.menuItemId._id}>
                  {item.menuItemId.name} x {item.quantity}
                </div>
              ))}
            </span>
            <span>R$ {order.total.toFixed(2)}</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            <span>
              <button
                className="btn primary"
                onClick={() => updateStatus(order._id, 'em-preparo')}
              >
                Iniciar Preparo
              </button>
            </span>
          </div>
        ))}
      </div>
      {orders.length === 0 && <p>Nenhum pedido na fila.</p>}
    </div>
  );
}
