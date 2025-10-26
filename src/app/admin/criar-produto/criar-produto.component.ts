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

   carregando = false; 


  constructor(private produtoService: ProdutoService, private router: Router) {
    
  }

  criarProduto() {
    if (this.carregando) return; 
    this.carregando = true;

    if (!this.produto.nome || !this.produto.descricao || this.produto.preco <= 0) {
      alert('Preencha todos os campos corretamente!');
      this.carregando = false;
      return;
    }

    this.produtoService.criar(this.produto).subscribe({
      next: () => {
        alert('Produto criado com sucesso!');
        this.router.navigate(['/home']);
        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao criar produto:', err);
        alert(err.error || 'Erro ao criar produto.');
        this.carregando = false;
      }
    });
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}
