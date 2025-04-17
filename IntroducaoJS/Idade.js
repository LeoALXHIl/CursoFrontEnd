var prompt = require("prompt-sync")();

// exercicio 1 verificação de idade 

var idade = Number(prompt("Informe sua Idade:"));
if (idade < 18) {

    console.log("menor de idade");

} else if (idade >= 18 && idade < 60) { // condição intermediaria
    console.log("adulto");

} else {
    console.log("idoso");
}

s