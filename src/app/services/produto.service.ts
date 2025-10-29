import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private base = environment.API_URL;
  private apiUrl = `${this.base}/produtos`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    });
  }

  listarProdutos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  listarPaginado(page: number, size: number, sortBy: string = 'id'): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  listarTodosSemPaginacao(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/todos`, { headers: this.getHeaders() });
  }

  criar(produto: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, produto, { headers: this.getHeaders() });
  }

  atualizar(id: number, produto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, produto, { headers: this.getHeaders() });
  }

  desativarProduto(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/desativar`, {}, { headers: this.getHeaders() });
  }

  ativarProduto(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/ativar`, {}, { headers: this.getHeaders() });
  }

  uploadImagem(formData: FormData) {
    return this.http.post<{ url: string }>(`${this.apiUrl}/upload`, formData);
  }
}
