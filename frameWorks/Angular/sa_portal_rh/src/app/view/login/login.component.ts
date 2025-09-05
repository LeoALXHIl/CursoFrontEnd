<<<<<<< HEAD
import { Component } from '@angular/core';
=======
// Página de login de usuário
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
>>>>>>> b6bf680e20258895eec5fcd346d93bf69be29c0f

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
<<<<<<< HEAD
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
=======
  // Campos do formulário
  email = '';
  senha = '';
  erro = '';

  // Injeta AuthService e Router
  constructor(private authService: AuthService, private router: Router) {}

  // Realiza login e redireciona conforme tipo de usuário
  login() {
    if (this.authService.login(this.email, this.senha)) {
      const user = this.authService.getUser();
      if (user?.tipo === 'admin') {
        this.router.navigate(['/admin-vagas']);
      } else {
        this.router.navigate(['/vagas']);
      }
    } else {
      this.erro = 'Credenciais inválidas';
>>>>>>> b6bf680e20258895eec5fcd346d93bf69be29c0f
    }
  }
}
