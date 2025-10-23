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
  filtroTipo: string = 'nome';
  editando: any = null;
  page: number = 0;
  size: number = 10;
  carregando: boolean = false;
  fimDaLista: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos(): void {
    if (this.carregando || this.fimDaLista) return;
    this.carregando = true;

    this.userService.listarPaginado(this.page, this.size).subscribe({
      next: (dados) => {
        if (dados.length === 0) {
          this.fimDaLista = true;
        } else {
          this.usuarios = [...this.usuarios, ...dados];
          this.page++;
        }
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários', err);
        this.carregando = false;
      }
    });
  }

  onScroll(event: any): void {
    const element = event.target;
    if (!this.carregando && !this.fimDaLista && element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
      this.listarTodos();
    }
  }

  editarUsuario(usuario: any): void {
    console.log('Usuário selecionado para edição:', usuario);
    this.editando = { ...usuario }; // Clona o usuário para edição
  }

  salvarEdicao(): void {
    if (!this.editando) return;

    this.userService.atualizar(this.editando.id, this.editando).subscribe({
      next: () => {
        alert('Usuário atualizado com sucesso!');
        const index = this.usuarios.findIndex(u => u.id === this.editando.id);
        if (index !== -1) {
          this.usuarios[index] = { ...this.editando };
        }
        this.editando = null;
      },
      error: (err) => {
        console.error('Erro ao salvar edição:', err);
        alert('Erro ao atualizar o usuário.');
      }
    });
  }

  cancelarEdicao(): void {
    this.editando = null;
  }

  buscar(): void {
    if (!this.termoBusca.trim()) {
      this.page = 0;
      this.usuarios = [];
      return this.listarTodos();
    }

    switch (this.filtroTipo) {
      case 'nome':
        this.userService.buscarPorNome(this.termoBusca).subscribe({
          next: (dados) => {
            this.usuarios = dados.sort((a, b) =>
              a.nome.localeCompare(b.nome, 'pt-BR', { sensitivity: 'base' })
            );
          },
          error: (err) => console.error('Erro na busca por nome:', err)
        });
        break;

      case 'email':
        this.userService.buscarPorEmail(this.termoBusca).subscribe({
          next: (dados) => (this.usuarios = dados),
          error: (err) => console.error('Erro na busca por email:', err)
        });
        break;

      case 'id':
        this.userService.buscarPorId(Number(this.termoBusca)).subscribe({
          next: (dado) => (this.usuarios = [dado].sort((a, b) => a.id - b.id)),
          error: (err) => console.error('Erro na busca por ID:', err)
        });
        break;

      case 'perfil':
        const isAdmin = this.termoBusca.toLowerCase() === 'admin' || this.termoBusca === 'true';
        this.userService.buscarPorPerfil(isAdmin).subscribe({
          next: (dados) => (this.usuarios = dados),
          error: (err) => console.error('Erro na busca por perfil:', err)
        });
        break;
    }
  }

    resetarLista(): void {
    this.page = 0;
    this.usuarios = [];
    this.fimDaLista = false;
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }

  irParaCriarUsuario(): void {
    this.router.navigate(['/admin/usuarios/novo']);
  }

  desativarUsuario(id: number): void {
    if (confirm('Tem certeza que deseja desativar este usuário?')) {
      this.userService.desativar(id).subscribe({
        next: () => {
          alert('Usuário desativado com sucesso!');
          const user = this.usuarios.find(u => u.id === id);
          if (user) user.ativo = false;
        },
        error: (err) => console.error('Erro ao desativar usuário:', err)
      });
    }
  }

  ativarUsuario(id: number): void {
    if (confirm('Deseja ativar este usuário?')) {
      this.userService.ativar(id).subscribe({
        next: () => {
          alert('Usuário ativado com sucesso!');
          const user = this.usuarios.find(u => u.id === id);
          if (user) user.ativo = true;
        },
        error: (err) => {
          console.error('Erro ao ativar usuário:', err);
          alert('Erro ao ativar usuário.');
        }
      });
    }
  }
}
