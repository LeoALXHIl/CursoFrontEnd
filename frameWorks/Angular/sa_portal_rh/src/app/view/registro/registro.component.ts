// Página de registro de novo usuário
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
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
    }
  }
}
