'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  _id: string;
  tableNumber: number;
  items: Array<{ menuItemId: { name: string; price: number }; quantity: number }>;
  total: number;
  status: 'recebido' | 'em-preparo' | 'entregue';
  createdAt: string;
}

interface User {
  role: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token || !userData) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    fetchOrders(token);
  }, [router]);

  const fetchOrders = async (token: string) => {
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        setError('Failed to fetch orders.');
      }
    } catch (err) {
      setError('Error fetching orders.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: 'recebido' | 'em-preparo' | 'entregue') => {
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
        setOrders(prev => prev.map(order => order._id === orderId ? updatedOrder : order));
      } else {
        setError('Failed to update status.');
      }
    } catch (err) {
      setError('Error updating status.');
    }
  };

  const canUpdateToPreparing = (status: string) => status === 'recebido';
  const canUpdateToDelivered = (status: string) => status === 'em-preparo';
  const isManager = user?.role === 'manager';

  if (loading) return <div className="main-content">Loading...</div>;

  return (
    <div className="main-content">
      <h1>Pedidos</h1>
      {error && <p className="error">{error}</p>}
      <div className="orders-table">
        <div className="table-header">
          <span>Mesa</span>
          <span>Itens</span>
          <span>Total</span>
          <span>Status</span>
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
            <span className={`status ${order.status}`}>{order.status}</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            <span>
              {canUpdateToPreparing(order.status) && (
                <button
                  className="btn secondary"
                  onClick={() => updateStatus(order._id, 'em-preparo')}
                >
                  Em Preparo
                </button>
              )}
              {canUpdateToDelivered(order.status) && (
                <button
                  className="btn primary"
                  onClick={() => updateStatus(order._id, 'entregue')}
                >
                  Entregue
                </button>
              )}
              {isManager && order.status !== 'entregue' && (
                <button
                  className="btn danger"
                  onClick={() => updateStatus(order._id, 'entregue')}
                >
                  Concluir
                </button>
              )}
            </span>
          </div>
        ))}
      </div>
      {orders.length === 0 && <p>Nenhum pedido encontrado.</p>}
    </div>
  );
}
