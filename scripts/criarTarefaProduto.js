import { arrayDeCompras } from "./arrayDeCompras.js"
import { criarElemento } from "./criarElemento.js"
import { concluirProduto, excluirItemDaLista, excluirLista } from "./crud.js"
import { escreverInformacoesNoLocalStorage } from "./escreverNoLocalStorage.js"
import {verificarPrecoFinalDaCategoriaGeral, verificarPrecoFinalGeralCompra } from "./verificarPrecoFinalCategoria.js"

const listaDeCategorias = document.querySelector('.conteudo-lista')

export function criarTarefaProduto(objetoProduto) {

    const categoria = document.querySelector(`[data-categoria="${objetoProduto.categoria}"]`)

    if (categoria) {
        const categoriaAtual = categoria
        const listaDaCategoriaAtual = categoriaAtual.querySelector('ul')
        const tarefa = criarTarefa(objetoProduto)
        listaDaCategoriaAtual.appendChild(tarefa)
    } else {
        const categoriaAtual = criarNovaCategoria(objetoProduto)
        const listaDaCategoriaAtual = categoriaAtual.querySelector('ul')
        const tarefa = criarTarefa(objetoProduto)
        listaDaCategoriaAtual.appendChild(tarefa)
        listaDeCategorias.appendChild(categoriaAtual)
    }
}

function criarTarefa(objetoProduto) {
    const li = criarElemento('li', '', 'conteudo-lista-item-produto')
    li.dataset.id = objetoProduto.id
    const conteudoProduto = criarElemento('div', '', 'conteudo-produto')
    const pQuantidade = criarElemento('p', objetoProduto.quantidade, 'p-quantidade')
    const pProduto = criarElemento('p', capitalizeFirstLetter(objetoProduto.nome.split(' ')).join(' '), 'p-produto')

    const divInserirPreco = criarElemento('div', '', 'p-inserirPreco')
    const label = criarElemento('label', 'Inserir Preço')
    label.setAttribute('for', 'p-inserirPreco')
    const inputInserirPreco = criarElemento('input', '', '', 'p-inserirPreco', 'text')
    inputInserirPreco.setAttribute('autocomplete', 'off')
    inputInserirPreco.value = 'R$'
    const button = criarElemento('button', '<i class="fa-solid fa-check"></i>', '', '', 'button')
    button.addEventListener('click', (e) => {inserirPrecoNoProduto(e, objetoProduto, divInserirPreco, divPrecoInserido)})

    divInserirPreco.appendChild(label)
    divInserirPreco.appendChild(inputInserirPreco)
    divInserirPreco.appendChild(button)

    const divPrecoInserido = criarElemento('div', '', 'p-precoInserido')
    const p1 = criarElemento('p', `${objetoProduto.quantidade} x R$${objetoProduto.preco.toFixed(2)}`)
    const p2 = criarElemento('p', `R$${(objetoProduto.quantidade * objetoProduto.preco).toFixed(2)}`)
    const btnPrecoInserido = criarElemento('button', 'Alterar preço')
    btnPrecoInserido.addEventListener('click', (e) => alterarPrecoInserido(e, objetoProduto, divInserirPreco, divPrecoInserido, inputInserirPreco))
    divPrecoInserido.appendChild(p1)
    divPrecoInserido.appendChild(p2)
    divPrecoInserido.appendChild(btnPrecoInserido)

    const divBotoes = criarElemento('div', '', 'p-botoes')
    const btnConcluir = criarElemento('button', '<i class="fa-solid fa-check"></i>', 'p-botoes-concluir')
    btnConcluir.addEventListener('click', (e) => concluirProduto(e))

    const btnExcluir = criarElemento('button', '<i class="fa-solid fa-xmark"></i>', 'p-botoes-excluir')
    btnExcluir.addEventListener('click', (e) => excluirItemDaLista(e))

    const btnAlterar = criarElemento('button', '<i class="fa-solid fa-pen-to-square"></i>', 'p-botoes-alterar')
    divBotoes.appendChild(btnConcluir)
    divBotoes.appendChild(btnExcluir)
    divBotoes.appendChild(btnAlterar)

    conteudoProduto.appendChild(pQuantidade)
    conteudoProduto.appendChild(pProduto)
    conteudoProduto.appendChild(divInserirPreco)
    conteudoProduto.appendChild(divPrecoInserido)
    conteudoProduto.appendChild(divBotoes)

    const formulario = criarElemento('form', '', 'conteudo-alterar-produto')

    const fieldsetNovoProduto = criarElemento('fieldset', '', 'novo-nome-produto')
    const labelNovoProduto = criarElemento('label', 'Novo nome do produto:')
    labelNovoProduto.setAttribute('for', 'novoNomeProduto')
    const inputNovoProduto = criarElemento('input', '', '', 'novoNomeProduto', 'text')
    inputNovoProduto.setAttribute('autocomplete', 'off')
    fieldsetNovoProduto.appendChild(labelNovoProduto)
    fieldsetNovoProduto.appendChild(inputNovoProduto)

    const fieldsetQuantidadeProduto = criarElemento('fieldset', '', 'novo-quantidade-produto')
    const labelNovaQuantidade = criarElemento('label', 'QTDE')
    labelNovaQuantidade.setAttribute('for', 'novaQuantidadeProduto')
    const inputNovaQuantidade = criarElemento('input', '', '', 'novaQuantidadeProduto', 'text')
    inputNovaQuantidade.setAttribute('autocomplete', 'off')
    fieldsetQuantidadeProduto.appendChild(labelNovaQuantidade)
    fieldsetQuantidadeProduto.appendChild(inputNovaQuantidade)

    const novoCategoriaProduto = criarElemento('fieldset', '', 'novo-categoria-produto')
    const labelNovaCategoria = criarElemento('label', 'QTDE')
    labelNovaCategoria.setAttribute('for', 'novaQuantidadeProduto')

    const selectCategoria = criarElemento('select', '<option>Selecione</option><option value="produtos-gerais">Produtos Gerais</option><option value="carnes">Carnes</option><option value="bebidas">Bebidas</option><option value="produtos-de-limpeza">Produtos de Limpeza</option><option value="higiene-pessoal">Higiene Pessoal</option><option value="padaria">Padaria</option><option value="petshop">PetShop</option><option value="utensilios-domesticos">Utensílios Domésticos</option>', '', 'novaCategoria')
    novoCategoriaProduto.appendChild(labelNovaCategoria)
    novoCategoriaProduto.appendChild(selectCategoria)

    const btnSalvarAlterarcao = criarElemento('button', 'Salvar Alteração', 'salvar-alteracao-produto')
    formulario.appendChild(fieldsetNovoProduto)
    formulario.appendChild(fieldsetQuantidadeProduto)
    formulario.appendChild(novoCategoriaProduto)
    formulario.appendChild(btnSalvarAlterarcao)

    li.appendChild(conteudoProduto)
    li.appendChild(formulario)

    verificarSeOItemFoiPego(objetoProduto, li)
    verificarSeOPrecoDiferenteDeZero(objetoProduto, divPrecoInserido, divInserirPreco)
    return li
}

function criarNovaCategoria(objetoProduto) {
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

function capitalizeFirstLetter(arrayString) {
    const array = []
    arrayString.forEach(palavra => {
        array.push(palavra.charAt(0).toUpperCase() + palavra.slice(1))
    });
    return array
}

function verificarSeOItemFoiPego(objetoProduto, li) {
    if (objetoProduto.itemPego) {
        li.classList.add('concluido')
        li.querySelector('.p-precoInserido').style.backgroundColor = '#1ebe5e'
        li.querySelector('.p-inserirPreco').style.backgroundColor = '#1ebe5e'
    } else {
        li.classList.remove('concluido')
        li.querySelector('.p-precoInserido').style.backgroundColor = '#17025f'
        li.querySelector('.p-inserirPreco').style.backgroundColor = '#17025f'
    }
}

function verificarSeOPrecoDiferenteDeZero(objetoProduto, divPrecoInserido, divInserirPreco){
    // tem preço
    if(objetoProduto.preco != 0){
        divPrecoInserido.style.display = 'flex'
        divInserirPreco.style.display = 'none'
    }else{
        // não tem preço
        divInserirPreco.style.display = 'flex'
        divPrecoInserido.style.display = 'none'
    }
}

function inserirPrecoNoProduto(e, objetoProduto, divInserirPreco, divPrecoInserido){
    const input = e.target.closest('.p-inserirPreco').querySelector('input') 
    const precoFormatado = parseFloat(input.value.split('R$')[1].replace(',', '.'))
    
    objetoProduto.preco = precoFormatado
    objetoProduto.precoFinal = objetoProduto.quantidade * precoFormatado

    divInserirPreco.style.display = 'none'
    divPrecoInserido.style.display = 'flex'
    const ps = divPrecoInserido.querySelectorAll('p')
    ps[0].innerHTML = `${objetoProduto.quantidade} x R$${objetoProduto.preco.toFixed(2)}`
    ps[1].innerHTML = `R$${(objetoProduto.quantidade * objetoProduto.preco).toFixed(2)}`

    verificarPrecoFinalDaCategoriaGeral()
    verificarPrecoFinalGeralCompra()
    escreverInformacoesNoLocalStorage()
}

function alterarPrecoInserido(e, objetoProduto, divInserirPreco, divPrecoInserido, inputInserirPreco){
    console.log(e)
    objetoProduto.preco = 0
    objetoProduto.precoFinal = 0
    divInserirPreco.style.display = 'flex'
    divPrecoInserido.style.display = 'none'
    inputInserirPreco.value = 'R$'
    inputInserirPreco.focus()
    verificarPrecoFinalDaCategoriaGeral()
    verificarPrecoFinalGeralCompra()
    escreverInformacoesNoLocalStorage()
}