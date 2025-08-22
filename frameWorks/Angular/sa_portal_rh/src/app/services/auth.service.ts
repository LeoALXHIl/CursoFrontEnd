import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(email: string, senha: string): boolean {
    // Busca usuários cadastrados
    const usersStr = localStorage.getItem('users');
    let users: User[] = [];
    if (usersStr) {
      users = JSON.parse(usersStr);
    }
    // Adiciona os usuários fixos
    users.push({ id: '1', nome: 'Admin', email: 'admin@rhconnect.com', senha: 'admin', tipo: 'admin' });
    users.push({ id: '2', nome: 'Usuário', email: 'user@rhconnect.com', senha: 'user', tipo: 'comum' });
    const user = users.find(u => u.email === email && u.senha === senha);
    if (user) {
      this.setUser(user);
      return true;
    }
    return false;
  }

  register(nome: string, email: string, senha: string, tipo: 'comum' | 'admin' = 'comum'): boolean {
    const user: User = { id: Date.now().toString(), nome, email, senha, tipo };
    // Salva no array de usuários
    const usersStr = localStorage.getItem('users');
    let users: User[] = [];
    if (usersStr) {
      users = JSON.parse(usersStr);
    }
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    this.setUser(user);
    return true;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  private setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
