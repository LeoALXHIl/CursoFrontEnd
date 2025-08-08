import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //atributos
  private apiUrl = "http://localhost:3001/usuarios";
  private readonly CHAVE_AUTH = 'usuarioLogado';

  constructor(private router: Router, private http: HttpClient) { }

  //métodos
  // cadastrar usuario no sistema
   registrar(usuario: any): Observable<any>{
    //verificar se o usuario já existe (get-> email)
    return this.http.get<any[]>(`${this.apiUrl}?email=${usuario.email}`).pipe(
      map(usuarios => {
        //se usuario ja existe lançar um erro
        if (usuarios.length>0){
          throw new Error('Usuário ja cadastrado');
        }
        return usuario
      }),
      //caso o usuario não exista
      switchMap( novoUsuario =>
        this.http.post(this.apiUrl,novoUsuario).pipe(
                   tap(()=> alert('Registro realizado com sucesso'))
        )
      ),
      //pegar erros de conexão
      catchError(err => {
        alert(`Erro: ${err.message}`);
        throw err;
      })
    );

  }
  //metodo para fazer login de usuario ja cadastrado
  login(credenciais: any): Observable<boolean> {
    //passar para o banco uma busca com email e senha
    return this.http
      .get<any[]>(
        `${this.apiUrl}?email=${credenciais.email}&senha=${credenciais.senha}`
      )

      .pipe(
        map((usuarios) => {
          //não encontrado
          if (usuarios.length === 0) {
            return false;
          } else {
            // o usuário  e sua chave de autenticação => localStorage
            const usuario = usuarios[0];
            localStorage.setItem(this.CHAVE_AUTH, JSON.stringify(usuario));
            return true; // pode avancar
          }
        })
      );
  }
  // deslogar o usuario
  logout() {
    localStorage.removeItem(this.CHAVE_AUTH);
    this.router.navigate(["/home"]);
  }

  // verificar se usuario já fez autenticação
  //(autorização do acesso)
  estaAutenticado(): boolean{
    // transformar a verificação da string em booleano
    return !! localStorage.getItem(this.CHAVE_AUTH);
  }

  // pegar os dados do usuário
  getUsuarioAtual():any{
    // quando eu armazeno no localstorage ele armazena como texto
    // quando vou pergar as informaçoes do localstorage eu converto para json
    return JSON.parse(localStorage.getItem(this.CHAVE_AUTH) || '{}');
  }

}