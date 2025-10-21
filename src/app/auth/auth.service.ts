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

  // ✅ Método de login mais limpo e seguro
  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap((res) => {
        // 👇 Verifica se o usuário está inativo
        if (!res.ativo) {
          alert('Usuário inativo. Contate o administrador.');
          return;
        }

        // 👇 Armazena dados no localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('nome', res.nome);
        localStorage.setItem('email', res.email);
        localStorage.setItem('perfil', String(res.perfil));
        localStorage.setItem('ativo', String(res.ativo));

        // 👇 Redireciona para a Home
        this.router.navigate(['/home']);
      }),
      catchError((err) => {
        console.error('Erro ao fazer login:', err);
        alert('Usuário ou senha inválidos!');
        throw err;
      })
    );
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
