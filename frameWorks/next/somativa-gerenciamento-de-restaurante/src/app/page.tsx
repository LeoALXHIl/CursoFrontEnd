'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--background)' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-dark)' }}>
        <h1>Gerenciamento de Restaurante</h1>
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
