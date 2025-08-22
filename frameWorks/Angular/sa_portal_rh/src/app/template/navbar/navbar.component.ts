// Navbar condicional conforme tipo de usuário
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // Injeta AuthService e Router
  constructor(public authService: AuthService, private router: Router) {}

  // Realiza logout e redireciona para login
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
