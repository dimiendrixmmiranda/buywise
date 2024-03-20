import { gerarID } from "./gerarID.js";
const formulario = document.querySelector('#form')
const lista = document.querySelector('.lista')
const arrayProdutos = JSON.parse(localStorage.getItem("produtos")) || []

arrayProdutos.forEach(produto => {
    adicionandoCriandoNovaCategoria(produto)
});

verificarPrecoFinalGeral()
verificarPrecoCategoria()

formulario.addEventListener('submit', (e) => {
    e.preventDefault()

    const inputNomeProduto = e.target.closest('.container__formulario__form').querySelector('#nomeProduto')
    const objetoProduto = {
        nome: e.target.closest('.container__formulario__form').querySelector('#nomeProduto').value,
        tipoUnidade: e.target.closest('.container__formulario__form').querySelector('#unidadeProduto').value,
        categoria: e.target.closest('.container__formulario__form').querySelector('#categoriaProduto').value,
        quantidade: e.target.closest('.container__formulario__form').querySelector('#quantidadeProduto').value,
        preco: 0,
        itemPego: false,
        id: gerarID(),
        precoFinal: 0
    }
    if (objetoProduto.categoria != '') {
        adicionandoCriandoNovaCategoria(objetoProduto)
        arrayProdutos.push(objetoProduto)
        localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
        limparFormulario(e)
        inputNomeProduto.focus()
    }
    verificarPrecoFinalGeral()
})

function criarElemento(tag, classe, id = '', conteudo = '') {
    const elemento = document.createElement(tag)
    elemento.classList.add(classe)

    if (id != '') {
        elemento.id = id
    }

    if (conteudo != '') {
        elemento.innerHTML = conteudo
    }
    return elemento
}

function criarFormularioInserirPreco() {
    const formInserirPreco = criarElemento('form', 'lista__categoria__item__preco')
    const pPrecoTexto = criarElemento('p', 'lista__categoria__item__preco__titulo', '', 'Inserir Preço:')
    const inputPreco = criarElemento('input', 'lista__categoria__item__preco__input', 'inputPreco')
    inputPreco.setAttribute('minlength', '1')
    inputPreco.setAttribute('required', '')
    const btnInserirPreco = criarElemento('button', 'lista__categoria__item__preco__btnInserir', '', '<i class="fa-regular fa-circle-check"></i>')
    btnInserirPreco.type = 'submit'
    formInserirPreco.appendChild(pPrecoTexto)
    formInserirPreco.appendChild(inputPreco)
    formInserirPreco.appendChild(btnInserirPreco)
    return formInserirPreco
}

function criarProdutoDaLista(objetoProduto) {
    const li = criarElemento('li', 'lista__categoria__lista__item')
    li.dataset.id = objetoProduto.id

    const divContainer = criarElemento('div', 'lista__categoria__lista__item__container')
    const pQuantidade = criarElemento('p', 'lista__categoria__item__quantidade', '', objetoProduto.quantidade)
    const pProduto = criarElemento('p', 'lista__categoria__item__produto', '', objetoProduto.nome)
    const formInserirPreco = criarFormularioInserirPreco()
    formInserirPreco.addEventListener('submit', (e) => inserirPrecoNoProduto(e))

    if (objetoProduto.preco) {
        formInserirPreco.style.display = 'none'
        const preco = criarPrecoDoProduto((objetoProduto))
        divContainer.appendChild(preco)
    }

    const divBtns = criarElemento('div', 'lista__categoria__item__btns')
    const btnExcluir = criarElemento('button', 'btn__excluir')
    btnExcluir.addEventListener('click', (e) => excluirTarefa(e))

    const btnAlterar = criarElemento('button', 'btn__alterar')
    btnAlterar.addEventListener('click', (e) => { alterarTarefa(e, objetoProduto) })
    const btnConcluir = criarElemento('button', 'btn__concluir')
    btnConcluir.addEventListener('click', (e) => concluirTarefa(e))

    vereficarSeOItemFoiPego(objetoProduto, divContainer)

    divBtns.appendChild(btnExcluir)
    divBtns.appendChild(btnAlterar)
    divBtns.appendChild(btnConcluir)
    divContainer.appendChild(pQuantidade)
    divContainer.appendChild(pProduto)
    divContainer.appendChild(formInserirPreco)
    divContainer.appendChild(divBtns)

    li.appendChild(divContainer)
    return li
}

function criarNovaCategoria(objetoProduto) {
    const li = criarElemento('li', 'lista__categoria')
    li.dataset.categoria = objetoProduto.categoria
    const tituloCategoria = criarElemento('h2', 'lista__categoria__titulo', '', objetoProduto.categoria)
    const ul = criarElemento('ul', 'lista__categoria__lista')
    const btnExcluirLista = criarElemento('button', 'lista__categoria__btnExcluirLista')
    btnExcluirLista.addEventListener('click', (e) => excluirCategoria(e))
    const totalDaCategoria = criarElemento('div', 'lista__categoria__preco__final')
    const pTexto = criarElemento('p', 'lista__categoria__preco__final__titulo', '', 'Preço final da Categoria:')
    const strongValor = criarElemento('strong', 'lista__categoria__preco__final__valor', '', 'R$0.00')
    totalDaCategoria.appendChild(pTexto)
    totalDaCategoria.appendChild(strongValor)
    li.appendChild(btnExcluirLista)
    li.appendChild(tituloCategoria)
    li.appendChild(ul)
    li.appendChild(totalDaCategoria)
    return li
}

function adicionandoCriandoNovaCategoria(objetoProduto) {
    const categoria = document.querySelector(`[data-categoria="${objetoProduto.categoria}"]`)
    if (categoria) {
        const listaDaCategoria = categoria.querySelector('.lista__categoria__lista')
        const produtoDaLista = criarProdutoDaLista(objetoProduto)
        listaDaCategoria.appendChild(produtoDaLista)
        localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
    } else {
        const novaCategoria = criarNovaCategoria(objetoProduto)
        const produtoDaLista = criarProdutoDaLista(objetoProduto)
        novaCategoria.querySelector('.lista__categoria__lista').appendChild(produtoDaLista)
        lista.appendChild(novaCategoria)
        localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
    }
}

function limparFormulario(e) {
    e.target.closest('.container__formulario__form').querySelector('#nomeProduto').value = ''
    e.target.closest('.container__formulario__form').querySelector('#unidadeProduto').value = 'un'
    e.target.closest('.container__formulario__form').querySelector('#categoriaProduto').value = ''
    e.target.closest('.container__formulario__form').querySelector('#quantidadeProduto').value = ''
}

function excluirTarefa(e) {
    const lista = e.target.closest('.lista__categoria').querySelectorAll('li')
    if (!(lista.length >= 2)) {
        const categoria = e.target.closest('.lista__categoria')
        categoria.remove()
    }
    const tarefa = e.target.closest('.lista__categoria__lista__item')
    const id = tarefa.dataset.id
    tarefa.remove()
    arrayProdutos.splice(acharProdutoNoArray(id), 1)
    verificarPrecoFinalGeral()
    verificarPrecoCategoria()
    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
}

function concluirTarefa(e) {
    const elemento = e.target.closest('.lista__categoria__lista__item')
    const elementoContainer = elemento.querySelector('.lista__categoria__lista__item__container')
    const id = elemento.dataset.id
    elementoContainer.classList.toggle('lista__categoria__lista__item__coletado')
    const precoDefinido = elemento.querySelector('.lista__categoria__item__preco__definido')
    if (precoDefinido) {
        precoDefinido.classList.toggle('lista__categoria__item__preco__definido__coletado')
    }
    arrayProdutos[acharProdutoNoArray(id)].itemPego = arrayProdutos[acharProdutoNoArray(id)].itemPego ? false : true
    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
}

function vereficarSeOItemFoiPego(objetoProduto, div) {
    if (objetoProduto.itemPego) {
        div.classList.add('lista__categoria__lista__item__coletado')
        div.querySelector('.lista__categoria__item__preco__definido').classList.add('lista__categoria__item__preco__definido__coletado')
    } else {
        div.classList.remove('lista__categoria__lista__item__coletado')
    }
}

function acharProdutoNoArray(id) {
    return arrayProdutos.findIndex(tarefa => tarefa.id == id)
}

function excluirCategoria(e) {
    const containerLista = e.target.closest('.lista__categoria')
    const listaProdutosCategoria = containerLista.querySelectorAll('.lista__categoria__lista li')

    listaProdutosCategoria.forEach(produto => {
        arrayProdutos.splice(acharProdutoNoArray(produto.dataset.id), 1)
        localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
        containerLista.remove()
    })
    verificarPrecoFinalGeral()
    verificarPrecoCategoria()
}

function inserirPrecoNoProduto(e) {
    e.preventDefault()
    const liProduto = e.target.closest('.lista__categoria__lista__item')
    const containerProduto = liProduto.querySelector('.lista__categoria__lista__item__container')
    const IDProduto = liProduto.dataset.id

    const inputForm = e.target.querySelector('#inputPreco')
    const preco = parseFloat(inputForm.value.replace(',', '.'))
    const quantidade = parseFloat((arrayProdutos[acharProdutoNoArray(IDProduto)].quantidade).replace(',', '.'))
    const precoFinal = preco * quantidade
    arrayProdutos[acharProdutoNoArray(IDProduto)].preco = preco
    arrayProdutos[acharProdutoNoArray(IDProduto)].precoFinal = precoFinal
    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))

    // parte visual
    const formulario = liProduto.querySelector('.lista__categoria__item__preco')
    formulario.style.display = 'none'
    const containerPrecoProdutoDefinido = criarPrecoDoProduto(arrayProdutos[acharProdutoNoArray(IDProduto)])
    containerProduto.appendChild(containerPrecoProdutoDefinido)
    verificarPrecoFinalGeral()
    verificarPrecoCategoria()
}

function criarPrecoDoProduto(objetoProduto) {
    const div = criarElemento('div', 'lista__categoria__item__preco__definido')
    console.log(objetoProduto.preco)
    const precoFinal = parseFloat(objetoProduto.quantidade.replace(',', '.')).toFixed(2) * parseFloat(objetoProduto.preco).toFixed(2)
    objetoProduto.precoFinal = precoFinal
    const p = criarElemento('p', 'lista__categoria__item__preco__definido__texto', '', `R$${parseFloat(precoFinal).toFixed(2)}`)
    const span = criarElemento('span', 'lista__categoria__item__preco__definido__valor', '', `${objetoProduto.quantidade} x R$${parseFloat(objetoProduto.preco).toFixed(2)}`)

    const divBtns = criarElemento('div', 'div__btns__preco__definido')
    const btnAlterarPreco = criarElemento('button', 'div__btns__preco__definido__alterar', 'alterarPrecoProduto', '<i class="fa-solid fa-square-pen"></i>')
    btnAlterarPreco.addEventListener('click', (e) => alterarPreco(e))
    const btnExcluirPreco = criarElemento('button', 'div__btns__preco__definido__excluir', 'excluirPrecoProduto', '<i class="fa-solid fa-square-xmark"></i>')
    btnExcluirPreco.addEventListener('click', (e) => { excluirPreco(e) })

    divBtns.appendChild(btnAlterarPreco)
    divBtns.appendChild(btnExcluirPreco)
    div.appendChild(span)
    div.appendChild(p)
    div.appendChild(divBtns)
    verificarPrecoCategoria()
    verificarPrecoFinalGeral()
    return div
}

function excluirPreco(e) {
    const formulario = e.target.parentElement.closest('.lista__categoria__lista__item__container').querySelector('.lista__categoria__item__preco')
    formulario.style.display = 'block'
    const containerPrecoDefinido = e.target.closest('.lista__categoria__item__preco__definido')
    containerPrecoDefinido.remove()
    const inputPreco = formulario.querySelector('#inputPreco')
    inputPreco.value = ''
    inputPreco.focus()
    const id = formulario.closest('.lista__categoria__lista__item').dataset.id
    arrayProdutos[acharProdutoNoArray(id)].preco = 0
    arrayProdutos[acharProdutoNoArray(id)].precoFinal = 0

    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))

    verificarPrecoFinalGeral()
    verificarPrecoCategoria()
}

function alterarPreco(e) {
    const formulario = e.target.parentElement.closest('.lista__categoria__lista__item__container').querySelector('.lista__categoria__item__preco')
    formulario.style.display = 'block'
    const containerPrecoDefinido = e.target.closest('.lista__categoria__item__preco__definido')
    containerPrecoDefinido.remove()
    const inputPreco = formulario.querySelector('#inputPreco')
    const idElemento = formulario.closest('.lista__categoria__lista__item').dataset.id
    inputPreco.value = arrayProdutos[acharProdutoNoArray(idElemento)].preco
    inputPreco.focus()
    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
}

function verificarPrecoFinalGeral() {
    const containerPrecoFinalGeral = document.querySelector('.preco__final__geral')
    const elementoPrecoFinalGeral = document.querySelector('#precoFinalGeral')
    if (arrayProdutos.length > 0) {
        containerPrecoFinalGeral.style.display = 'block'
        const precoFinalGeral = arrayProdutos
            .map(produto => produto.precoFinal)
            .reduce((a, b) => a + b)
        elementoPrecoFinalGeral.innerHTML = `R$${precoFinalGeral.toFixed(2)}`
    } else {
        containerPrecoFinalGeral.style.display = 'none'
    }
}

function verificarPrecoCategoria() {
    const listaDeCategorias = document.querySelectorAll('.lista__categoria')
    listaDeCategorias.forEach(elementoCategoria => {
        const categoria = elementoCategoria.dataset.categoria
        const precoCategoria = arrayProdutos
            .filter(produtoCategoria => produtoCategoria.categoria == categoria)
            .map(produto => produto.precoFinal)
            .reduce((a, b) => a + b)
        const elCategoria = document.querySelector(`[data-categoria="${categoria}"] .lista__categoria__preco__final__valor`)
        elCategoria.innerHTML = `R$${precoCategoria.toFixed(2)}`
    })
}

// Falta a lógica da categoria: se queiser alterar a categoria dentro do alterarTarefa
function alterarTarefa(e, objetoProduto) {
    e.preventDefault()
    const btn = e.target
    btn.classList.toggle('active')
    const formulario = criarFormulario()
    const li = e.target.closest('.lista__categoria__lista__item')
    if (btn.classList.contains('active')) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault()
            const produtoAlterado = {
                nome: e.target['nomeProduto'].value,
                tipoUnidade: e.target['unidadeProduto'].value,
                categoria: e.target['categoriaProduto'].value,
                quantidade: e.target['quantidadeProduto'].value,
                preco: parseFloat((e.target['precoProduto'].value).replace(',','.')).toFixed(2),
                itemPego: objetoProduto.itemPego,
                id: objetoProduto.id,
                precoFinal: 0
            }

            li.querySelector('.lista__categoria__item__quantidade').innerHTML = produtoAlterado.quantidade
            li.querySelector('.lista__categoria__item__produto').innerHTML = produtoAlterado.nome

            if (li.querySelector('.lista__categoria__item__preco__definido__valor')) {
                li.querySelector('.lista__categoria__item__preco__definido__valor').innerHTML = `${produtoAlterado.quantidade} x R$${produtoAlterado.preco}`
                produtoAlterado.precoFinal = parseFloat((produtoAlterado.preco)).toFixed(2) * parseFloat((produtoAlterado.quantidade).replace(',', '.')).toFixed(2)
                li.querySelector('.lista__categoria__item__preco__definido__texto').innerHTML = `R$${produtoAlterado.precoFinal.toFixed(2)}`
            } else {
                const precoProduto = criarPrecoDoProduto(produtoAlterado)
                li.querySelector('.lista__categoria__lista__item__container').appendChild(precoProduto)
                const form = li.querySelector('.lista__categoria__item__preco')
                form.style.display = 'none'
            }

            arrayProdutos[acharProdutoNoArray(objetoProduto.id)] = produtoAlterado
            localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
            verificarPrecoCategoria()
            verificarPrecoFinalGeral()

            li.querySelector('#formAlterarTarefa').remove()
            btn.classList.remove('active')
        })
        li.appendChild(formulario)
    } else {
        li.querySelector('#formAlterarTarefa').remove()
    }
    console.log('aq')
}
function criarFormulario() {
    const formularioAlterarTarefa = criarElemento('form', 'lista__categoria__lista__item__alterar__tarefa', 'formAlterarTarefa')

    const containerAlterarNome = criarElemento('fieldset', 'alterar__tarefa__nome')
    const labelTituloNome = criarElemento('label', 'alterar__tarefa__nome__titulo', 'nomeProduto', 'Nome do Produto:')
    const inputNome = criarElemento('input', 'alterar__tarefa__nome__nome', 'nomeProduto')
    inputNome.type = 'text'
    containerAlterarNome.appendChild(labelTituloNome)
    containerAlterarNome.appendChild(inputNome)

    const containerTipo = criarElemento('fieldset', 'alterar__tarefa__tipo')
    const labelTipo = criarElemento('label', 'alterar__tarefa__tipo__titulo', 'unidadeProduto', 'TIPO')
    const selectTipo = criarElemento('select', 'alterar__tarefa__tipo__select', 'unidadeProduto')
    const optionUN = criarOption('un')
    const optionKG = criarOption('kg')
    const optionG = criarOption('g')
    const optionL = criarOption('l')
    const optionML = criarOption('ml')
    const optionDZ = criarOption('dz')
    selectTipo.appendChild(optionUN)
    selectTipo.appendChild(optionKG)
    selectTipo.appendChild(optionG)
    selectTipo.appendChild(optionL)
    selectTipo.appendChild(optionML)
    selectTipo.appendChild(optionDZ)
    containerTipo.appendChild(labelTipo)
    containerTipo.appendChild(selectTipo)

    const containerCategoria = criarElemento('fieldset', 'alterar__tarefa__categoria')
    const labelCategoria = criarElemento('label', 'alterar__tarefa__categoria__titulo', 'categoriaProduto', 'Categoria')
    const selectCategoria = criarElemento('select', 'alterar__tarefa__categoria__select', 'categoriaProduto')
    const optionMercearia = criarOption('Mercearia')
    const optionPadaria = criarOption('Padaria')
    const optionFrutasEVerduras = criarOption('Frutas e Verduras')
    const optionCarnes = criarOption('Carnes')
    const optionFrios = criarOption('Frios')
    const optionLimpeza = criarOption('Limpeza')
    const optionHigienePessoal = criarOption('Higiene Pessoal')
    const optionPetz = criarOption('Petz')
    const optionUtensiliosDomesticos = criarOption('Utensilios Domesticos')
    const optionOutros = criarOption('Outros')
    selectCategoria.appendChild(optionMercearia)
    selectCategoria.appendChild(optionPadaria)
    selectCategoria.appendChild(optionFrutasEVerduras)
    selectCategoria.appendChild(optionCarnes)
    selectCategoria.appendChild(optionFrios)
    selectCategoria.appendChild(optionLimpeza)
    selectCategoria.appendChild(optionHigienePessoal)
    selectCategoria.appendChild(optionPetz)
    selectCategoria.appendChild(optionUtensiliosDomesticos)
    selectCategoria.appendChild(optionOutros)
    containerCategoria.appendChild(labelCategoria)
    containerCategoria.appendChild(selectCategoria)

    const containerAlterarPreco = criarElemento('fieldset', 'alterar__tarefa__preco')
    const labelTituloPreco = criarElemento('label', 'alterar__tarefa__preco__titulo', 'precoProduto', 'Preço:')
    const inputTituloPreco = criarElemento('input', 'alterar__tarefa__preco__input', 'precoProduto')
    containerAlterarPreco.appendChild(labelTituloPreco)
    containerAlterarPreco.appendChild(inputTituloPreco)

    const containerAlterarQuantidade = criarElemento('fieldset', 'alterar__tarefa__quantidade')
    const labelTituloQuantidade = criarElemento('label', 'alterar__tarefa__quantidade__titulo', 'quantidadeProduto', 'QTDE.')
    const inputTituloQuantidade = criarElemento('input', 'alterar__tarefa__quantidade__input', 'quantidadeProduto')
    inputTituloQuantidade.type = 'text'
    containerAlterarQuantidade.appendChild(labelTituloQuantidade)
    containerAlterarQuantidade.appendChild(inputTituloQuantidade)

    const containerBotoes = criarElemento('fieldset', 'alterar__tarefa__botoes')
    const btnAdicionar = criarElemento('button', 'btn__alterar__adicionar', 'btnAlterarAdicionar', 'Adicionar')
    btnAdicionar.type = 'submit'
    const btnCancelar = criarElemento('button', 'btn__alterar__cancelar', 'btnAlterarCancelar', 'Cancelar')
    btnCancelar.type = 'submit'
    containerBotoes.appendChild(btnAdicionar)
    containerBotoes.appendChild(btnCancelar)


    formularioAlterarTarefa.appendChild(containerAlterarNome)
    formularioAlterarTarefa.appendChild(containerTipo)
    formularioAlterarTarefa.appendChild(containerCategoria)
    formularioAlterarTarefa.appendChild(containerAlterarPreco)
    formularioAlterarTarefa.appendChild(containerAlterarQuantidade)
    formularioAlterarTarefa.appendChild(containerBotoes)
    return formularioAlterarTarefa
}

function criarOption(valor) {
    const option = document.createElement('option')
    option.value = valor
    option.innerHTML = valor
    return option
}   