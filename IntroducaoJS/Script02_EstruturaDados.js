// Estruturas de dados

// condicionais (if,else ; Switch case)

var precoproduto = 150;
if (precoproduto >= 100) {
    console.log("Valor A Pagar: " + (precoproduto * 0.9));
} else {
    console.log("Valor A Pagar: " + (precoproduto));
}

// Switch case
var mes = 2;
switch (mes) {
    case 1:
        console.log("Janeiro");
        break;
    case 2:
        console.log("Fevereiro");
        break;
    case 3:
        console.log("Março");
        break;
    default:
        console.log("Outro Mês");
        break;
}

// Estruturas de repetição (for, while)

// for(ponto de inicio; ponto de parada; incremento)
for (let i = 0; i < 10; i++) {
    console.log("Indice: " + i);
}

// while(condicao de parada == false)
var continuar = true;
var numeroEscolhido = 3;
var tentativas = 0;
while (continuar) {
    let numeroSorteado = Math.round(Math.random() * 10);
    if (numeroEscolhido == numeroSorteado) {
        continuar = false;
        tentativas++;
        console.log("Numero Sorteado: " + numeroSorteado);
    }
}

// funções (metodos)
function saudacao(nome) {
    console.log("Olá, " + nome);
}

saudacao("Aleixo");
