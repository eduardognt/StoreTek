import { carrinho } from "./state.js";
import {
  adicionarProdutoNoCarrinho,
  removerDoCarrinho,
  calcularTotal,
} from "./cart.js";
import { buscarProdutoPorId } from "./products.js";
import { limparCarrinho } from "./cart.js";

export function renderizarProdutos(lista) {
  const listaDosProdutos = document.querySelector("#lista-produtos");
  listaDosProdutos.innerHTML = "";

  if (lista.length === 0) {
    listaDosProdutos.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }

  lista.forEach((produto) => {
    const container = document.createElement("div");

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    const preco = document.createElement("p");
    preco.textContent = `R$ ${produto.preco}`;

    const botao = document.createElement("button");

    if (produto.estoque > 0) {
      botao.textContent = "Adicionar ao carrinho";
    } else {
      botao.disabled = true;
      botao.textContent = "Produto indisponivel";
    }

    const estoque = document.createElement("p");
    estoque.textContent = `Estoque: ${produto.estoque}`;

    botao.addEventListener("click", () => {
      adicionarProdutoNoCarrinho(produto.id);
    });

    container.appendChild(nome);
    container.appendChild(preco);
    container.appendChild(estoque);
    container.appendChild(botao);

    listaDosProdutos.appendChild(container);
  });
}

export function renderizarCarrinho() {
  const listaDoCarrinho = document.querySelector("#lista-carrinho");
  listaDoCarrinho.innerHTML = "";

  carrinho.forEach((item) => {
    const produto = buscarProdutoPorId(item.id);

    const containerCarrinho = document.createElement("div");

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

    const botao = document.createElement("button");
    botao.textContent = "-";

    if (item.quantidade === 1) {
      botao.textContent = "Remover Item";
    }

    botao.addEventListener("click", () => {
      removerDoCarrinho(item.id);
    });

    const botaoAdd = document.createElement("button");
    botaoAdd.textContent = "+";

    if (produto.estoque <= 0) {
      botaoAdd.disabled = true;
    }

    botaoAdd.addEventListener("click", () => {
      adicionarProdutoNoCarrinho(item.id);
    });

    containerCarrinho.appendChild(nome);
    containerCarrinho.appendChild(quantidade);
    containerCarrinho.appendChild(preco);
    containerCarrinho.appendChild(botao);
    containerCarrinho.appendChild(botaoAdd);

    listaDoCarrinho.appendChild(containerCarrinho);
  });

  if (carrinho.length > 0) {
    const botaoLimpar = document.createElement("button");
    botaoLimpar.classList.add("limpar-carrinho");
    botaoLimpar.textContent = "Limpar carrinho";

    botaoLimpar.addEventListener("click", () => {
      limparCarrinho();
    });

    listaDoCarrinho.appendChild(botaoLimpar);
  }

  document.querySelector("#total").textContent = calcularTotal().toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    }
  );
}

export function atualizarUI(lista) {
  renderizarProdutos(lista);
  renderizarCarrinho();
}