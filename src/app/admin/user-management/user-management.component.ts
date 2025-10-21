import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  usuarios: any[] = [];
  termoBusca: string = '';
  filtroTipo: string = 'nome'; // nome, email, id, perfil
  editando: any = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  voltar() {
  this.router.navigate(['/home']);
  }

  listarTodos() {
    this.userService.listar().subscribe({
      next: (dados) => this.usuarios = dados,
      error: (err) => console.error('Erro ao carregar usuários', err)
    });
  }

  buscar() {
    if (!this.termoBusca) return this.listarTodos();

    switch (this.filtroTipo) {
      case 'nome':
        this.userService.buscarPorNome(this.termoBusca).subscribe({
          next: (dados) => this.usuarios = dados
        });
        break;
      case 'email':
        this.userService.buscarPorEmail(this.termoBusca).subscribe({
          next: (dados) => this.usuarios = dados
        });
        break;
      case 'id':
        this.userService.buscarPorId(Number(this.termoBusca)).subscribe({
          next: (dado) => this.usuarios = [dado]
        });
        break;
      case 'perfil':
        this.userService.buscarPorPerfil(this.termoBusca === 'true').subscribe({
          next: (dados) => this.usuarios = dados
        });
        break;
    }
  }

  editarUsuario(usuario: any) {
    this.editando = { ...usuario };
  }

  salvarEdicao() {
    if (!this.editando) return;
    this.userService.atualizar(this.editando.id, this.editando).subscribe({
      next: () => {
        alert('Usuário atualizado com sucesso!');
        this.editando = null;
        this.listarTodos();
      }
    });
  }

  desativarUsuario(id: number) {
    if (confirm('Tem certeza que deseja desativar este usuário?')) {
      this.userService.desativar(id).subscribe({
        next: () => {
          alert('Usuário desativado com sucesso!');
          this.listarTodos();
        }
      });
    }
  }
}
