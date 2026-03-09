import { produtos } from "./data.js";

export function buscarProdutos(texto) {

    const termo = texto.toLowerCase().trim();

    return produtos.filter(produto => 
        produto.nome?.toLowerCase().includes(termo)
    );

    
}