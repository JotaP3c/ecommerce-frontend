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
  filtro: string = '';
  isAdmin: boolean = false;
   nomeUsuario: string = '';

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    const perfil = localStorage.getItem('perfil');
    this.isAdmin = perfil === 'true';
    console.log('Perfil admin?', this.isAdmin);

    const nome = localStorage.getItem('nomeUsuario');
    this.nomeUsuario = nome ? nome : 'Usuário';

    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listarProdutos().subscribe({
      next: (data) => {
        this.produtos = data.filter((p: any) => p.ativo === true);
        this.produtosFiltrados = [...this.produtos];
      },
      error: (err) => console.error('Erro ao buscar produtos:', err)
    });
  }

  filtrarProdutos() {
    const termo = this.filtro.toLowerCase();

    this.produtosFiltrados = this.produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(termo) || produto.id.toString().includes(termo)
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  irParaAdmin() {
    this.router.navigate(['/admin']);
  }

  irParaCriarProduto() {
    this.router.navigate(['/admin/criar-produto']);
  }

  irParaEditarProduto() {
    this.router.navigate(['/admin/editar-produto']);
  }

  irParaDesativarProduto() {
    this.router.navigate(['/admin/desativar-produto']);
  }
}
