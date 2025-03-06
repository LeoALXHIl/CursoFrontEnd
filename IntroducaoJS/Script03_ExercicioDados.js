var prompt = require("prompt-sync")();
// exercicio 1 - par impar
var numero = Number(prompt("Informe um Numero:"));
if (numero % 2 == 0) {
    console.log("O Nº é Par");
} else {
    console.log("O Nº é Impar");
}


// exercicio 2 laço for

for (let i =1; i <= 100; i++){
    console.log(i);
}
