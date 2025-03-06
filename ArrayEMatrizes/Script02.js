// operações avançadas em vetores arrays

//filtros (percorre e faz uma Seleção)
let numeros = [10,20,30,40,50];
let numerosmaior20 = numeros.filter(x => x > 20 );
console.log (numerosmaior20);
 
//map (Percorre e faz uma Acão)
numerosNovos = numeros.map(x => x*3);
console.log(numerosNovos);


// reduce (transforma um vetor em uma variavel simples (valor inicial e valor atual))
let soma = numeros.reduce((acumulador, valoratual) => acumulador + valoratual, 0);
console.log(soma); // 150



// sort organizadaor 

let aleatorio = [2,5,1,3,8,6,9,0,7,4];
 aleatorio.sort();
 console.log(aleatorio);


 
