//auxiliar de conexão com o mongo db

import mongoose from "mongoose"

//arrow function

const conectMongo = async () =>{
    mongoose.connect(process.env.DATABASE_URL) //estabelece a conexão como o mongodb
    .then(()=>console.log("Conectado ao Mongo"))
    .catch((err)=>console.err("Erro ao conectar com o mongo",err));
}
export default conectMongo;