// funções matematicas
//sqrt// Pow

//raiz quadrada de 25
console.log(Math.sqrt(25)); //5

// potencia
console.log(Math.pow(3,2)); //3² = 9
console.log(Math.pow(4,3)); //4³ = 64
console.log(Math.pow(27,1/3)); //27^(1/3) = 3

// Arredondamento
//Math.round (arredonda pro mais proximo)
console.log(Math.round(4.4)); //4
console.log(Math.round(4.7)); //5

//Math.floor arredondar para baixo
console.log(Math.floor(4.9)); //4

//Math.ceil arredondar para cima
console.log(Math.ceil(4.1)); //5

// Numero Aleatorio
//Math.random
console.log(Math.random()) //0 -> 1

// 1 e 100
console.log(Math.ceil(Math.random() * 100)); //1 -> 100
console.log(Math.floor(Math.random() * 100)); //0 -> 99

//1- 10000
console.log(Math.ceil(Math.random() * 10000)); //1 -> 10000

//0- 9999
console.log(Math.floor(Math.random() * 10000)); //0 -> 9999

// random 0- 50
console.log(Math.round(Math.random() * 50)); //0 -> 50

//50- 100
console.log(Math.round(Math.random() * 50 + 50)); //50 -> 100

//Maximo Minimo Absoluto
var Numeros = [1,2,3,4,5,6,7,8,9]; //array
console.log(Math.max(...Numeros)); //9 maior nº da sequencia
console.log(Math.min(...Numeros)); //1 menor nº da sequencia

var Absoluto = -10;
console.log(Math.abs(Absoluto)); //10 modulo do nº
