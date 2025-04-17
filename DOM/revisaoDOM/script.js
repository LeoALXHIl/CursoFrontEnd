// Manipulação DOM 
//  criar um header com -> DOM
let header = document.createElement("header");
// style do header
header.style.backgroundColor = "black";
header.style.height ="8vh";
// adicionar o header no body
document.body.appendChild(header);
document.body.style.margin = 0;
// criar uma navbar
let navBar = document.createElement("div");
navBar.classList.add("navBar");
// adicionar a navbar dentro do header
header.appendChild(navBar);
// preencher navbar
let menuItens = ["Home", "about","Products","contact"];
menuItens.forEach(element => {
    let a = document.createElement("a");
    a.innerText = element;
    a.classList.add("menuItens");
    navBar.appendChild(a);
});

// criando o footer
let footer = document.createElement("footer");
footer.style.backgroundColor = "black";
footer.style.height ="5vh";
footer.style.position = "absolute";
footer.style.bottom = "0"
footer.style.width ="100%"
// adicionar footer ao body
document.body.appendChild(footer);
// adicionar elementos ao footer
let bottomNavBar = document.createElement("div");
bottomNavBar.classList.add("bottomNavBar");
//bottomNavBar -> fotter
fotter.appendChild(bottomNavBar);
// itens do footer
let footerItens = ["Redes Sociais", "copyright", "Endereço"]
footerItens.forEach(element => {
    let a = document.createElement("a");
    a.innerText = element;
    a.classList.add("footerItens");
    navBar.appendChild(a);
})