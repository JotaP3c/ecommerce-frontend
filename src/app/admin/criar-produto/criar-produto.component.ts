import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/models/produto.model'; 

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent {
  produto: Produto = { 
    nome: '',
    descricao: '',
    preco: 0
  };

  carregando = false;
  imagemSelecionada: File | null = null;

  constructor(private produtoService: ProdutoService, private router: Router) {}

  onFileSelected(event: any) {
    this.imagemSelecionada = event.target.files[0];
  }

  criarProduto() {
    if (!this.produto.nome || !this.produto.descricao || !this.produto.preco) {
      alert('Preencha todos os campos!');
      return;
    }

    if (!this.produto.nome || !this.produto.descricao || !this.produto.preco) {
      alert('Preencha todos os campos!');
      return;
    }

    if (this.produto.preco < 1) {
      alert('O preço deve ser maior que zero.');
      return;
    }

    if (this.imagemSelecionada) {
      const formData = new FormData();
      formData.append('file', this.imagemSelecionada);

      this.produtoService.uploadImagem(formData).subscribe({
        next: (res) => {
          this.produto.imagemUrl = res.url;
          this.salvarProduto();
        },
        error: () => alert('Erro ao fazer upload da imagem.')
      });
    } else {
      this.salvarProduto();
    }
  }

  salvarProduto() {
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
