//patch e delete que usam o idpara requisitar http

import { NextRequest, NextResponse } from "next/server";
import { deleteTarefa, updateTarefa } from "@/controllers/tarefa_controller";



//Params -> next precisa dos params para dar acesso ao seguimento da url
//quando eu passo o params.id eu to passando um endereço ( "/ api/tarefas/123" => transforma os params em um endereco url )

interface Parametros {
    id: string;
}

export async function PATCH(req: NextRequest, {params}:{params:Parametros}) {
    try {
        const {id} = params;
        const data = await req.json();
        const tarefaAtualizada = await updateTarefa(id,data);
        //vou ter 2 resposta
        if(!tarefaAtualizada) {
            return NextResponse.json({success:false, error: "Not Found"},{status:404});
        }
        return NextResponse.json({success:true, data:tarefaAtualizada}, {status:200});
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: `Falha atualizar A Tarefa: ${error}`
        }, {status:500});        
    }
}

// delete
export async function DELETE(request: NextRequest, context: { params: Parametros }) {
    try {
        const { id } = context.params;
        console.log('DELETE request received for id:', id);
        const resultado = await deleteTarefa(id);
        console.log('Delete result:', resultado);
        if (resultado) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: `Falha ao Deletar As Tarefas: ${error}`
        }, { status: 500 });
    }
}
        