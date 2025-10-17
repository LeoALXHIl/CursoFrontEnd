'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import './globals.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    } else if (pathname !== '/login' && pathname !== '/register') {
      router.push('/login');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthPage) {
    return (
      <html lang="pt-BR">
        <body>
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="pt-BR">
      <body>
        <div className="app">
          <nav className="navbar">
            <div className="navbar-brand">
              <Link href="/dashboard">Bistrô Sabor Local</Link>
            </div>
            <div className="navbar-menu">
              <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
                ☰
              </button>
            </div>
          </nav>
          <div className="main-container">
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
              <nav className="sidebar-nav">
                <Link href="/dashboard" className="nav-link">Dashboard</Link>
                <Link href="/order" className="nav-link">Criar Pedido</Link>
                <Link href="/orders" className="nav-link">Pedidos</Link>
                <Link href="/kitchen" className="nav-link">Cozinha</Link>
                {user?.role === 'manager' && (
                  <>
                    <Link href="/menu" className="nav-link">Gerenciar Menu</Link>
                    <Link href="/users" className="nav-link">Gerenciar Usuários</Link>
                    <Link href="/reports" className="nav-link">Relatórios</Link>
                  </>
                )}
                <Link href="/settings" className="nav-link">Configurações</Link>
                <button onClick={handleLogout} className="nav-link logout">Sair</button>
              </nav>
            </aside>
            <main className="main-content">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
