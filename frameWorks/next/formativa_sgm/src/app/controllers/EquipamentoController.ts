import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/services/mongodb";
import Equipamento from "@/models/Equipamento";

export class EquipamentoController {
    static async getAllEquipamentos() {
        try {
            await connectMongo();
            const equipamentos = await Equipamento.find().populate("dono", "username tipo");
            return NextResponse.json(equipamentos);
        } catch (error) {
            return NextResponse.json({ error: "Erro ao buscar equipamentos" }, { status: 500 });
        }
    }

    static async createEquipamento(request: NextRequest) {
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

    static async getEquipamentoById(id: string) {
        try {
            await connectMongo();
            const equipamento = await Equipamento.findById(id).populate("dono", "username tipo");
            if (!equipamento) {
                return NextResponse.json({ error: "Equipamento não encontrado" }, { status: 404 });
            }
            return NextResponse.json(equipamento);
        } catch (error) {
            return NextResponse.json({ error: "Erro ao buscar equipamento" }, { status: 500 });
        }
    }

    static async updateEquipamento(id: string, request: NextRequest) {
        try {
            await connectMongo();
            const body = await request.json();
            const equipamento = await Equipamento.findByIdAndUpdate(id, body, { new: true }).populate("dono", "username tipo");
            if (!equipamento) {
                return NextResponse.json({ error: "Equipamento não encontrado" }, { status: 404 });
            }
            return NextResponse.json(equipamento);
        } catch (error) {
            return NextResponse.json({ error: "Erro ao atualizar equipamento" }, { status: 500 });
        }
    }

    static async deleteEquipamento(id: string) {
        try {
            await connectMongo();
            const equipamento = await Equipamento.findByIdAndDelete(id);
            if (!equipamento) {
                return NextResponse.json({ error: "Equipamento não encontrado" }, { status: 404 });
            }
            return NextResponse.json({ message: "Equipamento deletado" });
        } catch (error) {
            return NextResponse.json({ error: "Erro ao deletar equipamento" }, { status: 500 });
        }
    }
}
