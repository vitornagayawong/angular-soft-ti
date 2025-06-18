import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contato {
  id?: string;
  title: string;
  description: string;  
}

@Injectable({
  providedIn: 'root',
})

export class ContatoService {
  private apiUrl = 'http://localhost:3333/contatos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Contato[]> {
    return this.http.get<Contato[]>(this.apiUrl);
  }

  criar(contato: Contato): Observable<any> {
    return this.http.post(this.apiUrl, contato);
  }

  atualizar(id: string, contato: Contato): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, contato);
  }

  deletar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
