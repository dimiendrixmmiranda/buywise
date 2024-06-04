import { acharProdutoPeloId } from "./acharProdutoPeloId.js"
import { arrayDeCompras } from "./arrayDeCompras.js"
import { capitalizeFirstLetter } from "./capitalizeFirstLetter.js"
import { escreverInformacoesNoLocalStorage } from "./escreverNoLocalStorage.js"
import { verificarPrecoFinalDaCategoriaGeral, verificarPrecoFinalGeralCompra } from "./verificarPrecoFinalCategoria.js"

export function excluirLista(e) {
    const listaDeProdutos = e.target.closest('.conteudo-lista-item').querySelectorAll('ul li')
    const arrayDeId = []
    listaDeProdutos.forEach(produto => arrayDeId.push(produto.dataset.id))

    arrayDeId.forEach(id => {
        const produto = acharProdutoPeloId(id)
        arrayDeCompras[0].splice(produto, 1)
        escreverInformacoesNoLocalStorage()
    })
    // removendo visualmente
    e.target.closest('.conteudo-lista-item').remove()
    verificarPrecoFinalDaCategoriaGeral()
    verificarPrecoFinalGeralCompra()
}

export function excluirItemDaLista(e) {
    const produto = e.target.closest('.conteudo-lista-item-produto')
    const idProduto = produto.dataset.id
    arrayDeCompras[0].splice(acharProdutoPeloId(idProduto), 1)
    const lista = e.target.closest('.conteudo-lista-item')
    const qtdeDeProdutos = produto.closest('ul').querySelectorAll('li').length
    if (qtdeDeProdutos > 1) {
        produto.remove() // removendo visualmente
    } else {
        lista.remove() // removendo visualmente
    }
    verificarPrecoFinalDaCategoriaGeral()
    verificarPrecoFinalGeralCompra()
    escreverInformacoesNoLocalStorage()
}

export function concluirProduto(e) {
    const produto = e.target.closest('.conteudo-lista-item-produto')
    const idProduto = produto.dataset.id
    const containerPrecoInserido = produto.querySelector('.p-precoInserido')
    const inserirPreco = produto.querySelector('.p-inserirPreco')

    if (produto.classList.contains('concluido')) {
        produto.classList.remove('concluido')
        containerPrecoInserido.style.backgroundColor = '#17025f'
        inserirPreco.style.backgroundColor = '#17025f'
    } else {
        produto.classList.add('concluido')
        containerPrecoInserido.style.backgroundColor = '#1ebe5e'
        inserirPreco.style.backgroundColor = '#1ebe5e'
    }

    if (arrayDeCompras[0][acharProdutoPeloId(idProduto)].itemPego) {
        arrayDeCompras[0][acharProdutoPeloId(idProduto)].itemPego = false
    } else {
        arrayDeCompras[0][acharProdutoPeloId(idProduto)].itemPego = true
    }

    escreverInformacoesNoLocalStorage()
}

export function alterarProduto(e, formulario, objetoProduto) {
    const btnAlterar = e.target.parentElement
    const li = e.target.closest('.conteudo-lista-item-produto')
    const formularioAlterarTarefa = li.querySelector('.conteudo-alterar-produto')
    const selectNovaCategoria = formularioAlterarTarefa.querySelector('#novaCategoria')

    if (btnAlterar.classList.contains('active')) {
        ocultarFormulario(btnAlterar, formularioAlterarTarefa)
    } else {
        btnAlterar.classList.add('active')
        formularioAlterarTarefa.setAttribute('style', 'display: grid; animation: animarFormularioAlterarTarefaAbrir 0.6s ease;top: 0; position: relative;')
        const formulario = e.target.closest('.conteudo-lista-item-produto').querySelector('.conteudo-alterar-produto')
        const novoNomeProduto = formulario.querySelector('#novoNomeProduto')
        novoNomeProduto.focus()
        const novaQuantidadeProduto = formulario.querySelector('#novaQuantidadeProduto')
        const novaCategoria = formulario.querySelector('#novaCategoria')

        novoNomeProduto.value = objetoProduto.nome
        novaQuantidadeProduto.value = objetoProduto.quantidade
        let id
        selectNovaCategoria.querySelectorAll('option').forEach(option => {
            if (option.value === objetoProduto.categoria) {
                id = option.dataset.selected
            }
        })
        selectNovaCategoria.selectedIndex = id
        
        formulario.addEventListener('submit', (e) => {
            e.preventDefault()
            const inputNomeProduto = e.target.querySelector('#novoNomeProduto')
            const inputQuantidadeProduto = e.target.querySelector('#novaQuantidadeProduto')
            const categoria = e.target.querySelector('#novaCategoria')

            const novoObjetoProduto = {
                nome: inputNomeProduto.value,
                quantidade: parseFloat(inputQuantidadeProduto.value),// vou ter que fazer alteração para quilo e grama
                categoria: categoria.value,
                id: objetoProduto.id,
                itemPego: objetoProduto.itemPego,
                preco: objetoProduto.preco,
                precoFinal: objetoProduto.precoFinal
            }
            arrayDeCompras[0][acharProdutoPeloId(objetoProduto.id)] = novoObjetoProduto
            escreverInformacoesNoLocalStorage()

            alterarProdutoVisualmente(li, novoObjetoProduto, novaCategoria.value)

            ocultarFormulario(btnAlterar, formularioAlterarTarefa)
        })
    }

}

function ocultarFormulario(btnAlterar, formularioAlterarTarefa) {
    btnAlterar.classList.remove('active')
    formularioAlterarTarefa.setAttribute('style', 'display: none; animation: animarFormularioAlterarTarefaFechar 0.6s ease;top: 0; position: absolute;')
}

function alterarProdutoVisualmente(li, novoObjetoProduto, novaCategoria){
    const quantidade = li.querySelector('.p-quantidade')
    quantidade.innerHTML = novoObjetoProduto.quantidade
    const produto = li.querySelector('.p-produto')
    produto.innerHTML = capitalizeFirstLetter(novoObjetoProduto.nome.split(' ')).join(' ')

    const categoriaAntiga = li.closest('.conteudo-lista-item').dataset.categoria
    // fazer a verificação se a categoria é igual ou diferente (fazer uma copia da li atual)
    // let novaLi = li.outerHTML
    // console.log(li)
    // console.log(novaLi)
    
    console.log(novaCategoria)
    console.log(categoriaAntiga)
}