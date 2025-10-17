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

export default function Reports() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [popularItems, setPopularItems] = useState<{ name: string; count: number }[]>([]);
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
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        calculateReports(data);
      } else {
        setError('Erro ao buscar pedidos.');
      }
    } catch (err) {
      setError('Erro ao buscar pedidos.');
    } finally {
      setLoading(false);
    }
  };

  const calculateReports = (ordersData: Order[]) => {
    const revenue = ordersData.reduce((sum, order) => sum + order.total, 0);
    setTotalRevenue(revenue);
    setTotalOrders(ordersData.length);

    const itemCounts: { [key: string]: number } = {};
    ordersData.forEach(order => {
      order.items.forEach(item => {
        itemCounts[item.menuItemId.name] = (itemCounts[item.menuItemId.name] || 0) + item.quantity;
      });
    });

    const sortedItems = Object.entries(itemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setPopularItems(sortedItems);
  };

  if (loading) return <div className="main-content">Carregando...</div>;

  return (
    <div className="main-content">
      <h1>Relatórios</h1>
      {error && <p className="error">{error}</p>}

      <div className="dashboard-cards">
        <div className="card">
          <div className="card-value">{totalOrders}</div>
          <div className="card-label">Total de Pedidos</div>
        </div>
        <div className="card">
          <div className="card-value">R$ {totalRevenue.toFixed(2)}</div>
          <div className="card-label">Receita Total</div>
        </div>
        <div className="card">
          <div className="card-value">R$ {(totalOrders > 0 ? totalRevenue / totalOrders : 0).toFixed(2)}</div>
          <div className="card-label">Ticket Médio</div>
        </div>
      </div>

      <section>
        <h2>Itens Mais Populares</h2>
        <div className="menu-list">
          {popularItems.map((item, index) => (
            <div key={index} className="menu-item">
              <div className="item-name">{item.name}</div>
              <div className="item-price">Vendido {item.count} vezes</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Pedidos por Status</h2>
        <div className="orders-table">
          <div className="table-header">
            <span>Status</span>
            <span>Quantidade</span>
          </div>
          {['recebido', 'em-preparo', 'entregue'].map(status => {
            const count = orders.filter(order => order.status === status).length;
            return (
              <div key={status} className="table-row">
                <span>{status === 'recebido' ? 'Recebido' : status === 'em-preparo' ? 'Em Preparo' : 'Entregue'}</span>
                <span>{count}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
