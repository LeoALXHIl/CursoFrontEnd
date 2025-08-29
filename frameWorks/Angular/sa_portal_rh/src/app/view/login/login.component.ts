import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  senha = '';
  mostrarErro = false;

  login() {
    // Lógica de autenticação fake
    if (this.email === 'admin@admin.com' && this.senha === 'admin') {
      // Redirecionar para área administrativa
      window.location.href = '/vaga-listar';
    } else if (this.email === 'candidato@user.com' && this.senha === '123') {
      // Redirecionar para área do candidato
      window.location.href = '/curriculos';
    } else {
      this.mostrarErro = true;
    }
  }
}
