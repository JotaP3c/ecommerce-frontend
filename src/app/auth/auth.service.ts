import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: any) {
    this.http.post(this.apiUrl, user).subscribe({
      next: (res: any) => {
        // 🔥 Salva todos os dados no localStorage
        localStorage.setItem('token', res.token);
        localStorage.setItem('nome', res.nome);
        localStorage.setItem('email', res.email);
        localStorage.setItem('perfil', String(res.perfil)); // 👈 converte para string

        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        alert('Usuário ou senha inválidos!');
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
