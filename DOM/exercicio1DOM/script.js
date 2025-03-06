function alterarTexto() {
    document.getElementById("#titulo").innerText = "Texto Alterado! Boa Pa Nois"; 
    let paragrafos = document.getElementsByTagName('h3');
    paragrafos[0].innerText = "Texto do parágrafo alterado!";
}

function alterarcor(){
    document.body.style.background = "blue";
}

function mudarcor(){
    document.body.style.background = "white";
}
function adicionarClasse(){
    descricao.style.color = "red";
}

//4 adicionar classe
function adicionarClasse() {
    titulo.classList.add("descricao");
    let descricao = document.getElementsByClassName("descricao");
    descricao.style.color = "red";
}
