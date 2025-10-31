import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtos: any[] = [];
  produtosFiltrados: any[] = [];
  filtro = '';

  isAdmin = false;
  nomeUsuario = '';
  carregando = false;
  fimDaLista = false;

  constructor(private produtoService: ProdutoService, public router: Router) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('perfil') === 'true';
    this.nomeUsuario = localStorage.getItem('nomeUsuario') || 'Usuário';
    this.carregarProdutos();
  }

  /** 🔹 Carrega TODOS os produtos ativos (sem paginação) */
  private carregarProdutos(): void {
    this.carregando = true;

    this.produtoService.listarTodosSemPaginacao().subscribe({
      next: (dados) => {
        // Filtra apenas produtos ativos
        this.produtos = (dados || []).filter((p: any) => p?.ativo === true);
        this.aplicarFiltroAtual();
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.carregando = false;
      }
    });
  }

  filtrarProdutos(): void {
    this.aplicarFiltroAtual();
  }

  private aplicarFiltroAtual(): void {
    const termo = this.filtro.trim().toLowerCase();
    if (!termo) {
      this.produtosFiltrados = [...this.produtos];
      return;
    }

    this.produtosFiltrados = this.produtos.filter((produto) =>
      String(produto?.id).includes(termo) ||
      String(produto?.nome || '').toLowerCase().includes(termo)
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  irParaAdmin() { this.router.navigate(['/admin']); }
  irParaCriarProduto() { this.router.navigate(['/admin/criar-produto']); }
  irParaEditarProduto() { this.router.navigate(['/admin/editar-produto']); }
  irParaDesativarProduto() { this.router.navigate(['/admin/desativar-produto']); }
}
