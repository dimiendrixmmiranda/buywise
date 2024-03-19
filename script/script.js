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
    btnAlterar.addEventListener('click', (e) => { alterarTarefa(e) })
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
    const p = criarElemento('p', 'lista__categoria__item__preco__definido__texto', '', `R$${(objetoProduto.precoFinal)}`)
    const span = criarElemento('span', 'lista__categoria__item__preco__definido__valor', '', `${objetoProduto.quantidade} x R$${(objetoProduto.preco)}`)

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

function alterarTarefa(e) {
    e.preventDefault()
    console.log('FALTA IMPLEMENTAR!')
}
// TENHO QUE CRIAR UM FORMLUARIO QUANDO CLICAR EM ALTERAR TAREFA
function criarFormulario(objetoProduto) {
    const divFormulario = document.createElement('form')
    divFormulario.id = 'formAlterarTarefa'
    divFormulario.classList.add('lista__categoria__lista__item__alterar__tarefa')
    divFormulario.innerHTML = `
    <fieldset class="alterar__tarefa__nome">
        <label for="nomeProduto">Nome do produto:</label>
        <input type="text" name="nomeProduto" id="nomeProduto" required="" value="${objetoProduto.nome}">
    </fieldset>
    <fieldset class="alterar__tarefa__tipo">
        <label for="unidadeProduto">TIPO</label>
        <select name="unidadeProduto" id="unidadeProduto">
            <option value="un">un</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="L">L</option>
            <option value="ml">ml</option>
            <option value="dz">dz</option>
        </select>
    </fieldset>

    <fieldset class="alterar__tarefa__categoria">
        <label for="categoriaProduto">Categoria:</label>
        <select name="categoriaProduto" id="categoriaProduto">
            <option value="">Categoria</option>
            <option value="Mercearia">Mercearia</option>
            <option value="Padaria">Padaria</option>
            <option value="Frutas e Verduras">Frutas e Verduras</option>
            <option value="Carnes">Carnes</option>
            <option value="Frios">Frios</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Higiene Pessoal">Higiene Pessoal</option>
            <option value="Petz">Petz</option>
            <option value="Utensílios Domésticos">Utensílios Domésticos</option>
            <option value="Outros">Outros</option>
        </select>
    </fieldset>
    
    <fieldset class="alterar__tarefa__preco">
        <label for="precoProduto">Preço:</label>
        <input type="text" id="precoProduto" required="" value="${objetoProduto.preco}">
    </fieldset>

    <fieldset class="alterar__tarefa__quantidade">
        <label for="quantidadeProduto">QTDE.</label>
        <input type="text" id="quantidadeProduto" required="" value="${objetoProduto.quantidade}">
    </fieldset>

    <fieldset class="alterar__tarefa__botoes">
        <button type="submit">Adicionar</button>
        <button type="reset">Cancelar</button>
    </fieldset>
    `

    // fazer a parde no formulario de inserir o preço
    return divFormulario
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