document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let Senha = document.getElementById("Senha").value;
    let Telefone = document.getElementById("Telefone").value;
    let Idade = document.getElementById("Idade").value;
    let mensagem = document.getElementById("mensagem");

    if (nome === "" || email === "" || Senha === "" || Telefone === "" || Idade === "") {
        mensagem.innerText = "Todos os campos são obrigatórios!";
        mensagem.style.color = "red";
    } else {
        mensagem.innerText = "Cadastro realizado com sucesso!";
        mensagem.style.color = "green";
    }
});
