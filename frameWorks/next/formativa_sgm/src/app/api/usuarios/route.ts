import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/services/mongodb";
import Usuario from "@/models/Usuario";

export async function GET() {
    try {
        await connectMongo();
        const usuarios = await Usuario.find().select("-password");
        return NextResponse.json(usuarios);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectMongo();
        const body = await request.json();
        const usuario = new Usuario(body);
        await usuario.save();
        const { password, ...userWithoutPassword } = usuario.toObject();
        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
    }
}
