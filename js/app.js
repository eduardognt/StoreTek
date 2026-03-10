import { carregarCarrinho } from "./storage.js";
import { recalcularEstoque, limparCarrinho } from "./cart.js";
import { atualizarUI, renderizarProdutos } from "./ui.js";
import { buscarProdutos, filtrarPorCategoria } from "./filters.js";
import { produtos } from "./data.js";

const filtros = {
  busca: "",
  categoria: "todas"
};

function aplicarFiltros() {
  let lista = produtos;

  lista = buscarProdutos(lista, filtros.busca);
  lista = filtrarPorCategoria(lista, filtros.categoria);

  return lista;
}

document.addEventListener("DOMContentLoaded", () => {
  carregarCarrinho();
  recalcularEstoque();

  const searchInput = document.querySelector("#search-input");
  const select = document.querySelector("#filtro-categoria");

  renderizarProdutos(aplicarFiltros());

  searchInput.addEventListener("input", () => {
    filtros.busca = searchInput.value;
    renderizarProdutos(aplicarFiltros());
  });

  select.addEventListener("change", () => {
    filtros.categoria = select.value;
    renderizarProdutos(aplicarFiltros());
  });

  document.getElementById("limpar-carrinho").addEventListener("click", () => {
    limparCarrinho();
    atualizarUI();
  });
});