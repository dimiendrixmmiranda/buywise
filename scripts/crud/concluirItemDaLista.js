import { acharProdutoPeloId } from "../acharProdutoPeloId.js"
import { escreverInformacoesNoLocalStorage } from "../escreverNoLocalStorage.js"

export function concluirItemDaLista(e) {
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