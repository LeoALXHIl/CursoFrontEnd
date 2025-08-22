import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  senha = '';
  erro = '';

  constructor(private authService: AuthService, private router: Router) {}

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
    }
  }
}
