//PUT e DELETE

import Tarefa from "@/models/tarefa";
import connectMongo from "@/services/mongpodb";
import { NextResponse } from "next/server";

export async function PUT(req, {params}){ //pegar o ID dos parametros
    try {
        await connectMongo();
        const data = await req.json();
        const tarefa =  await Tarefa.findByIdAndUpdate(
            params.id, 
            data, // dados que serão atualizados
            {new: true, reunValidators: true}, //retorna a tarefa atualizada
        );
        if(!tarefa){
            return NextResponse.json({error: "tarefa não encontrada"})
        }
        return NextResponse.json(tarefa,{status200});
    } catch (error) {

         return NextResponse.json(
            {error: "erro ao Atualizar a tarefa"},
            {status:500}
         );
    }
}