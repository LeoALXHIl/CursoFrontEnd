class Veiculo {
    constructor(marca, modelo, ano) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }
    exibirInfo() {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}, Ano: ${this.ano}`;
    }
}
class Carro extends Veiculo {
    constructor(marca, modelo, ano, quantidadePortas) {
        super(marca, modelo, ano); 
        this.quantidadePortas = quantidadePortas;
    }
    exibirInfo() {
        return `${super.exibirInfo()}, Portas: ${this.quantidadePortas}`;
    }
}
// Exemplo de uso:
const veiculo = new Veiculo("Lexus", "LFA", 2012, 2);
console.log(veiculo.exibirInfo());

const carro = new Carro("Honda", "Civic", 1998, 4);
console.log(carro.exibirInfo());