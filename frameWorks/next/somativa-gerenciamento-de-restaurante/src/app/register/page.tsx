'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('waiter');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (res.ok) {
      setSuccess('Usuário criado com sucesso! Redirecionando para login...');
      setTimeout(() => router.push('/login'), 2000);
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="form">
        <h1 style={{ textAlign: 'center', color: 'var(--text-dark)', marginBottom: '20px' }}>Registrar</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="waiter">Garçom</option>
            <option value="manager">Gerente</option>
          </select>
          <button type="submit" className="btn primary">Registrar</button>
        </form>
        {error && <p style={{ color: 'var(--danger-red)', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: 'var(--success-green)', textAlign: 'center' }}>{success}</p>}
        <p style={{ textAlign: 'center', marginTop: '15px', color: 'var(--text-light)' }}>
          Já tem conta? <a href="/login" style={{ color: 'var(--primary-orange)' }}>Entrar aqui</a>
        </p>
      </div>
    </div>
  );
}
