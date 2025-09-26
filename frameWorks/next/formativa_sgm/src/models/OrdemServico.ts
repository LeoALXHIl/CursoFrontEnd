import mongoose, { Document, Model, Schema } from "mongoose";

export interface IOrdemServico extends Document {
    _id: string;
    descricao: string;
    status: string;
    equipamento: mongoose.Types.ObjectId; // Reference to Equipamento
    atribuidoPara?: mongoose.Types.ObjectId; // Reference to Usuario
    dataCriacao: Date;
    createdAt: Date;
    updatedAt: Date;
}

const OrdemServicoSchema: Schema<IOrdemServico> = new Schema({
    descricao: { type: String, required: true },
    status: { type: String, enum: ["pendente", "em_andamento", "concluida"], required: true, default: "pendente" },
    equipamento: { type: Schema.Types.ObjectId, ref: "Equipamento", required: true },
    atribuidoPara: { type: Schema.Types.ObjectId, ref: "Usuario" },
    dataCriacao: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const OrdemServico: Model<IOrdemServico> = mongoose.models.OrdemServico || mongoose.model<IOrdemServico>("OrdemServico", OrdemServicoSchema);

export default OrdemServico;
