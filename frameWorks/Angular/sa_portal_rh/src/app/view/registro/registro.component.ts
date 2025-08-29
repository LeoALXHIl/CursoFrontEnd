import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  nome = '';
  email = '';
  senha = '';
  tipo = 'candidato';
  sucesso = false;
  erro = false;

  registrar() {
    // Lógica fake de registro
    if (this.nome && this.email && this.senha) {
      this.sucesso = true;
      this.erro = false;
    } else {
      this.sucesso = false;
      this.erro = true;
    }
  }
}
