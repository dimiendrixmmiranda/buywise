import { criarNovaCategoria } from "./criarNovaCategoria.js"
import { criarNovoProduto } from "./criarNovoProduto.js"

const listaDeCategorias = document.querySelector('#listaDeCategorias')

export function gerarProdutosDaLista(objetoProduto) {
    const categoria = document.querySelector(`[data-categoria="${objetoProduto.categoria}"]`)
    if (categoria) {
        const categoriaAtual = categoria
        const listaDaCategoriaAtual = categoriaAtual.querySelector('ul')
        const tarefa = criarNovoProduto(objetoProduto)
        listaDaCategoriaAtual.appendChild(tarefa)
    } else {
        const categoriaAtual = criarNovaCategoria(objetoProduto)
        const listaDaCategoriaAtual = categoriaAtual.querySelector('ul')
        const tarefa = criarNovoProduto(objetoProduto)
        listaDaCategoriaAtual.appendChild(tarefa)
        listaDeCategorias.appendChild(categoriaAtual)
    }
}