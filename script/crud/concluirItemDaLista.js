import { arrayDeProdutos } from "../dados/arrayDeProdutos.js"
import { acharProdutoPeloIdentificador } from "../funcoes-adicionais/acharProdutoPeloIdentificador.js"
import { escreverInformacoesNoLocalStorage } from "../funcoes-adicionais/escreverInformacoesNoLocalStorage.js"

export function concluirItemDaLista(e) {
    const produto = e.target.closest('.conteudo-lista-item-produto')
    const idProduto = produto.dataset.id
    const containerPrecoInserido = produto.querySelector('.p-precoInserido')
    const inserirPreco = produto.querySelector('.p-inserirPreco')

    if (produto.classList.contains('concluido')) {
        produto.classList.remove('concluido')
        containerPrecoInserido.classList.remove('concluido')
        inserirPreco.classList.remove('concluido')
    } else {
        produto.classList.add('concluido')
        containerPrecoInserido.classList.add('concluido')
        inserirPreco.classList.add('concluido')
    }

    if (arrayDeProdutos[0][acharProdutoPeloIdentificador(idProduto)].itemPego) {
        arrayDeProdutos[0][acharProdutoPeloIdentificador(idProduto)].itemPego = false
    } else {
        arrayDeProdutos[0][acharProdutoPeloIdentificador(idProduto)].itemPego = true
    }

    escreverInformacoesNoLocalStorage()
}