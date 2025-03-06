 var prompt = require("prompt-sync")();
// cauculadora simples

// funções
// soma
function soma(a, b) {
    return a + b;
}

// subtração
function subtracao(a, b) {
    return a - b;
}

// multiplicação
function multiplicacao(a, b) {
    return a * b;
}

// divisão
function divisao(a, b) {
    if (b == 0) {
        console.log("Não dividirás por zero");
        return null;
    }
    return a / b;
}

// menu
function menu() {
    console.log("Escolha a Operação Desejada");
    console.log("1 - Soma");
    console.log("2 - Subtração");
    console.log("3 - Multiplicação");
    console.log("4 - Divisão");
    console.log("0 - Sair");
    let operacao = prompt("");

    switch (operacao) {
        case "1":
            var a = Number(prompt("Informe o Primeiro Número:"));
            var b = Number(prompt("Informe o Segundo Número:"));
            console.log("Resultado: " + soma(a, b));
            break;
        case "2":
            var a = Number(prompt("Informe o Primeiro Número:"));
            var b = Number(prompt("Informe o Segundo Número:"));
            console.log("Resultado: " + subtracao(a, b));
            break;
        case "3":
            var a = Number(prompt("Informe o Primeiro Número:"));
            var b = Number(prompt("Informe o Segundo Número:"));
            console.log("Resultado: " + multiplicacao(a, b));
            break;
        case "4":
            var a = Number(prompt("Informe o Primeiro Número:"));
            var b = Number(prompt("Informe o Segundo Número:"));
            let resultado = divisao(a, b);
            if (resultado == 0) {
                console.log("Resultado: " + resultado);
            }
            break;
        case "0":
            console.log("Saindo...");
            return;
        default:
            console.log("Operação Inválida");
            break;
    }
}



