'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'waiter' });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    fetchUsers(token);
  }, [router]);

  const fetchUsers = async (token: string) => {
    try {
      const res = await fetch('/api/users', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        setError('Erro ao buscar usuários.');
      }
    } catch (err) {
      setError('Erro ao buscar usuários.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess('Usuário criado com sucesso!');
        setFormData({ name: '', email: '', password: '', role: 'waiter' });
        setShowForm(false);
        fetchUsers(token!);
      } else {
        const data = await res.json();
        setError(data.message || 'Erro ao criar usuário.');
      }
    } catch (err) {
      setError('Erro ao criar usuário.');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.ok) {
        setSuccess('Usuário excluído com sucesso!');
        fetchUsers(token!);
      } else {
        setError('Erro ao excluir usuário.');
      }
    } catch (err) {
      setError('Erro ao excluir usuário.');
    }
  };

  if (loading) return <div className="main-content">Carregando...</div>;

  return (
    <div className="main-content">
      <h1>Gerenciar Usuários</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <button className="btn primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Adicionar Usuário'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          >
            <option value="waiter">Garçom</option>
            <option value="manager">Gerente</option>
          </select>
          <button type="submit" className="btn primary">Criar Usuário</button>
        </form>
      )}

      <div className="orders-table">
        <div className="table-header">
          <span>Nome</span>
          <span>Email</span>
          <span>Função</span>
          <span>Ações</span>
        </div>
        {users.map((user) => (
          <div key={user._id} className="table-row">
            <span>{user.name}</span>
            <span>{user.email}</span>
            <span>{user.role === 'manager' ? 'Gerente' : 'Garçom'}</span>
            <span>
              <button
                className="btn danger"
                onClick={() => deleteUser(user._id)}
              >
                Excluir
              </button>
            </span>
          </div>
        ))}
      </div>
      {users.length === 0 && <p>Nenhum usuário encontrado.</p>}
    </div>
  );
}
