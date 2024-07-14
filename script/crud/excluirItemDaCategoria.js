import { arrayDeProdutos } from "../dados/arrayDeProdutos.js"
import { acharProdutoPeloIdentificador } from "../funcoes-adicionais/acharProdutoPeloIdentificador.js"
import { escreverInformacoesNoLocalStorage } from "../funcoes-adicionais/escreverInformacoesNoLocalStorage.js"
import { verificarPrecoFinalDeCadaCategoria } from "../validacoes/verificarPrecoFinalDeCadaCategoria.js"
import { gerarCaixaMensagem } from "./gerarCaixaMensagem.js"

export function excluirItemDaCategoria(e) {
    const caixaDeMensagem = gerarCaixaMensagem('Deseja realmente excluir essa categoria?')
    document.body.appendChild(caixaDeMensagem)
    const btnSim = caixaDeMensagem.querySelectorAll('button')[0]
    const btnNao = caixaDeMensagem.querySelectorAll('button')[1]
    
    const produto = e.target.closest('.conteudo-lista-item-produto')
    const lista = e.target.closest('.conteudo-lista-item')
    btnSim.addEventListener('click', (e) => {
        e.preventDefault()
        const idProduto = produto.dataset.id
        arrayDeProdutos[0].splice(acharProdutoPeloIdentificador(idProduto), 1)
        const qtdeDeProdutos = produto.closest('ul').querySelectorAll('li').length
        if (qtdeDeProdutos > 1) {
            produto.remove() // removendo visualmente
        } else {
            lista.remove() // removendo visualmente
        }
        verificarPrecoFinalDeCadaCategoria()
        escreverInformacoesNoLocalStorage()
        caixaDeMensagem.remove()
    })

    btnNao.addEventListener('click', (e) => {
        e.preventDefault()
        caixaDeMensagem.remove()
    })
}