// basear meu modelo no schema da 

import mongoose, { model } from "mongoose"

const tarefaSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: [true, "O titulo é obrigatorio"],
        trim: true,
        maxlength: [100, "O título < 100 char "]
    },
    concluida: {
        type: Boolean,
        default: false, // toda tarefa criada esta concluida
    },

    dataCriacao: {
        type: Date, 
        default: Date.now,

    }
})

export default mongoose.models.tarefa || mongoose.model("tarefa,", tarefaSchema);
// ai exporta  o modelo como tarefa caso não exista uma tarefa no banco de dados
// causa ja exista uma nova tarefa