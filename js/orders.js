export function getHistoricoCompras() {
    return JSON.parse(localStorage.getItem("historicoCompras")) || [];
    
}

export function salvarPedido(pedido) {
    const historico = getHistoricoCompras();

    historico.push(pedido);

    localStorage.setItem("historicoCompras", JSON.stringify(historico));
}