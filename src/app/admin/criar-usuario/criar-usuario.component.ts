import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent {
  usuario = {
    nome: '',
    email: '',
    senha: '',
    perfil: false,
    ativo: true
  };

  constructor(private userService: UserService, private router: Router) {}

  criarUsuario() {
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    this.userService.criar(this.usuario).subscribe({
      next: () => {
        alert('Usuário criado com sucesso!');
        this.router.navigate(['/admin/usuarios']);
      },
      error: (err) => {
        console.error('Erro ao criar usuário:', err);
        alert('Erro ao criar usuário.');
      }
    });
  }

  voltar() {
    this.router.navigate(['/admin/usuarios']);
  }
}
