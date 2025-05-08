import { Component } from '@angular/core';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {
  //atributos
  nome: string = "";
  email: string = "";
  telefone: string = "";
  genero: string = "";
  idade: number | null = null;
  profissao: string = "";

  limparCampos(){
    this.nome = "";
    this.email = "";
    this.telefone = "";
    this.idade = null;
    this.profissao = "";
  }

  enviarFormulario() {
    if (!this.nome || !this.email || !this.telefone || !this.genero || !this.idade || !this.profissao) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }
    alert("Formulário enviado com sucesso!");
    console.log({
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      genero: this.genero,
      idade: this.idade,
      profissao: this.profissao
    });
  }
}

