<<<<<<< HEAD
import { Component } from '@angular/core';
=======
// Página de registro de novo usuário
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
>>>>>>> b6bf680e20258895eec5fcd346d93bf69be29c0f

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
<<<<<<< HEAD
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
=======
  // Campos do formulário
  nome = '';
  email = '';
  senha = '';
  tipo: 'comum' | 'admin' = 'comum';
  erro = '';

  // Injeta AuthService e Router
  constructor(private authService: AuthService, private router: Router) {}

  // Realiza registro e redireciona conforme tipo de usuário
  registrar() {
    if (this.authService.register(this.nome, this.email, this.senha, this.tipo)) {
      this.router.navigate([this.tipo === 'admin' ? '/admin-vagas' : '/vagas']);
    } else {
      this.erro = 'Erro ao registrar usuário.';
>>>>>>> b6bf680e20258895eec5fcd346d93bf69be29c0f
    }
  }
}
