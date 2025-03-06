// arrays e matrizes

// declaração de um array
let dados = []; // uso de colchetes permite a declaração de um array
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // array de números
let palavras = ["bola", "sapato", "caixa"];

console.log(numeros.length); // quantidade de elementos do array

// índices do array
// imprimir o quinto elemento do array
console.log(numeros[4]); // 5º

// adicionar elementos ao array
palavras.push("Cachorro"); // adiciona no final do array
    console.log(palavras);


palavras.unshift("Prédio"); // adiciona no começo do array
    console.log(palavras);

// remover elementos do array
palavras.pop(); // remove o ultimo elemento do array
palavras.shift(); // remove o primeiro elemento

// foreach (repetição em um vetor)
palavras.forEach(palavra => {
    console.log(palavra);

});
//percorrer um array (loop)
for(let i = 0; i<numeros.length;i++){
    console.log("numero["+i+"]="+numeros[i])
}


// Alterar o valor de um elemento 
palavras[2]="sacola"
console.log(palavra);


// splice

palavras.splice(1,1);// remover sapato

// manipulação de arrays
let numerosdobro = numeros.map(x => x* 10)
console.log(numerosdobro);


