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
  const user = {
    username: this.email,
    password: this.senha
  };

  this.authService.login(user); // ✅ sem .subscribe()
}
}
