import { gerarID } from "./gerarID.js";
const formulario = document.querySelector('#form')
const lista = document.querySelector('.lista')
const arrayProdutos = JSON.parse(localStorage.getItem("produtos")) || []
obterPrecoFinalListaProdutos()

arrayProdutos.forEach(produto => {
    adicionandoCriandoNovaCategoria(produto)
});


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
        obterPrecoFinalListaProdutos()
        inputNomeProduto.focus()
    }
})

function criarProdutoDaLista(objetoProduto) {
    const li = document.createElement('li')
    li.classList.add('lista__categoria__lista__item')
    li.dataset.id = objetoProduto.id

    const divContainer = document.createElement('div')
    divContainer.classList.add('lista__categoria__lista__item__container')

    const pQuantidade = document.createElement('p')
    pQuantidade.classList.add('lista__categoria__item__quantidade')
    pQuantidade.innerHTML = objetoProduto.quantidade

    const pProduto = document.createElement('p')
    pProduto.classList.add('lista__categoria__item__produto')
    pProduto.innerHTML = objetoProduto.nome

    const formInserirPreco = document.createElement('form')
    formInserirPreco.classList.add('lista__categoria__item__preco')
    const pPrecoTexto = document.createElement('p')
    pPrecoTexto.innerHTML = 'Inserir Preço:'
    const inputPreco = document.createElement('input')
    inputPreco.type = 'text'
    inputPreco.id = 'inputPreco'
    inputPreco.setAttribute('minlength', '1')
    inputPreco.setAttribute('required', '')
    const btnInserirPreco = document.createElement('button')
    btnInserirPreco.type = 'submit'
    formInserirPreco.addEventListener('submit', (e) => inserirPrecoNoProduto(e))

    if (objetoProduto.preco) {
        formInserirPreco.style.display = 'none'
        const preco = criarPrecoDoProduto((objetoProduto))
        divContainer.appendChild(preco)
    }


    btnInserirPreco.innerHTML = '<i class="fa-regular fa-circle-check"></i>'
    formInserirPreco.appendChild(pPrecoTexto)
    formInserirPreco.appendChild(inputPreco)
    formInserirPreco.appendChild(btnInserirPreco)

    const divBtns = document.createElement('div')
    divBtns.classList.add('lista__categoria__item__btns')

    const btnExcluir = document.createElement('button')
    btnExcluir.classList.add('btn__excluir')
    btnExcluir.addEventListener('click', (e) => excluirTarefa(e))

    const btnAlterar = document.createElement('button')
    btnAlterar.classList.add('btn__alterar')
    btnAlterar.addEventListener('click', (e) => {
        e.preventDefault()
        const formularioAlterarTarefa = criarFormulario(objetoProduto)
        li.appendChild(formularioAlterarTarefa)

        // BUG: quando clico no btn alterar tarefa, se clicar mais de uma vez ele ira fazer mais de um formulario
        formularioAlterarTarefa.addEventListener('submit', (e) => {
            e.preventDefault()
            const objetoProdutoAlterado = {
                nome: formularioAlterarTarefa.querySelector('#nomeProduto').value,
                tipoUnidade: formularioAlterarTarefa.querySelector('#unidadeProduto').value,
                categoria: formularioAlterarTarefa.querySelector('#categoriaProduto').value,
                quantidade: formularioAlterarTarefa.querySelector('#quantidadeProduto').value,
                preco: objetoProduto.preco,
                itemPego: objetoProduto.itemPego,
                id: objetoProduto.id,
            }
            const produto = e.target.closest('.lista__categoria__lista__item').querySelector('.lista__categoria__lista__item__container')
            produto.querySelector('.lista__categoria__item__quantidade').innerHTML = objetoProdutoAlterado.quantidade
            produto.querySelector('.lista__categoria__item__produto').innerHTML = objetoProdutoAlterado.nome

            // lógica dos selects vai ser diferente
            const categoriaAtual = produto.closest('.lista__categoria').dataset.categoria

            if (categoriaAtual == objetoProdutoAlterado.categoria) {
                const id = e.target.closest('.lista__categoria__lista__item').dataset.id
                arrayProdutos[acharProdutoNoArray(id)] = objetoProdutoAlterado
            } else {
                produto.remove()
                const categoria = document.querySelector(`[data-categoria="${objetoProdutoAlterado.categoria}"] .lista__categoria__lista`)
                if (categoria == null) {
                    const novaCategoria = criarNovaCategoria(objetoProdutoAlterado)
                    const li = criarProdutoDaLista(objetoProdutoAlterado)
                    lista.appendChild(novaCategoria)
                    novaCategoria.querySelector('.lista__categoria__lista').appendChild(li)

                    const id = e.target.closest('.lista__categoria__lista__item').dataset.id
                    arrayProdutos[acharProdutoNoArray(id)] = objetoProdutoAlterado
                    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
                } else {
                    const li = criarProdutoDaLista(objetoProdutoAlterado)
                    categoria.appendChild(li)
                    const id = e.target.closest('.lista__categoria__lista__item').dataset.id
                    arrayProdutos[acharProdutoNoArray(id)] = objetoProdutoAlterado
                    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
                }
            }
            localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
            formularioAlterarTarefa.remove()
        })

    })


    const btnConcluir = document.createElement('button')
    btnConcluir.classList.add('btn__concluir')
    btnConcluir.addEventListener('click', (e) => concluirTarefa(e))

    vereficarSeOItemFoiPego(objetoProduto, divContainer)

    divBtns.appendChild(btnExcluir)
    divBtns.appendChild(btnAlterar)
    divBtns.appendChild(btnConcluir)

    const formularioAlterarTarefa = document.createElement('div')
    formularioAlterarTarefa.classList.add('lista__categoria__lista__item__alterar__tarefa')

    divContainer.appendChild(pQuantidade)
    divContainer.appendChild(pProduto)
    divContainer.appendChild(formInserirPreco)
    divContainer.appendChild(divBtns)

    li.appendChild(divContainer)
    return li
}

function criarNovaCategoria(objetoProduto) {
    const li = document.createElement('li')
    li.classList.add('lista__categoria')
    li.dataset.categoria = objetoProduto.categoria

    const tituloCategoria = document.createElement('h2')
    tituloCategoria.classList.add('lista__categoria__titulo')
    tituloCategoria.innerHTML = objetoProduto.categoria

    const ul = document.createElement('ul')
    ul.classList.add('lista__categoria__lista')

    const btnExcluirLista = document.createElement('button')
    btnExcluirLista.classList.add('lista__categoria__btnExcluirLista')
    btnExcluirLista.addEventListener('click', (e) => excluirCategoria(e))

    const totalDaCategoria = document.createElement('div')
    totalDaCategoria.classList.add('lista__categoria__preco__final')
    const p = document.createElement('p')
    p.innerHTML = 'Preço final da Categoria:'
    const strong = document.createElement('strong')
    strong.id = 'precoFinal'
    strong.innerHTML = 'R$0'
    totalDaCategoria.appendChild(p)
    totalDaCategoria.appendChild(strong)

    if (objetoProduto.precoFinal) {
        const produtosDaCategoria = arrayProdutos.filter(produto => produto.categoria === objetoProduto.categoria)
        const precoFinalDaCategoria = produtosDaCategoria.map(produto => produto.precoFinal).reduce((a, b) => a + b)
        strong.innerHTML = `R$${(precoFinalDaCategoria).toFixed(2)}`
    }

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
    obterPrecoFinalListaProdutos()
    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
}

function concluirTarefa(e) {
    const elemento = e.target.closest('.lista__categoria__lista__item')
    const elementoContainer = elemento.querySelector('.lista__categoria__lista__item__container')
    const id = elemento.dataset.id
    elementoContainer.classList.toggle('lista__categoria__lista__item__coletado')
    elemento.querySelector('.lista__categoria__item__preco__definido').classList.toggle('lista__categoria__item__preco__definido__coletado')
    arrayProdutos[acharProdutoNoArray(id)].itemPego = arrayProdutos[acharProdutoNoArray(id)].itemPego ? false : true
    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
}

function vereficarSeOItemFoiPego(objetoProduto, div) {
    if (objetoProduto.itemPego) {
        div.classList.add('lista__categoria__lista__item__coletado')
    } else {
        div.classList.remove('lista__categoria__lista__item__coletado')
    }
}

function acharProdutoNoArray(id) {
    return arrayProdutos.findIndex(tarefa => tarefa.id == id)
}

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

function excluirCategoria(e) {
    const containerLista = e.target.closest('.lista__categoria')
    const listaProdutosCategoria = containerLista.querySelectorAll('.lista__categoria__lista li')
    
    listaProdutosCategoria.forEach(produto => {
        arrayProdutos.splice(acharProdutoNoArray(produto.dataset.id), 1)
        localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
        containerLista.remove()
        obterPrecoFinalListaProdutos()
    })
}

function inserirPrecoNoProduto(e) {
    e.preventDefault()
    const liProduto = e.target.closest('.lista__categoria__lista__item')
    const containerProduto = liProduto.querySelector('.lista__categoria__lista__item__container')
    const IDProduto = liProduto.dataset.id

    const inputForm = e.target.querySelector('#inputPreco')
    const preco = parseFloat(inputForm.value.replace(',', '.'))
    const quantidade = parseFloat(arrayProdutos[acharProdutoNoArray(IDProduto)].quantidade)
    const precoFinal = preco * quantidade
    arrayProdutos[acharProdutoNoArray(IDProduto)].preco = preco
    arrayProdutos[acharProdutoNoArray(IDProduto)].precoFinal = precoFinal
    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))

    // parte visual
    const formulario = liProduto.querySelector('.lista__categoria__item__preco')
    formulario.style.display = 'none'
    const containerPrecoProdutoDefinido = criarPrecoDoProduto(arrayProdutos[acharProdutoNoArray(IDProduto)])
    containerProduto.appendChild(containerPrecoProdutoDefinido)

    const categoria = liProduto.closest('.lista__categoria').dataset.categoria
    const produtosDaCategoria = arrayProdutos.filter(produto => produto.categoria === categoria)
    const precoFinalDaCategoria = produtosDaCategoria.map(produto => produto.precoFinal).reduce((a, b) => a + b)
    liProduto.closest('.lista__categoria').querySelector('.lista__categoria__preco__final #precoFinal').innerHTML = `RS${precoFinalDaCategoria.toFixed(2)}`
    
    obterPrecoFinalListaProdutos()
}

function criarPrecoDoProduto(objetoProduto) {
    const div = document.createElement('div')
    div.classList.add('lista__categoria__item__preco__definido')
    const p = document.createElement('p')
    p.innerHTML = `R$${(objetoProduto.precoFinal).toFixed(2)}`
    const span = document.createElement('span')
    span.innerHTML = `${objetoProduto.quantidade} x R$${(objetoProduto.preco).toFixed(2)}`

    const divBtns = document.createElement('div')
    divBtns.classList.add('div__btns__preco__definido')
    const btnAlterarPreco = document.createElement('button')
    btnAlterarPreco.innerHTML = '<i class="fa-solid fa-square-pen"></i>'
    btnAlterarPreco.id = "alterarPrecoProduto"
    btnAlterarPreco.addEventListener('click', (e) => alterarPreco(e))
    
    const btnExcluirPreco = document.createElement('button')
    btnExcluirPreco.innerHTML = '<i class="fa-solid fa-square-xmark"></i>'
    btnExcluirPreco.id = 'excluirPrecoProduto'
    
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

    const idElemento = formulario.closest('.lista__categoria__lista__item').dataset.id
    arrayProdutos[acharProdutoNoArray(idElemento)].preco = 0
    arrayProdutos[acharProdutoNoArray(idElemento)].precoFinal = 0

    const categoria = formulario.closest('.lista__categoria').dataset.categoria
    const produtosDaCategoria = arrayProdutos.filter(produto => produto.categoria === categoria)
    const precoFinalDaCategoria = produtosDaCategoria.map(produto => parseFloat(produto.precoFinal))
    formulario.closest('.lista__categoria').querySelector('.lista__categoria__preco__final #precoFinal').innerHTML = `RS${precoFinalDaCategoria}`
    
    obterPrecoFinalListaProdutos()
    localStorage.setItem("produtos", JSON.stringify(arrayProdutos))
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

function obterPrecoFinalListaProdutos(){
    const elementoPrecoFinalGeral = document.querySelector('#precoFinalGeral')
    if(arrayProdutos.length > 0){
        const precoFinalGeral = arrayProdutos.map(produto => produto.precoFinal).reduce((a, b) => a + b) 
        elementoPrecoFinalGeral.innerHTML = `R$${precoFinalGeral.toFixed(2)}`
        elementoPrecoFinalGeral.parentElement.style.display = 'flex'
    }else{
        elementoPrecoFinalGeral.innerHTML = `R$${0}`
        elementoPrecoFinalGeral.parentElement.style.display = 'none'
    }
}