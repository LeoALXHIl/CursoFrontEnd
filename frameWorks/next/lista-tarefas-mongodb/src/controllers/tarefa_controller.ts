

// Funções do Controller

import Tarefa, { Itarefa } from "@/models/tarefa";
import connectMongo from "@/services/mongodb";

//get
export const getAllTarefas = async(): Promise<Itarefa[]> => {
    await connectMongo();
    const tarefas = await Tarefa.find({});
    return tarefas;
}

//post
export const createTarefa = async(data:Partial<Itarefa>):Promise<Itarefa> =>{
    await connectMongo();
    const tarefa = await Tarefa.create(data);
    return tarefa;
}

//patch-
export const updateTarefa = async(id: string, data: Partial<Itarefa>): Promise<Itarefa | null> => {
    await connectMongo();
    const tarefa = await Tarefa.findByIdAndUpdate(id, data, { new: true });
    return tarefa;
}
//delete
export const deleteTarefa = async(id:string):Promise<boolean> => {
    await connectMongo();
    const todasAntes = await Tarefa.find({});
    console.log('Tarefas antes do delete:', todasAntes.map(t => ({ _id: t._id, titulo: t.titulo })));
    const resultado = await Tarefa.deleteOne({_id: id});
    const todasDepois = await Tarefa.find({});
    console.log('Tarefas depois do delete:', todasDepois.map(t => ({ _id: t._id, titulo: t.titulo })));
    return resultado.deletedCount > 0;
}

