'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="form">
        <h1 style={{ textAlign: 'center', color: 'var(--text-dark)', marginBottom: '20px' }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn primary">Login</button>
        </form>
        {error && <p style={{ color: 'var(--danger-red)', textAlign: 'center' }}>{error}</p>}
        <p style={{ textAlign: 'center', marginTop: '15px', color: 'var(--text-light)' }}>
          Don't have an account? <a href="/register" style={{ color: 'var(--primary-orange)' }}>Register here</a>
        </p>
      </div>
    </div>
  );
}
