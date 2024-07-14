import { arrayDeCompras } from "../arrayDeCompras.js"
import { criarCaixaDeMensagem } from "../criacao/criarCaixaDeMensagemValidacao.js"
import { escreverInformacoesNoLocalStorage } from "../escreverNoLocalStorage.js"
import { verificarPrecoFinalDeTodasAsCategorias } from "../verificacao/verificarPrecoFinalDaCategoria.js"
import { verificarPrecoFinalGeralCompra } from "../verificacao/verificarPrecoFinalDaCompra.js"
import { verificarSeTemAlgumaCategoria } from "../verificacao/verificarSeTemAlgumaCategoria.js"

export function excluirItemDaLista(e) {
    const caixaDeMensagem = criarCaixaDeMensagem('Deseja realmente excluir essa categoria?')
    document.body.appendChild(caixaDeMensagem)
    const btnSim = caixaDeMensagem.querySelectorAll('button')[0]
    const btnNao = caixaDeMensagem.querySelectorAll('button')[1]
    
    const produto = e.target.closest('.conteudo-lista-item-produto')
    const lista = e.target.closest('.conteudo-lista-item')
    btnSim.addEventListener('click', (e) => {
        e.preventDefault()
        const idProduto = produto.dataset.id
        arrayDeCompras[0].splice(acharProdutoPeloId(idProduto), 1)
        const qtdeDeProdutos = produto.closest('ul').querySelectorAll('li').length
        if (qtdeDeProdutos > 1) {
            produto.remove() // removendo visualmente
        } else {
            lista.remove() // removendo visualmente
        }
        verificarPrecoFinalDeTodasAsCategorias()
        verificarPrecoFinalGeralCompra()
        verificarSeTemAlgumaCategoria()
        escreverInformacoesNoLocalStorage()
        caixaDeMensagem.remove()
    })

    btnNao.addEventListener('click', (e) => {
        e.preventDefault()
        caixaDeMensagem.remove()
    })
}