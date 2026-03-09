import { carregarCarrinho } from "./storage.js";
import { recalcularEstoque } from "./cart.js";
import { atualizarUI } from "./ui.js";
import { limparCarrinho } from "./cart.js";

document.addEventListener("DOMContentLoaded", () => {
  carregarCarrinho();
  recalcularEstoque();
  atualizarUI();
});

document.getElementById("limpar-carrinho").addEventListener("click", () => {
  limparCarrinho();
  atualizarUI();
});
