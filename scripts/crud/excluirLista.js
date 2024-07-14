import { acharProdutoPeloId } from "../acharProdutoPeloId.js"
import { criarCaixaDeMensagem } from "../criacao/criarCaixaDeMensagemValidacao.js"
import { escreverInformacoesNoLocalStorage } from "../escreverNoLocalStorage.js"
import { verificarPrecoFinalDeTodasAsCategorias } from "../verificacao/verificarPrecoFinalDaCategoria.js"
import { verificarPrecoFinalGeralCompra } from "../verificacao/verificarPrecoFinalDaCompra.js"

export function excluirLista(e) {
    const caixaDeMensagem = criarCaixaDeMensagem('Deseja realmente excluir essa categoria?')
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
            const produto = acharProdutoPeloId(id)
            arrayDeCompras[0].splice(produto, 1)
            escreverInformacoesNoLocalStorage()
        })
        // removendo visualmente
        produtoAtual.remove()
        verificarPrecoFinalDeTodasAsCategorias()
        verificarPrecoFinalGeralCompra()
        verificarSeTemAlgumaCategoria()
        caixaDeMensagem.remove()
    })
    btnNao.addEventListener('click', (e) => {
        e.preventDefault()
        caixaDeMensagem.remove()
    })

}