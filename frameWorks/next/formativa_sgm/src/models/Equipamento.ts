import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEquipamento extends Document {
    _id: string;
    nome: string;
    descricao?: string;
    numeroSerie: string;
    status: string;
    dono: mongoose.Types.ObjectId; // Reference to Usuario
    createdAt: Date;
    updatedAt: Date;
}

const EquipamentoSchema: Schema<IEquipamento> = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String },
    numeroSerie: { type: String, required: true, unique: true },
    status: { type: String, enum: ["ativo", "inativo", "manutencao"], required: true, default: "ativo" },
    dono: { type: Schema.Types.ObjectId, ref: "Usuario", required: true }
}, {
    timestamps: true
});

const Equipamento: Model<IEquipamento> = mongoose.models.Equipamento || mongoose.model<IEquipamento>("Equipamento", EquipamentoSchema);

export default Equipamento;
