import { carrinho, setCarrinho } from "./state.js";
import { buscarProdutoPorId } from "./products.js";
import { salvarCarrinho } from "./storage.js";

export function adicionarProdutoNoCarrinho(produtoId) {
  const produto = buscarProdutoPorId(produtoId);
  if (!produto || produto.estoque <= 0) return;

  produto.estoque--;

  const itemExiste = carrinho.find((p) => p.id === produtoId);

  let novoCarrinho;

  if (itemExiste) {
    novoCarrinho = carrinho.map((p) =>
      p.id === produtoId ? { ...p, quantidade: p.quantidade + 1 } : p
    );
  } else {
    novoCarrinho = [...carrinho, { id: produtoId, quantidade: 1 }];
  }

  setCarrinho(novoCarrinho);
  salvarCarrinho();
}

export function removerDoCarrinho(produtoId) {
  const produto = buscarProdutoPorId(produtoId);
  if (!produto) return;

  produto.estoque++;

  const novoCarrinho = carrinho
    .map((p) =>
      p.id === produtoId ? { ...p, quantidade: p.quantidade - 1 } : p
    )
    .filter((p) => p.quantidade > 0);

  setCarrinho(novoCarrinho);
  salvarCarrinho();
}

export function calcularTotal() {
  return carrinho.reduce((total, item) => {
    const produto = buscarProdutoPorId(item.id);

    if (!produto) return total;

    return total + produto.preco * item.quantidade;
  }, 0);
}

export function recalcularEstoque() {
  let carrinhoValido = [];

  carrinho.forEach((item) => {
    const produto = buscarProdutoPorId(item.id);

    // Se o produto não existir mais, ignora
    if (!produto) return;

    // Garante que quantidade seja pelo menos 1
    const quantidadeValida = Math.max(1, item.quantidade);

    // Se quantidade for maior que estoque disponível, ajusta
    const quantidadeAjustada = Math.min(
      quantidadeValida,
      produto.estoque
    );

    // Só adiciona ao carrinho se ainda houver estoque
    if (quantidadeAjustada > 0) {
      produto.estoque -= quantidadeAjustada;

      carrinhoValido.push({
        id: item.id,
        quantidade: quantidadeAjustada,
      });
    }
  });

  setCarrinho(carrinhoValido);
  salvarCarrinho();
}

export function limparCarrinho() {
    carrinho.forEach((item) => {
        const produto = buscarProdutoPorId(item.id);

        if (produto) {
            produto.estoque += item.quantidade;
        }
    });

    setCarrinho([]);
    salvarCarrinho();
}

export function removerProdutoDoCarrinho(produtoId) {

  const item = carrinho.find(p => p.id === produtoId);

  if (!item) return;

  const produto = buscarProdutoPorId(produtoId);

  if (produto) {
    produto.estoque += item.quantidade;
  }

  const novoCarrinho = carrinho.filter(p => p.id !== produtoId);

  setCarrinho(novoCarrinho);
  salvarCarrinho();

}

export function getQuantidadeTotalCarrinho() {
  return carrinho.reduce((total, item) => {
    return total + item.quantidade;
  }, 0);
}

export function getItensCarrinhoComProduto() {
  return carrinho.map(item => {
    const produto = buscarProdutoPorId(item.id);

    return {
      ...item, produto
    };
  
  });
  
}