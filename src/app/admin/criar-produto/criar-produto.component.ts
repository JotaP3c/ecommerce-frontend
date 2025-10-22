import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent {
  produto = {
    nome: '',
    descricao: '',
    preco: 0
  };

  constructor(private produtoService: ProdutoService, private router: Router) {}

  criarProduto() {
    if (!this.produto.nome || !this.produto.descricao || !this.produto.preco) {
      alert('Preencha todos os campos!');
      return;
    }

    this.produtoService.criar(this.produto).subscribe({
      next: () => {
        alert('Produto criado com sucesso!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao criar produto:', err);
        alert('Erro ao criar produto.');
      }
    });
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}
