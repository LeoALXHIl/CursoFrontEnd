// METODOS para GET e POST

import Tarefa from "@/models/tarefa";
import connectMongo from "@/services/mongpodb";
import { NextResponse } from "next/server"; //biblioteca interna do next

//get
export async function GET() {
    try {
        await connectMongo(); //conectar com o mongoDB
        const tarefas = await Tarefa.find({});
        //retornar as tarefas
        //usando o NextResponse => explicando o NextResponse
        // é uma resposta do NEXT para Requisiçoes HTTP
        return NextResponse.json(tarefas, {status: 200});
    } catch (error) {
        return NextResponse.json(
            {error: "Erro ao Buscar as Tarefas"},
            {status:500}
        );
    }
}

//post
export async function POST(req){
    try {
        const data = await req.json(); //pega os dados da requisição
        const tarefa = await Tarefa.create(data); //cria a tarefa a partir do Schema Tarefa
        return NextResponse.json(tarefa,{status201});
    } catch (error) {
        return NextResponse.json(
            {error: "erro ao criar a tarefa"},
            {status:500}
        )
    }
}