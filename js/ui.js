import { carrinho } from "./state.js";
import {
  adicionarProdutoNoCarrinho,
  removerDoCarrinho,
  calcularTotal,
  limparCarrinho,
} from "./cart.js";
import { buscarProdutoPorId } from "./products.js";
import { abrirModal } from "./modal.js";
import { getHistoricoCompras } from "./orders.js";
import { produtos } from "./data.js";

// Renderiza a lista de produtos (recebe a lista filtrada do app.js)
export function renderizarProdutos(lista) {
  const listaDosProdutos = document.querySelector("#lista-produtos");
  listaDosProdutos.innerHTML = "";

  if (!lista || lista.length === 0) {
    listaDosProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  lista.forEach((produto) => {
    const container = document.createElement("div");
    container.classList.add("containerProdutos");

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    const preco = document.createElement("p");
    preco.textContent = `R$ ${produto.preco}`;

    const estoque = document.createElement("p");
    estoque.textContent = `Estoque: ${produto.estoque}`;

    const botao = document.createElement("button");
    botao.classList.add("btnsCart", "safeColor");
    if (produto.estoque > 0) {
      botao.textContent = "Adicionar ao carrinho";
    } else {
      botao.disabled = true;
      botao.textContent = "Produto indisponível";
    }

    const btnModal = document.createElement("button");
    btnModal.textContent = "Detalhes...";
    btnModal.classList.add("btnsCart");

    btnModal.addEventListener("click", () => {
      abrirModal(produto);
    });

    // Ao clicar, adiciona produto e dispara evento global
    botao.addEventListener("click", () => {
      adicionarProdutoNoCarrinho(produto.id);
      document.dispatchEvent(new Event("estadoAtualizado"));
    });

    container.appendChild(nome);
    container.appendChild(preco);
    // container.appendChild(estoque);
    container.appendChild(botao);
    container.appendChild(btnModal);

    listaDosProdutos.appendChild(container);
  });
}

// Renderiza o carrinho
export function renderizarCarrinho() {
  const listaDoCarrinho = document.querySelector("#lista-carrinho");
  listaDoCarrinho.innerHTML = "";

  carrinho.forEach((item) => {
    const produto = buscarProdutoPorId(item.id);
    if (!produto) return;

    const containerCarrinho = document.createElement("div");
    containerCarrinho.classList.add("containerCarrinho");

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    const quantidade = document.createElement("p");
    quantidade.textContent = `Quantidade: ${item.quantidade}`;

    const preco = document.createElement("p");
    preco.textContent = `Subtotal: ${(
      produto.preco * item.quantidade
    ).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;

    // Botão de remover/menos
    const botao = document.createElement("button");
    botao.textContent = item.quantidade === 1 ? "Remover Item" : "-";
    item.quantidade === 1
      ? (botao.style.backgroundColor = botao.classList.add("dangerColor"))
      : " - ";
    botao.classList.add("btnsCart2");
    botao.addEventListener("click", () => {
      removerDoCarrinho(item.id);
      document.dispatchEvent(new Event("estadoAtualizado"));
    });

    // Botão de adicionar/mais
    const botaoAdd = document.createElement("button");
    botaoAdd.textContent = "+";
    botaoAdd.classList.add("btnsCart2");
    if (produto.estoque <= 0) botaoAdd.disabled = true;
    botaoAdd.addEventListener("click", () => {
      adicionarProdutoNoCarrinho(item.id);
      document.dispatchEvent(new Event("estadoAtualizado"));
    });

    containerCarrinho.appendChild(nome);
    containerCarrinho.appendChild(quantidade);
    containerCarrinho.appendChild(preco);
    containerCarrinho.appendChild(botao);
    containerCarrinho.appendChild(botaoAdd);

    listaDoCarrinho.appendChild(containerCarrinho);
  });

  // Botão limpar carrinho dentro do carrinho
  if (carrinho.length > 0) {
    const botaoLimpar = document.createElement("button");
    botaoLimpar.classList.add("limpar-carrinho", "dangerColor", "btnsCart2");
    botaoLimpar.textContent = "Limpar carrinho";
    botaoLimpar.addEventListener("click", () => {
      limparCarrinho();
      document.dispatchEvent(new Event("estadoAtualizado"));
    });
    listaDoCarrinho.appendChild(botaoLimpar);
  }

  // Atualiza total
  const totalEl = document.querySelector("#total");
  if (totalEl) {
    totalEl.textContent = calcularTotal().toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}

// Renderizar Historico

export function renderizarHistorico() {
  const pedidos = getHistoricoCompras();

  pedidos.sort((a, b) => b.timestamp - a.timestamp);

  const container = document.getElementById("lista-pedidos");

  container.innerHTML = "";

  pedidos.forEach((pedido) => {
    const card = document.createElement("div");
    card.classList.add("pedido-card");

    const header = document.createElement("div");
    header.classList.add("pedido-header");

    const info = document.createElement("p");
    info.textContent = `Pedido - ${pedido.data}`;

    const itens = document.createElement("p");
    itens.textContent = `Produtos no Carrinho: ${pedido.quantidadeItens}`;

    const total = document.createElement("p");
    total.textContent = `Total: ${pedido.total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;

    header.appendChild(info);
    header.appendChild(itens);
    header.appendChild(total);

    const listaItens = document.createElement("div");
    listaItens.classList.add("pedido-itens");

    pedido.itens.forEach((item) => {
      const produto = buscarProdutoPorId(item.id);

      const linhaItem = document.createElement("p");
      linhaItem.textContent = `${produto.nome} x${item.quantidade}`;

      listaItens.appendChild(linhaItem);
    });

    card.appendChild(header);
    card.appendChild(listaItens);

    container.appendChild(card);
  });
}

export function atualizarContadorCarrinho() {

  const totalDeItens = carrinho.reduce((acc, item) => {
    return acc + item.quantidade
    
  },0)


 const span = document.getElementById("contador-carrinho")
 span.textContent = totalDeItens;
 
}