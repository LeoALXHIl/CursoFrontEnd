import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { vaga } from '../models/vaga.model';
@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiurl = "http://localhost:3001/vagas"; // caminho da api

  constructor(private http: HttpClient) { }

//metodos de conexão com a api

// get - read
getVagas(): Observable<vaga[]> { //responsavel por traduzir as informções da api pro model
  return this.http.get<vaga[]>(this.apiurl); // responsavel por endereço da conexão e retorno da informção
}

//post - create
cadastrarVaga(vaga: vaga): Observable<vaga[]>{
  return this.http.post<vaga[]>(this.apiurl, vaga);
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
