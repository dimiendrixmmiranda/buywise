import { acharProdutoPeloId } from "./acharProdutoPeloId.js"
import { arrayDeCompras } from "./arrayDeCompras.js"
import { escreverInformacoesNoLocalStorage } from "./escreverNoLocalStorage.js"

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