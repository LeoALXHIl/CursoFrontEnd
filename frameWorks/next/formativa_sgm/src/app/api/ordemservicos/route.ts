import { createOrdemServico, getOrdensServico } from "@/app/controllers/OrdemServicoController";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
    try {
        const data = await getOrdensServico();//busca todos os usuário no banco
        return NextResponse.json({success:true, data:data});
    } catch (error) {
        return NextResponse.json({success:false, error:error})
    }
}
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newOrdemservico = await createOrdemServico(data);
        return NextResponse.json({success:true, data: newOrdemservico});
    } catch (error) {
        return NextResponse.json({success:false, error:error})
    }
}

