import { Document, Model, Schema } from "mongoose";
import mongoose from "mongoose";

// definir primeiro a infraestrutura do objeto tarefa
export interface Itarefa extends Document {
    // herdamos a base document do moongose 
    // e vamos criar os atribuytos do obj
    _id: string;
    titulo: string;
    concluida: boolean;
    criadoEm: Date;
}

// vamos criar as regras do schema do mongoose ( forma de abreviar o modelo ) ( converso de elementos)

const TarefaSchema: Schema<Itarefa> = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true,"O titulo é obrigatorio"],
        trim: true,
        maxLength: [50,"Maximo de 50 caracteres"]

    },
    concluida: {
        type: Boolean,
        default: false,
    },
    criadoEm: {
        type: Date,
        default: Date.now,// Pega o carimbo de data atual
    }
});
// criar o modelo ( coleção ) do mongoose
const Tarefa: Model<Itarefa> = mongoose.models.tarefa || mongoose.model<Itarefa>("tarefa", TarefaSchema);

export default Tarefa;// componente reutilizavel
