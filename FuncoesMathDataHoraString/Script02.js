//Funções de String ou texto

var texto = "Aula de javascript";
console.log(texto.length); // quantidade de caracteres

console.log(texto.toUpperCase()); // tudo maiusculo
console.log(texto.toLowerCase()); // tudo minusculo


//Manipulação de texto
console.log(texto.substring(0,4)); //Aula
console.log(texto.slice(-10)); //javascript
console.log(texto.replace("javascript","typescript")); // subistituiu as palavras

// split ( usar um caracter para separar um vetor)
let linguagens = "javascript,C++,python,java,PHP";
let arrayLinguagens = linguagens.split(",");
console.log(arrayLinguagens); 

//trim (Tesoura)
let tesoura = "   JavaScript   ";
console.log(tesoura.trim()); // tira os espacos em branco


