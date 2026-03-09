import { carrinho, setCarrinho } from "./state.js";

export function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

export function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem("carrinho");

  if (carrinhoSalvo) {
    setCarrinho(JSON.parse(carrinhoSalvo));
  }
}