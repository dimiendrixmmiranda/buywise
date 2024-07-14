import { capitalizeFirstLetter } from "../capitalizeFirstLetter.js"
import { criarElemento } from "../criarElemento.js"
import { excluirLista } from "../crud/excluirLista.js"

export function criarNovaCategoria(objetoProduto) {
    const li = criarElemento('li', '', 'conteudo-lista-item')
    li.dataset.categoria = objetoProduto.categoria

    const titulo = criarElemento('h3', capitalizeFirstLetter(objetoProduto.categoria.split('-')).join(' '))
    const listaDeTarefas = criarElemento('ul')

    const divConteudoPrecoFinal = criarElemento('div', '', 'conteudo-lista-item-precoFinal')
    const p1 = criarElemento('p', 'Preço final da categoria:')
    const p2 = criarElemento('p', 'R$0,00', '', 'precoFinal')
    divConteudoPrecoFinal.appendChild(p1)
    divConteudoPrecoFinal.appendChild(p2)

    const btnExcluirLista = criarElemento('button', '<i class="fa-solid fa-x"></i>', 'conteudo-lista-item-excluirLista')
    btnExcluirLista.addEventListener('click', (e) => excluirLista(e))

    li.appendChild(titulo)
    li.appendChild(listaDeTarefas)
    li.appendChild(divConteudoPrecoFinal)
    li.appendChild(btnExcluirLista)
    return li
}