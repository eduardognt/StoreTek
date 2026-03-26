import { carregarCarrinho } from "./storage.js";
import { recalcularEstoque, limparCarrinho, finalizarCompra } from "./cart.js";
import { renderizarProdutos, renderizarCarrinho, atualizarContadorCarrinho, renderizarHistorico } from "./ui.js";
import { buscarProdutos, filtrarPorCategoria } from "./filters.js";
import { produtos } from "./data.js";

// Estado dos filtros
const filtros = {
  busca: "",
  categoria: "todas",
};

// Aplica os filtros de busca e categoria sobre a lista de produtos
function aplicarFiltros() {
  let lista = produtos;
  lista = buscarProdutos(lista, filtros.busca);
  lista = filtrarPorCategoria(lista, filtros.categoria);
  return lista;
}

// Função que atualiza toda a UI (produtos filtrados + carrinho)
export function atualizarUI() {
  const listaFiltrada = aplicarFiltros();
  renderizarProdutos(listaFiltrada);
  renderizarCarrinho();
  renderizarHistorico();
  atualizarContadorCarrinho();
}

// Inicialização do app
document.addEventListener("DOMContentLoaded", () => {
  carregarCarrinho();
  recalcularEstoque();
  atualizarUI();

  const searchInput = document.querySelector("#search-input");
  const select = document.querySelector("#filtro-categoria");
  const btnLimparCarrinho = document.getElementById("limpar-carrinho");

  // Busca em tempo real
  searchInput.addEventListener("input", () => {
    filtros.busca = searchInput.value;
    atualizarUI();
  });

  // Filtro por categoria
  select.addEventListener("change", () => {
    filtros.categoria = select.value;
    atualizarUI();
  });

  // Limpar carrinho
  if (btnLimparCarrinho) {
    btnLimparCarrinho.addEventListener("click", () => {
      limparCarrinho();
      atualizarUI();
    });
  }
});

// Evento customizado disparado pelo UI.js quando carrinho muda
document.addEventListener("estadoAtualizado", () => {
  atualizarUI();
});

const btnFinalizar = document.getElementById("btnFinalizar");

btnFinalizar.addEventListener("click", finalizarCompra);
