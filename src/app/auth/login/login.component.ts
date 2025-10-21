import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.senha) {
      alert('Por favor, preencha o e-mail e a senha.');
      return;
    }

    const user = {
      username: this.email,
      password: this.senha
    };

    this.authService.login(user).subscribe({
      next: (res) => {
        if (!res.ativo) {
          alert('Usuário inativo. Contate o administrador.');
          return;
        }
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Usuário ou senha inválidos!');
      }
    });
  }
}
