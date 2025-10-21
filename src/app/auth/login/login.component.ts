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

mensagemErro: string = '';

 onLogin() {
    const user = {
      username: this.email,
      password: this.senha
    };

    this.authService.login(user).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('nome', res.nome);
        localStorage.setItem('email', res.email);
        localStorage.setItem('perfil', String(res.perfil));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);

        if (err.error?.error === 'Usuário inativo!') {
          this.mensagemErro = 'Usuário inativo! Entre em contato com o administrador.';
        } else {
          this.mensagemErro = 'Usuário ou senha inválidos!';
        }
      }
    });
  }
}
