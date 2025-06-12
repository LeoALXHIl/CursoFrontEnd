import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { curriculo } from '../models/curriculo.model';
@Injectable({
  providedIn: 'root'
})
export class curriculosService {
  private apiurl = "http://localhost:3001/curriculos"; // caminho da api

  constructor(private http: HttpClient) { }

  //metodos de conexão com a api

  // get - read
  getcurriculos(): Observable<curriculo[]> { //responsavel por traduzir as informções da api pro model
    return this.http.get<curriculo[]>(this.apiurl); // responsavel por endereço da conexão e retorno da informção
  }

  //post - create
  cadastrarcurriculo(curriculo: curriculo): Observable<curriculo>{
    return this.http.post<curriculo>(this.apiurl, curriculo);
  }

  //put - update
  atualizarcurriculo(identificador: any, curriculo: curriculo): Observable<curriculo>{
    const urlAtualizado = `${this.apiurl}/${identificador}`;
    return this.http.put<curriculo>(urlAtualizado, curriculo);
  }

  //delete - delete
  removercurriculo(identificador: any): Observable<curriculo>{
    const urlDdeletar = `${this.apiurl}/${identificador}`;
    return this.http.delete<curriculo>(urlDdeletar,);
  }


}
