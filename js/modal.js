import { adicionarProdutoNoCarrinho } from "./cart.js";

const modal = document.getElementById("modal-produto");
const nome = document.getElementById("modal-nome");
const preco = document.getElementById("modal-preco");
const estoque = document.getElementById("modal-estoque");
const categoria = document.getElementById("modal-categoria");

const btnFechar = document.getElementById("fechar-modal");
const btnAddCartModal = document.getElementById("modal-add-carrinho");

let produtoAtual = null;

export function abrirModal(produto) {
  produtoAtual = produto;

  nome.textContent = produto.nome;
  preco.textContent = `Preço: R$ ${produto.preco}`;
  estoque.textContent = `Estoque: ${produto.estoque}`;
  categoria.textContent = `Categoria: ${produto.categoria}`;

  // reset do botão
  btnAddCartModal.disabled = false;
  btnAddCartModal.textContent = "Adicionar ao carrinho";

  if (produto.estoque <= 0) {
    btnAddCartModal.disabled = true;
    btnAddCartModal.textContent = "Produto indisponível";
  }

  modal.classList.remove("hidden");
}

export function fecharModal() {
  modal.classList.add("hidden");
}

btnAddCartModal.addEventListener("click", () => {
  if (!produtoAtual) return;

  adicionarProdutoNoCarrinho(produtoAtual.id);

  document.dispatchEvent(new Event("estadoAtualizado"));

  fecharModal();
});

btnFechar.addEventListener("click", fecharModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    fecharModal();
  }
});