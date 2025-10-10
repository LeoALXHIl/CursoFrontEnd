'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface Order {
  id: string;
  table: string;
  items: string[];
  total: number;
  status: 'recebido' | 'em-preparo' | 'entregue';
  createdAt: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalOrders: 0, revenue: 0 });
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

    // Fetch menu and orders
    fetchMenu();
    fetchOrders();
    calculateStats();

    setLoading(false);
  }, [router]);

  const fetchMenu = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/menu', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const calculateStats = () => {
    // Mock stats; in real, calculate from orders
    setStats({ totalOrders: orders.length || 5, revenue: 1180.50 });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading || !user) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</div>;

  const isManager = user.role === 'manager';

  return (
    <>
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>Restaurante</h1>
        </div>
        <div className="sidebar-nav">
          <ul>
            <li className="active">
              <a href="/dashboard">
                Dashboard
              </a>
            </li>
            {isManager && (
              <>
                <li>
                  <a href="/menu">Menu</a>
                </li>
                <li>
                  <a href="/users">Usuários</a>
                </li>
              </>
            )}
            <li>
              <a href="/orders">Pedidos</a>
            </li>
            {isManager && <li><a href="/reports">Relatórios</a></li>}
            {!isManager && <li><a href="/kitchen">Cozinha</a></li>}
          </ul>
        </div>
      </nav>

      {/* Header */}
      <header className="header">
        <div></div> {/* Spacer for sidebar */}
        <div className="user-info">
          <span className="user-name">{user.name}</span>
          <span className="role">({user.role})</span>
          <button onClick={handleLogout} className="btn danger">Logout</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <h1>Dashboard</h1>
        <p>Welcome, {user.name} ({user.role})</p>

        {/* Stats Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <div className="card-value">{stats.totalOrders}</div>
            <div className="card-label">Total Pedidos</div>
          </div>
          <div className="card">
            <div className="card-value">R$ {stats.revenue.toFixed(2)}</div>
            <div className="card-label">Receita Hoje</div>
          </div>
          {isManager && (
            <div className="card">
              <div className="card-value">{menuItems.length}</div>
              <div className="card-label">Itens no Menu</div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        {isManager && (
          <section>
            <h2>Menu</h2>
            <div className="menu-list">
              {menuItems.map((item) => (
                <div key={item.id} className="menu-item">
                  <div className="item-name">{item.name}</div>
                  <div className="item-category">{item.category}</div>
                  <div className="item-price">R$ {item.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Orders Table */}
        <section>
          <h2>Pedidos</h2>
          <div className="orders-table">
            <div className="table-header">
              <span>Mesa</span>
              <span>Itens</span>
              <span>Total</span>
              <span>Status</span>
              <span>Data</span>
            </div>
            {orders.map((order) => (
              <div key={order.id} className="table-row">
                <span>{order.table}</span>
                <span>{order.items.join(', ')}</span>
                <span>R$ {order.total.toFixed(2)}</span>
                <span className={`status ${order.status}`}>{order.status}</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Role-based Buttons */}
        <div style={{ marginTop: '20px' }}>
          {isManager && (
            <>
              <button className="btn primary" onClick={() => router.push('/menu')}>Gerenciar Menu</button>
              <button className="btn secondary" onClick={() => router.push('/orders')}>Ver Pedidos</button>
            </>
          )}
          {!isManager && (
            <>
              <button className="btn primary" onClick={() => router.push('/order')}>Criar Pedido</button>
              <button className="btn secondary" onClick={() => router.push('/orders')}>Ver Pedidos</button>
              <button className="btn secondary" onClick={() => router.push('/kitchen')}>Cozinha</button>
            </>
          )}
        </div>
      </main>
    </>
  );
}
