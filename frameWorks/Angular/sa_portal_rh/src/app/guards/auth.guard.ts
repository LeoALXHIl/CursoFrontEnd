// Guard para proteger rotas que exigem login
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  // Injeta AuthService e Router
  constructor(private authService: AuthService, private router: Router) {}

  // Permite acesso apenas se estiver logado
  canActivate(): boolean {
    if (this.authService.getUser()) {
      return true;
    }
    // Redireciona para login se não estiver logado
    this.router.navigate(['/login']);
    return false;
  }
}
