let produto = {
    nome: "Notebook",
    preco: 3000,
    desconto: function(){return this.preco * 0.1}
} //coleção (chave/valor)

let Produto2 = {
    nome: "Caixa de som",
    preco: 1000,
    desconto: () => {return this.preco * 0.1}
} //coleção (chave/valor)

console.log(produto.nome, " desconto: ", produto.desconto());

// em POO
class Produto{
    constructor(nome, preco){
        this.nome = nome;
        this.preco = preco;
    }
    desconto(){
        return this.preco * 0.1;
    }
} 

let p1 = new Produto("celular", 2000);
let p2 = new Produto("Mouse Gamer", 200);
console.log(p1.nome, " desconto: ", p1.desconto());

//exemplo de emcapsulamento
class Usuario{
    #nome;
    #id;
    #senha;
    constructor(nome, id, senha){
        this.#nome = nome;
        this.#id = id;
        this.#senha = senha;
    }
    //metodo get
    get nome(){
        return this.#nome;
    }
    get id(){
        return this.#id;
    }
    get senha(){
        return this.#senha;
    }


}

let user = new Usuario("joão", "a01", "123456");
console.log(user.nome); // vai dar erro não pode chamar pelo atribuoto direto
console.log(user.getNome());
console.log(user.getid()); 
console.log(user.getSenha());
//heranca

class Pessoa{
    constructor(nome, cpf){
        this.nome = nome;
        this.cpf = cpf;
    }
    exibirInfo(){
        console.log("Nome: ", this.nome, " CPF: ", this.cpf);
    }
}

class Aluno extends Pessoa{
    constructor(nome, cpf, matricula){
        super(nome, cpf);
        this.matricula = matricula;
    }
}

let aluno1 = new Aluno("Maria", 123, "Rm1234556");
aluno1.exibirInfo();
