import { carrinho, setCarrinho } from "./state.js";
import { buscarProdutoPorId } from "./products.js";
import { salvarCarrinho } from "./storage.js";
import { salvarPedido } from "./orders.js";

export function adicionarProdutoNoCarrinho(produtoId) {
  const produto = buscarProdutoPorId(produtoId);
  if (!produto || produto.estoque <= 0) return;

  produto.estoque--;

  const itemExiste = carrinho.find((p) => p.id === produtoId);
  let novoCarrinho;

  if (itemExiste) {
    novoCarrinho = carrinho.map((p) =>
      p.id === produtoId ? { ...p, quantidade: p.quantidade + 1 } : p,
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
      p.id === produtoId ? { ...p, quantidade: p.quantidade - 1 } : p,
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
    if (!produto) return;

    const quantidadeValida = Math.max(1, item.quantidade);
    const quantidadeAjustada = Math.min(quantidadeValida, produto.estoque);

    if (quantidadeAjustada > 0) {
      produto.estoque -= quantidadeAjustada;
      carrinhoValido.push({ id: item.id, quantidade: quantidadeAjustada });
    }
  });

  setCarrinho(carrinhoValido);
  salvarCarrinho();
}

export function limparCarrinho() {
  carrinho.forEach((item) => {
    const produto = buscarProdutoPorId(item.id);
    if (produto) produto.estoque += item.quantidade;
  });

  setCarrinho([]);
  salvarCarrinho();
}

export function finalizarCompra() {
  const total = calcularTotal();
  const totalFormatado = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  if (carrinho.length === 0) {
    return alert("o carrinho esta vazio");
  }

  const confirmou = confirm(`Continuar para o pagamento?
Total: ${totalFormatado}`);

 if (!confirmou) {
    return;
  }

  const carrinhoPedido = [...carrinho];

  const pedido = {
    data: new Date().toLocaleString(),
    timestamp: Date.now(),
    itens: carrinhoPedido,
    quantidadeItens: carrinhoPedido.length,
    total: total,
  };
  
  salvarPedido(pedido);

  limparCarrinho();
  document.dispatchEvent(new Event("estadoAtualizado"));
}
