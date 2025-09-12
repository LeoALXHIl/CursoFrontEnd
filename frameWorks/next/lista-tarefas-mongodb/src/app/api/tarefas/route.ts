//rotas que não precisam especificar o id

import { createTarefa, getAllTarefas } from "@/controllers/tarefa_controller";
import { NextRequest, NextResponse } from "next/server";

// get 
export async function GET(){
    try {
        const tarefas = await getAllTarefas();
        return NextResponse.json({sucess:true, data:tarefas},{status:200});
    } catch (error) {
   return NextResponse.json({sucess:false,
     error:` Erro ao buscar tarefas: ${error}`
    },{status:500});
   
   
    }

}

//post
export async function POST(req: NextRequest){
    try {
        const data = await req.json(); //verifico se esta escrito no formato o json
        const newTarefa = await createTarefa(data);
        return NextResponse.json({success:true, data:newTarefa}, {status: 201});
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: `Falha ao Inserir Tarefas: ${error}`
        }, {status:500});
    }
}
    



