import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/services/mongodb";
import OrdemServico from "@/models/OrdemServico";

export async function GET() {
    try {
        await connectMongo();
        const ordens = await OrdemServico.find()
            .populate("equipamento", "nome numeroSerie")
            .populate("atribuidoPara", "username tipo");
        return NextResponse.json(ordens);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar ordens de serviço" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectMongo();
        const body = await request.json();
        const ordem = new OrdemServico(body);
        await ordem.save();
        return NextResponse.json(ordem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar ordem de serviço" }, { status: 500 });
    }
}
