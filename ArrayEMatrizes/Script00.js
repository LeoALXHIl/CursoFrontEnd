// matrizes 
// exemplos de matriz 2d - bi dimensional

let matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(matriz[1][1]); // 5

// criar uma matriz identidade

let Midentidade = [[], [], []];

Midentidade[0][0] = 1;
Midentidade[0][1] = 0;
Midentidade[0][2] = 0;
Midentidade[1][0] = 0;
Midentidade[1][1] = 1;
Midentidade[1][2] = 0;
Midentidade[2][0] = 0;
Midentidade[2][1] = 0;
Midentidade[2][2] = 1;

console.log(Midentidade);

for (let i = 0; i < Midentidade.length; i++) {
    for (let j = 0; j < Midentidade[i].length; j++) {
        console.log(Midentidade[i][j]);
    }
}