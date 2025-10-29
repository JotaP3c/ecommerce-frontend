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
  carregando = false;

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  /** 🔹 Agora lista todos os produtos (ativos e inativos) */
  listarProdutos(): void {
    this.carregando = true;
    this.produtoService.listarTodosSemPaginacao().subscribe({
      next: (data) => {
        this.produtos = data.sort((a, b) => a.id - b.id); // ordena por ID ascendente
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao listar produtos:', err);
        this.carregando = false;
      }
    });
  }

  /** 🔻 Desativa produto */
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

  /** 🔺 Ativa produto */
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
