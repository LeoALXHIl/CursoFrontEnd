"use client";

import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

// responsavel pela interação do usuario

export default function LoginPage(){
    const [username, setUsername] = useState (""); // campo pra digitar o username
    const [password, setPassword] = useState (""); // campo pra digitar a senha
    const [error, setError] = useState(""); // mensagem de erro
    
    const router = useRouter(); //rotas de navegação

    //método pra enviar o login 
    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault(); // evita o recarregamento da Pagina
        setError("");

        try {
            const response = await fetch(
                "/api/auth/login",{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({username, password})
                }
            );
            // analisar a resposta do fetch
            const data = await response.json();
            if(data.sucess){
                // armazenar as informaçoes do usuario no local storage
                localStorage.setItem("token", data.token);
                localStorage.setItem("userRole", data.usuario.tipo);
                router.push("/dashboard")
            }else{
                const erroData = data.error();
                setError(erroData.message || "falha de login");
            }
        } catch (error) {
            console.log("login failed", error);
            setError("Erro de Servidor");
        }

    }

      //reactDOM
    return (
        <div className={styles.center}>
            <h2>Login</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.username}>
                    <label htmlFor="username">UserName</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>
                <div className={styles.password}>
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}
