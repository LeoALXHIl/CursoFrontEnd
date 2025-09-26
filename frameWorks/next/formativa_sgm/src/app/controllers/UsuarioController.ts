
import connectMongo from "@/services/mongodb";
import Usuario, { IUsuario } from "@/models/Usuario";

//listar todos os Users
export const getUsuarios = async () => {
  await connectMongo(); //estabelece conexão
  const usuarios = await Usuario.find({}); //lista todos os usuários da colecção
  return usuarios;
};
//listar um user
export const getUsuarioById = async (id: string) => {
  await connectMongo();
  const usuario = await Usuario.findById(id);
  return usuario;
};
//criar user
export const createUsuario = async (data: Partial<IUsuario>) => {
  await connectMongo();
  const novoUsuario = new Usuario(data);
  const novoUsuarioId = novoUsuario.save();
  return novoUsuarioId;
};

//atualziar dados user
export const updateUsuario = async (id: string, data: Partial<IUsuario>) => {
  await connectMongo();
  const usuario = await Usuario.findByIdAndUpdate(id, data, { new: true });
  return usuario;
};

//deletar user
export const deleteUsuario = async (id: string) => {
  await connectMongo();
  await Usuario.findByIdAndDelete(id);
};

//métodos de autenticação de usuário (login) ( senha é passada criptografada)
export const autenticaUsuario = async (username: string, password: string) => {
    await connectMongo();
    //busca o usuário pelo username 
    const usuario = await Usuario.find({username}).select("+password");
    // usuário não encontrado
    if(!usuario || usuario.length === 0) return null;
    //comparar a senha com a senha do banco
    const senhaSecreta =  await usuario[0].comparePassword(password);
    if(!senhaSecreta) return null; //senha incorreta
    // se deu certo retrona o user
    return usuario[0];
}