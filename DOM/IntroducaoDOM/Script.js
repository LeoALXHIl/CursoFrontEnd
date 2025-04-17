function alterarTexto() {
    document.getElementById("titulo").innerText = "Texto Alterado!";
}

// Seleção do elemento pelo id
let titulo = document.getElementById("titulo");
// Alterando a cor do título
titulo.style.color = "blue";

let descricao = document.getElementsByClassName("descricao");
// Alterando a cor dos elementos com a classe "descricao"
descricao[0].style.fontWeight = "bold";
descricao[1].style.color = "green";
descricao[2].style.color = "red";

let todosparagrafos = document.getElementsByTagName("p");
console.log(todosparagrafos.length);

// querySelector - primeiro elemento com a classe "descricao"
let primeiroDescricao = document.querySelector(".descricao"); 
primeiroDescricao.style.color = "red";

// querySelectorAll - aplica em todos os elementos <p>
let ps = document.querySelectorAll("p");
ps.forEach(p => p.style.fontSize = "18px");

// adicionar classe
function adicionarClasse() {
    titulo.classList.add("descricao");
    let descricao = document.getElementsByClassName("descricao");
    for (let i = 0; i < descricao.length; i++) {
        descricao[i].style.color = "red";
    }
}
