import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vaga {
  id: string;
  nome: string;
  foto: string;
  descricao: string;
  salario: number;
}

@Injectable({ providedIn: 'root' })
export class VagasAdminService {
  private apiUrl = 'http://localhost:3001/vagas';

  constructor(private http: HttpClient) {}

  getVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.apiUrl);
  }

  addVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.post<Vaga>(this.apiUrl, vaga);
  }

  updateVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.put<Vaga>(`${this.apiUrl}/${vaga.id}`, vaga);
  }

  deleteVaga(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
