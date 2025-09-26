import { NextRequest } from "next/server";
import { EquipamentoController } from "@/app/controllers/EquipamentoController";

export async function GET() {
    return EquipamentoController.getAllEquipamentos();
}

export async function POST(request: NextRequest) {
    return EquipamentoController.createEquipamento(request);
}
