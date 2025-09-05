// Guard para proteger rotas exclusivas de administradores
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  // Injeta AuthService e Router
  constructor(private authService: AuthService, private router: Router) {}

  // Permite acesso apenas se o usuário for admin
  canActivate(): boolean {
    const user = this.authService.getUser();
    if (user && user.tipo === 'admin') {
      return true;
    }
    // Redireciona para login se não for admin
    this.router.navigate(['/login']);
    return false;
  }
}
