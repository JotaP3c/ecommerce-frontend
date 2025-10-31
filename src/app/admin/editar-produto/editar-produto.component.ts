import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {
  produtos: any[] = [];

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.listarProdutos().subscribe({
      next: (data) => {
        this.produtos = data;
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
        alert('Erro ao carregar produtos.');
      }
    });
  }

  salvar(produto: any) {
    this.produtoService.atualizar(produto.id, produto).subscribe({
      next: () => {
        alert('Produto atualizado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao atualizar produto:', err);
        alert('Erro ao atualizar produto.');
      }
    });
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}
