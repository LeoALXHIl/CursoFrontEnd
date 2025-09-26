import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/services/mongodb";
import OrdemServico from "@/models/OrdemServico";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const ordem = await OrdemServico.findById(params.id)
            .populate("equipamento", "nome numeroSerie")
            .populate("atribuidoPara", "username tipo");
        if (!ordem) {
            return NextResponse.json({ error: "Ordem de serviço não encontrada" }, { status: 404 });
        }
        return NextResponse.json(ordem);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar ordem de serviço" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const body = await request.json();
        const ordem = await OrdemServico.findByIdAndUpdate(params.id, body, { new: true });
        if (!ordem) {
            return NextResponse.json({ error: "Ordem de serviço não encontrada" }, { status: 404 });
        }
        return NextResponse.json(ordem);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar ordem de serviço" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const ordem = await OrdemServico.findByIdAndDelete(params.id);
        if (!ordem) {
            return NextResponse.json({ error: "Ordem de serviço não encontrada" }, { status: 404 });
        }
        return NextResponse.json({ message: "Ordem de serviço deletada" });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao deletar ordem de serviço" }, { status: 500 });
    }
}
