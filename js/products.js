import { produtos } from "./data.js";

export function listarProdutos() {
  return produtos;
}

export function buscarProdutoPorId(id) {
  return produtos.find((p) => p.id === id);
}

export function adicionarProduto(novoProduto) {
  produtos.push(novoProduto);
}

export function removerProduto(id) {
  const index = produtos.findIndex(p => p.id === id);
  if (index !== -1) produtos.splice(index, 1);
}

export function atualizarPreco(id, novoPreco) {
  const produto = buscarProdutoPorId(id);
  if (produto) produto.preco = novoPreco;
}