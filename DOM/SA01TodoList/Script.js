// Usar o dom para adicionar um evento no html
document.getElementById("btnAdicionar").addEventListener(
    "click", adicionarTarefa);

function adicionarTarefa() {
    let input = document.getElementById("tarefa"); // recorta os valores em branco antes e dps
    let texto = input.value.trim();
    
    if (texto === "") {
        return; // Interrompe a função
    }
    // continuar o código se o texto não for vazio ""
    let li = document.createElement("li"); // criando um elemento de lista
    li.innerHTML = texto + '<button onclick="removerTarefa(this)">Remover</button>';
    
    let ul = document.getElementById("lista");
    ul.appendChild(li); // adicionar o item à lista

    input.value = "";
}

function removerTarefa(botao) { // funcao do botao para remover o elemento parent
    let li = botao.parentElement;
    li.remove();
}

document.getElementById("mudarCor").addEventListener("click", function() {
    let cores = ["red", "blue", "green", "purple", "orange"];
    document.body.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
});
