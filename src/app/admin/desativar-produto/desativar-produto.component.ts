import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-desativar-produto',
  templateUrl: './desativar-produto.component.html',
  styleUrls: ['./desativar-produto.component.css']
})
export class DesativarProdutoComponent implements OnInit {
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
      },
      error: (err) => {
        console.error('Erro ao listar produtos:', err);
      }
    });
  }

  desativarProduto(id: number): void {
    if (confirm('Tem certeza que deseja desativar este produto?')) {
      this.produtoService.desativarProduto(id).subscribe({
        next: () => {
          alert('Produto desativado com sucesso!');
          this.listarProdutos();
        },
        error: (err) => {
          console.error('Erro ao desativar produto:', err);
        }
      });
    }
  }

  ativarProduto(id: number): void {
    if (confirm('Tem certeza que deseja ativar este produto?')) {
      this.produtoService.ativarProduto(id).subscribe({
        next: () => {
          alert('Produto ativado com sucesso!');
          this.listarProdutos();
        },
        error: (err) => {
          console.error('Erro ao ativar produto:', err);
        }
      });
    }
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
}
