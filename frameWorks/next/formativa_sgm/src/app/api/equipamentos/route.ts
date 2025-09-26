import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/services/mongodb";
import Equipamento from "@/models/Equipamento";

export async function GET() {
    try {
        await connectMongo();
        const equipamentos = await Equipamento.find().populate("dono", "username tipo");
        return NextResponse.json(equipamentos);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar equipamentos" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectMongo();
        const body = await request.json();
        const equipamento = new Equipamento(body);
        await equipamento.save();
        return NextResponse.json(equipamento, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao criar equipamento" }, { status: 500 });
    }
}
