"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function Settings() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    const parsedUser: User = JSON.parse(userData);
    setUser(parsedUser);
    setName(parsedUser.name);
    setEmail(parsedUser.email);
    setLoading(false);
  }, [router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        const updated = await res.json();
        // atualiza o estado e o localStorage
        setUser(updated);
        localStorage.setItem("user", JSON.stringify(updated));
        setSuccess("Perfil atualizado com sucesso!");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Erro ao atualizar perfil.");
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao atualizar perfil.");
    }
  };

  if (loading || !user)
    return <div className="main-content">Carregando...</div>;

  return (
    <div className="main-content">
      <h1>Configurações</h1>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <section>
        <h2>Perfil do Usuário</h2>
        <form onSubmit={handleUpdateProfile} className="form">
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
          <button type="submit" className="btn primary">
            Atualizar Perfil
          </button>
        </form>
      </section>
    </div>
  );
}
