export function buscarProdutos(lista, texto) {
  const termo = texto.toLowerCase().trim();
  return lista.filter((produto) => produto.nome.toLowerCase().includes(termo));
}

export function filtrarPorCategoria(lista, categoria) {
  if (categoria === "todas") return lista;
  return lista.filter((produto) => produto.categoria === categoria);
}