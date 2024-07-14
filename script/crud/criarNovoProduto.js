import { criarElemento } from "./criarElemento.js"
import { transformarPrimeiraLetraEmMaiuscula } from "../funcoes-adicionais/transformarPrimeiraLetraEmMaiuscula.js"
import { alterarPrecoProduto } from "./alterarPrecoProduto.js"
import { alterarProduto } from "./alterarProduto.js"
import { concluirItemDaLista } from "./concluirItemDaLista.js"
import { excluirItemDaCategoria } from "./excluirItemDaCategoria.js"
import { inserirPrecoNoProduto } from "./inserirPrecoNoProduto.js"

export function criarNovoProduto(objetoProduto) {
    const li = criarElemento('li', '', 'conteudo-lista-item-produto')
    li.dataset.id = objetoProduto.id

    const conteudoProduto = criarElemento('div', '', 'conteudo-produto')

    // console.log(objetoProduto.quantidade)
    const pQuantidade = criarElemento('p', `${objetoProduto.un == 'g' || objetoProduto.un == 'kg' ? objetoProduto.quantidade.toFixed(3): objetoProduto.quantidade}${objetoProduto.un}`, 'p-quantidade')
    const pProduto = criarElemento('p', transformarPrimeiraLetraEmMaiuscula(objetoProduto.nome, ' '), 'p-produto')

    const divInserirPreco = criarContainerInserirPreco(objetoProduto, li)
    const divPrecoInserido = criarContainerPrecoInserido(objetoProduto, li)

    const divBotoes = criarContainerBotoes(objetoProduto)

    conteudoProduto.appendChild(pQuantidade)
    conteudoProduto.appendChild(pProduto)
    conteudoProduto.appendChild(divInserirPreco)
    conteudoProduto.appendChild(divPrecoInserido)
    conteudoProduto.appendChild(divBotoes)

    li.appendChild(conteudoProduto)

    if(objetoProduto.itemPego){
        console.log(objetoProduto)
        li.classList.add('concluido')
        divInserirPreco.classList.add('concluido')
    }else{
        li.classList.remove('concluido')
    }

    if(objetoProduto.preco == null){
        objetoProduto.preco = 0
        console.log(objetoProduto.preco)
    }
    if(objetoProduto.preco != 0){
        divInserirPreco.setAttribute('style', 'display: none;')
        divPrecoInserido.setAttribute('style', 'display: flex;')
    }
    return li

    // // verificarSeOItemFoiPego(objetoProduto, li)
    // // verificarSeOPrecoDiferenteDeZero(objetoProduto, divPrecoInserido, divInserirPreco)
}

function criarContainerInserirPreco(objetoProduto, li) {
    const divInserirPreco = criarElemento('div', '', 'p-inserirPreco')
    const label = criarElemento('label', 'Inserir Preço')
    label.setAttribute('for', 'p-inserirPreco')
    const inputInserirPreco = criarElemento('input', '', '', 'p-inserirPreco', 'text')
    inputInserirPreco.setAttribute('autocomplete', 'off')
    inputInserirPreco.value = 'R$'
    const button = criarElemento('button', '<i class="fa-solid fa-check"></i>', '', '', 'button')
    button.addEventListener('click', (e) => { inserirPrecoNoProduto(e, objetoProduto, divInserirPreco, li) })

    divInserirPreco.appendChild(label)
    divInserirPreco.appendChild(inputInserirPreco)
    divInserirPreco.appendChild(button)
    return divInserirPreco
}

function criarContainerPrecoInserido(objetoProduto, li) {
    const divPrecoInserido = criarElemento('div', '', 'p-precoInserido')
    // tem que verificar se é grama ou kilograma pra adicionar 3 casas decimais
    const p1 = criarElemento('p', `${objetoProduto.quantidade}${objetoProduto.un} x R$${(objetoProduto.preco)}`)
    const p2 = criarElemento('p', `R$${(objetoProduto.quantidade * objetoProduto.preco).toFixed(2)}`)
    const btnPrecoInserido = criarElemento('button', 'Alterar preço')
    btnPrecoInserido.addEventListener('click', (e) => alterarPrecoProduto(e, objetoProduto, li))
    divPrecoInserido.appendChild(p1)
    divPrecoInserido.appendChild(p2)
    divPrecoInserido.appendChild(btnPrecoInserido)
    return divPrecoInserido
}

function criarContainerBotoes(objetoProduto) {
    const divBotoes = criarElemento('div', '', 'p-botoes')
    const btnConcluir = criarElemento('button', '<i class="fa-solid fa-check"></i>', 'p-botoes-concluir')
    btnConcluir.addEventListener('click', (e) => concluirItemDaLista(e))

    const btnExcluir = criarElemento('button', '<i class="fa-solid fa-xmark"></i>', 'p-botoes-excluir')
    btnExcluir.addEventListener('click', (e) => excluirItemDaCategoria(e))

    const btnAlterar = criarElemento('button', '<i class="fa-solid fa-pen-to-square"></i>', 'p-botoes-alterar')
    btnAlterar.addEventListener('click', (e) => alterarProduto(e, objetoProduto))

    divBotoes.appendChild(btnConcluir)
    divBotoes.appendChild(btnExcluir)
    divBotoes.appendChild(btnAlterar)
    return divBotoes
}