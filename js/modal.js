import { adicionarProdutoNoCarrinho } from "./cart.js";

const modal = document.getElementById("modal-produto");
const nome = document.getElementById("modal-nome");
const preco = document.getElementById("modal-preco");
const estoque = document.getElementById("modal-estoque");
const categoria = document.getElementById("modal-categoria");

const btnFechar = document.getElementById("fechar-modal");

export function abrirModal(produto) {
  nome.textContent = produto.nome;
  preco.textContent = `Preço: R$ ${produto.preco}`;
  estoque.textContent = `Estoque: ${produto.estoque}`;
  categoria.textContent = `Categoria: ${produto.categoria}`;

  modal.classList.remove("hidden");
}

export function fecharModal() {
  modal.classList.add("hidden");
}

btnFechar.addEventListener("click", fecharModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    fecharModal();
  }
});
