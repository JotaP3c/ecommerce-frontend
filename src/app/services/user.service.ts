import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  listarPaginado(page: number, size: number, sortBy: string = 'id'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  buscarPorNome(nome: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?nome=${nome}`, { headers: this.getHeaders() });
  }

  buscarPorEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`, { headers: this.getHeaders() });
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  buscarPorPerfil(perfil: boolean): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?perfil=${perfil}`, { headers: this.getHeaders() });
  }

  atualizar(id: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario, { headers: this.getHeaders() });
  }

  desativar(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/desativar`, {}, { headers: this.getHeaders() });
  }

  ativar(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/ativar`, {}, { headers: this.getHeaders() });
  }

  criar(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario, { headers: this.getHeaders() });
  }
}
