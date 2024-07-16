import { arrayDeProdutos } from "../dados/arrayDeProdutos.js"
import { acharProdutoPeloIdentificador } from "../funcoes-adicionais/acharProdutoPeloIdentificador.js"
import { escreverInformacoesNoLocalStorage } from "../funcoes-adicionais/escreverInformacoesNoLocalStorage.js"
import { verificarPrecoFinalDeCadaCategoria } from "../validacoes/verificarPrecoFinalDeCadaCategoria.js"
import { verificarSeTemAlgumaCategoria } from "../validacoes/verificarSeTemAlgumaCategoria.js"
import { gerarCaixaMensagem } from "./gerarCaixaMensagem.js"

export function excluirCategoria(e) {
    const caixaDeMensagem = gerarCaixaMensagem('Deseja realmente excluir essa categoria?')
    document.body.appendChild(caixaDeMensagem)
    const btnSim = caixaDeMensagem.querySelectorAll('button')[0]
    const btnNao = caixaDeMensagem.querySelectorAll('button')[1]
    const listaDeProdutos = e.target.closest('.conteudo-lista-item').querySelectorAll('ul li')
    const produtoAtual = e.target.closest('.conteudo-lista-item')
    btnSim.addEventListener('click', (e) => {
        e.preventDefault()
        const arrayDeId = []
        listaDeProdutos.forEach(produto => arrayDeId.push(produto.dataset.id))
        
        arrayDeId.forEach(id => {
            const produto = acharProdutoPeloIdentificador(id)
            arrayDeProdutos[0].splice(produto, 1)
            escreverInformacoesNoLocalStorage()
        })
        // removendo visualmente
        produtoAtual.remove()
        verificarPrecoFinalDeCadaCategoria()
        caixaDeMensagem.remove()
        verificarSeTemAlgumaCategoria()
    })
    btnNao.addEventListener('click', (e) => {
        e.preventDefault()
        caixaDeMensagem.remove()
        verificarSeTemAlgumaCategoria()
    })
}