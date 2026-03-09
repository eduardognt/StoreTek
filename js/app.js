import { carregarCarrinho } from "./storage.js";
import { recalcularEstoque, limparCarrinho } from "./cart.js";
import { atualizarUI, renderizarProdutos } from "./ui.js";
import { buscarProdutos } from "./filters.js";
import { produtos } from "./data.js";


document.addEventListener("DOMContentLoaded", () => {
  carregarCarrinho();
  recalcularEstoque();
  atualizarUI();

  const searchInput = document.querySelector("#search-input");

  searchInput.addEventListener("input", () => {
    const texto = searchInput.value;

    if (texto.trim() === "") {
      renderizarProdutos(produtos);
      return;
    }

    const resultado = buscarProdutos(texto);
    renderizarProdutos(resultado);
  });
});

document.getElementById("limpar-carrinho").addEventListener("click", () => {
  limparCarrinho();
  atualizarUI();
});
