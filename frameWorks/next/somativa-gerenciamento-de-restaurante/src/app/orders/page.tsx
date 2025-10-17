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
  paid?: boolean;
  paidAt?: string;
  paymentMethod?: string;
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
        setError('Erro ao buscar pedidos.');
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao buscar pedidos.');
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
        let msg = 'Erro ao atualizar status.';
        try {
          const body = await res.json();
          if (body?.message) msg = body.message;
        } catch (error) {
          console.error(error);
        }
        setError(msg);
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao atualizar status.');
    }
  };

  const closeOrder = async (orderId: string) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/orders/${orderId}/close`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentMethod: 'dinheiro' }),
      });
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders(prev => prev.map(order => order._id === orderId ? updatedOrder : order));
      } else {
        let msg = 'Erro ao fechar conta.';
        try {
          const body = await res.json();
          if (body?.message) msg = body.message;
        } catch (error) {
          console.error(error);
        }
        setError(msg);
      }
    } catch (error) {
      console.error(error);
      setError('Erro ao fechar conta.');
    }
  };

  const canUpdateToPreparing = (status: string) => status === 'recebido' && user?.role === 'manager';
  const canUpdateToDelivered = (status: string) => status === 'em-preparo';
  const isManager = user?.role === 'manager';
  const isWaiter = user?.role === 'waiter';

  if (loading) return <div className="main-content">Carregando...</div>;

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
              {order.items.map((item, index) => (
                <div key={index}>
                  {item.menuItemId.name} x {item.quantity}
                </div>
              ))}
            </span>
            <span>R$ {order.total.toFixed(2)}</span>
            <span className={`status ${order.status}`}>{order.status === 'recebido' ? 'Recebido' : order.status === 'em-preparo' ? 'Em Preparo' : 'Entregue'}</span>
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
              {(isManager || isWaiter) && order.paid !== true && (
                <button
                  className="btn success"
                  onClick={() => closeOrder(order._id)}
                >
                  Fechar conta
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
