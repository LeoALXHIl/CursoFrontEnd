class Produto{
    constructor(nome, preco, estoque){
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }
    vender(quantidade){
        if(quantidade > this.estoque){
            console.log("Estoque insuficiente!");
            return;
        }
        this.estoque -= quantidade;
        console.log(`Venda realizada! Estoque atual: ${this.estoque}`);
    }
    repor(quantidade){
        this.estoque += quantidade;
        console.log(`Estoque reposto! Estoque atual: ${this.estoque}`);
    }

    exibirInfo(){
        return `Produto: ${this.nome}, Preço: R$${this.preco.toFixed(2)}, Estoque: ${this.estoque}`;
    }
 
}

let produto1 = new Produto("Celular", 2000, 50);
let produdto2 = new Produto("Mouse", 200, 100);
let produto3 = new Produto("Teclado", 300, 200);
console.log(produto1.exibirInfo());
produto1.vender(5);
produto1.repor(10);
console.log(produto1.exibirInfo());
