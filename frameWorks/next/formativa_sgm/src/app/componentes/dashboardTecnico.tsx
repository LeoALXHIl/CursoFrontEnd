"use client";

import { IOrdemServico } from "@/models/OrdemServico";
import { useEffect, useState } from "react";
import styles from "../dashboard/page.module.css";

export default function DashboardTecnico(){
    // aramazenar as tarefas em um vetor
    const [ordens, setOrdens] = useState<IOrdemServico[]>([]);

    useEffect(()=>{
        fetchOrdens();
    }, []);

    const fetchOrdens = async () =>{
        try {
            const resposta = await fetch("/api/ordemservico"); //http request -> 
            const data = await resposta.json();
            if(data.success){
                setOrdens(data.data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            <h3>Minhas Ordens de Serviço</h3>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.trEven}>
                        <th className={styles.th}>Título</th>
                        <th className={styles.th}>Descrição</th>
                        <th className={styles.th}>Status</th>
                        <th className={styles.th}>Tipo de Manutenção</th>
                        <th className={styles.th}>Data Solicitação</th>
                        <th className={styles.th}>Data Finalização</th>
                        <th className={styles.th}>Id Equipamento</th>
                    </tr>
                </thead>
                <tbody>
                    {ordens.map((ordem, index)=>(
                        <tr key={ordem._id} className={index % 2 === 0 ? styles.trEven : ''}>
                            <td className={styles.td}>{ordem.titulo}</td>
                            <td className={styles.td}>{ordem.descricao}</td>
                            <td className={styles.td}>{ordem.status}</td>
                            <td className={styles.td}>{ordem.tipoManutencao}</td>
                            <td className={styles.td}>{ordem.dataSolictada.toDateString()}</td>
                            <td className={styles.td}>{ordem.dataFinalizacao?.toDateString()}</td>
                            <td className={styles.td}>{ordem.EquipamentoId}</td>
                            <td className={styles.td}><button>Finalizar Serviço</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
