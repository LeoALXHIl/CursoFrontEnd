import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/services/mongodb";
import Usuario from "@/models/Usuario";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const usuario = await Usuario.findById(params.id).select("-password");
        if (!usuario) {
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }
        return NextResponse.json(usuario);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar usuário" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const body = await request.json();
        const usuario = await Usuario.findByIdAndUpdate(params.id, body, { new: true }).select("-password");
        if (!usuario) {
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }
        return NextResponse.json(usuario);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongo();
        const usuario = await Usuario.findByIdAndDelete(params.id);
        if (!usuario) {
            return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }
        return NextResponse.json({ message: "Usuário deletado" });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao deletar usuário" }, { status: 500 });
    }
}
