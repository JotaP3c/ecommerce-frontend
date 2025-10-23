import { Component, HostListener, OnInit } from '@angular/core';
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

  page = 0;
  size = 12;
  carregando = false;
  fimDaLista = false;

  constructor(private produtoService: ProdutoService, public router: Router) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('perfil') === 'true';
    this.nomeUsuario = localStorage.getItem('nomeUsuario') || 'Usuário';
    this.carregarPagina();
  }

  /** Escuta rolagem da janela (scroll global) */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.carregando || this.fimDaLista) return;

    const posicaoAtual = (window.scrollY || document.documentElement.scrollTop) + window.innerHeight;
    const alturaTotal = document.documentElement.scrollHeight;

    if (posicaoAtual >= alturaTotal - 100) {
      this.carregarPagina();
    }
  }

  private carregarPagina(): void {
    if (this.carregando || this.fimDaLista) return;
    this.carregando = true;

    this.produtoService.listarPaginado(this.page, this.size, 'id').subscribe({
      next: (dados) => {
        const ativos = (dados || []).filter((p: any) => p?.ativo === true);
        if (ativos.length === 0) {
          this.fimDaLista = true;
        } else {
          this.produtos = [...this.produtos, ...ativos];
          this.aplicarFiltroAtual();
          this.page++;
        }
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
