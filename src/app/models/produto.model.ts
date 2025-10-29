export interface Produto {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl?: string; // ✅ campo opcional para armazenar o link da imagem
}
