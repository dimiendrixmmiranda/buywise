import { criarElemento } from "./criarElemento.js"

export function criarTarefaProduto(objetoProduto) {

    const categoria = document.querySelector(`[data-categoria="${objetoProduto.categoria}"]`)

    if (categoria) {
        const categoriaAtual = categoria
        const listaDaCategoriaAtual = categoriaAtual.querySelector('ul')
        const tarefa = criarTarefa(objetoProduto)
        console.log(listaDaCategoriaAtual)
        console.log(tarefa)
    } else {
        console.log('tem que criar a categoria')
    }

    // const quantidadeProduto = criarElemento('p', objetoProduto.quantidade, 'p-quantidade')
    // const nomeProduto = criarElemento('p', objetoProduto.nome, 'p-produto')
    // console.log(quantidadeProduto)
}

function criarTarefa(objetoProduto) {
    const li = criarElemento('li', '', 'conteudo-lista-item-produto')
    const conteudoProduto = criarElemento('div', '', 'conteudo-produto')
    const pQuantidade = criarElemento('p', objetoProduto.quantidade, 'p-quantidade')
    const pProduto = criarElemento('p', objetoProduto.produto, 'p-produto')

    const divInserirPreco = criarElemento('div', '', 'p-inserirPreco')
    const label = criarElemento('label', 'Inserir Preço')
    label.setAttribute('for', 'p-inserirPreco')
    const input = criarElemento('input', '', '', 'p-inserirPreco', 'text')
    input.setAttribute('autocomplete', 'off')
    const button = criarElemento('button', '<i class="fa-solid fa-check"></i>', '', '', 'button')
    divInserirPreco.appendChild(label)
    divInserirPreco.appendChild(input)
    divInserirPreco.appendChild(button)

    const divBotoes = criarElemento('div', '', 'p-botoes')
    const btnConcluir = criarElemento('button', '<i class="fa-solid fa-check"></i>', 'p-botoes-concluir')
    const btnExcluir = criarElemento('button', '<i class="fa-solid fa-xmark"></i>', 'p-botoes-excluir')
    const btnAlterar = criarElemento('button', '<i class="fa-solid fa-pen-to-square"></i>', 'p-botoes-alterar')
    divBotoes.appendChild(btnConcluir)
    divBotoes.appendChild(btnExcluir)
    divBotoes.appendChild(btnAlterar)

    conteudoProduto.appendChild(pQuantidade)
    conteudoProduto.appendChild(pProduto)
    conteudoProduto.appendChild(divInserirPreco)
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
    // tem que arrumar os values
    const selectCategoria = criarElemento('select', '<option>Selecione</option><option value="produtos-gerais">Produtos Gerais</option><option value="produtos-gerais">Carnes</option><option value="produtos-gerais">Bebidas</option><option value="produtos-gerais">Produtos de Limpeza</option><option value="produtos-gerais">Higiene Pessoal</option><option value="produtos-gerais">Padaria</option><option value="produtos-gerais">PetShop</option><option value="produtos-gerais">Utensílios Domésticos</option>', '', 'novaCategoria')
    novoCategoriaProduto.appendChild(labelNovaCategoria)
    novoCategoriaProduto.appendChild(selectCategoria)

    const btnSalvarAlterarcao = criarElemento('button', 'Salvar Alteração', 'salvar-alteracao-produto')
    formulario.appendChild(fieldsetNovoProduto)
    formulario.appendChild(fieldsetQuantidadeProduto)
    formulario.appendChild(novoCategoriaProduto)
    formulario.appendChild(btnSalvarAlterarcao)

        
    li.appendChild(conteudoProduto)
    li.appendChild(formulario)
    return li
}