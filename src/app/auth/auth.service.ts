import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

interface LoginResponse {
  token: string;
  nome: string;
  email: string;
  perfil: boolean;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getPerfil(): boolean {
    return localStorage.getItem('perfil') === 'true';
  }

  isAtivo(): boolean {
    return localStorage.getItem('ativo') === 'true';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
