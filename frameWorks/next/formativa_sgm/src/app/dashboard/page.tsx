"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import DashboardAdmin from "../componentes/dashboardAdmin";
import DashboardGerente from "../componentes/dashboardGerente";
import DashboardTecnico from "../componentes/dashboardTecnico";

export default function DashboardPage(){
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(()=>{
        const role = localStorage.getItem("userRole");
        if(!role) {
            router.push("/login");//redireciona para o login caso perca a userRole
        }else{
            setUserRole(role);
        }
    });

    const handleLogout = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        router.push("/login");
    };

    const renderDashboard = () => {
        if( userRole?.toLowerCase() === "admin"){
            return <DashboardAdmin />;
        } else if (userRole === "gerente"){
            return <DashboardGerente />;
        } else if (userRole === "tecnico"){
            return <DashboardTecnico />;
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Bem-Vindo</h1>
                <button className={styles.button} onClick={handleLogout}>Logout</button>
            </header>
            <main className={styles.main}>
                {renderDashboard()}
            </main>
        </div>
    );
}
