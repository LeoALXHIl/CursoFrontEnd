import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/services/mongodb";
import Equipamento from "@/models/Equipamento";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const equipamento = await Equipamento.findById(params.id).populate("dono", "username tipo");
        if (!equipamento) {
            return NextResponse.json({ error: "Equipamento não encontrado" }, { status: 404 });
        }
        return NextResponse.json(equipamento);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar equipamento" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const body = await request.json();
        const equipamento = await Equipamento.findByIdAndUpdate(params.id, body, { new: true });
        if (!equipamento) {
            return NextResponse.json({ error: "Equipamento não encontrado" }, { status: 404 });
        }
        return NextResponse.json(equipamento);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar equipamento" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const equipamento = await Equipamento.findByIdAndDelete(params.id);
        if (!equipamento) {
            return NextResponse.json({ error: "Equipamento não encontrado" }, { status: 404 });
        }
        return NextResponse.json({ message: "Equipamento deletado" });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao deletar equipamento" }, { status: 500 });
    }
}
