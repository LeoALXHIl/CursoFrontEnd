// exemplo de script para manipulação DOM

function clickbtn() {
    // manipulação pelo id -> variavel do tipo simples
    let titulo = document.getElementById("titulo");
    console.log(titulo);
    titulo.innerText = "Meu Titulo Modificado";
    let li = document.createElement("li");
    let Texto ="modificar o texto do titulo"
    li.innerHTML = Texto+'<button onclick="btnconfere(this)">Confere</button>';
    document.querySelectorAll(".lista").appendChild(li); // variavel simples
    //getelementsbyclassname-> vetor .descricao

    let descricao = document.getElementsByClassName("descricao");
    console.log(descricao);
    descricao.querySelectorAll(element => element.style.color = "red" ) 
    Texto = "modificada a cor da classe descricao para vermelho"
    li.innerHTML = Texto+'<button onclick="btnconfere(this)">Confere</button>';
    document.querySelector(".lista").appendChild(li); 
    
    {
        
    };
    

}
