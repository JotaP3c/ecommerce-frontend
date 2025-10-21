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
  isAdmin: boolean = false;

  constructor(private produtoService: ProdutoService, private router: Router) {}

ngOnInit(): void {
  const perfil = localStorage.getItem('perfil');
  this.isAdmin = perfil === 'true';
  console.log('Perfil admin?', this.isAdmin);

  this.carregarProdutos();
}
  carregarProdutos() {
    this.produtoService.listarProdutos().subscribe({
      next: (data) => this.produtos = data,
      error: (err) => console.error('Erro ao buscar produtos:', err)
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  irParaAdmin() {
    this.router.navigate(['/admin']);
  }
}
