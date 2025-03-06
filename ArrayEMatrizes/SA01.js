// criar um formulario

const prompt = require("prompt-sync")();
let notas = []; // declarando vetor de notas

function inserirNotas() {
    let nota = Number(prompt("Digite a nota: "));
    notas.push(nota);
}

function calcularMedia() {
    let soma = notas.reduce((soma, nota) => soma + nota, 0);
    let media = soma / notas.length;
    console.log("A média é " + media);
}

function menuBar() {
    let continuar = true;
    while (continuar) {
        console.log("=== Sistema de Notas ===");
        console.log("1- Inserir notas");
        console.log("2- Calcular média");
        console.log("3- Sair");
        console.log("========================");
        let operador = prompt("Informe a opção: ");
        switch (operador) {
            case "1":
                inserirNotas();
                break;
            case "2":
                calcularMedia();
                break;
            case "3":
                continuar = false;
                console.log("Saindo...");
                break;
            default:
                console.log("Informe uma opção válida");
                break;
        }
    }
}

menuBar();