import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { vaga } from '../models/vaga.model';
@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiurl = "http://localhost:3000/vagas"; // caminho da api

  constructor(private http: HttpClient) { }

  //metodos de conexão com a api

  // get - read
  getVagas(): Observable<vaga[]> {
    return this.http.get<vaga[]>(this.apiurl).pipe(
      catchError(error => {
        alert('Erro ao carregar vagas. Verifique a conexão com o servidor.');
        console.error('Erro ao carregar vagas:', error);
        return throwError(() => error);
      })
    );
  }

  //post - create
  cadastrarVaga(vaga: vaga): Observable<vaga>{
    // Certifique-se de que o objeto vaga contém todos os campos obrigatórios esperados pelo backend.
    // Exemplo: { nome: 'Fulano', email: 'fulano@email.com', ... }
    console.log('Enviando vaga para cadastro:', vaga);
    return this.http.post<vaga>(this.apiurl, vaga).pipe(
      catchError(error => {
        alert('Erro ao cadastrar vaga. Verifique a conexão com o servidor.');
        console.error('Erro ao cadastrar vaga:', error);
        return throwError(() => error);
      })
    );
  }

  //put - update
  atualizarVaga(id: any, vaga: vaga): Observable<vaga[]>{
    const urlAtualizado = `${this.apiurl}/${id}`;
    return this.http.put<vaga[]>(urlAtualizado, vaga);
  }

  //delete - delete
  removerVaga(id: any): Observable<vaga[]>{
    const urlDdeletar = `${this.apiurl}/${id}`;
    return this.http.delete<vaga[]>(urlDdeletar,);
  }
}

