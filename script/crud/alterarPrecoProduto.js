import { escreverInformacoesNoLocalStorage } from "../funcoes-adicionais/escreverInformacoesNoLocalStorage.js"
import { verificarPrecoFinalDeCadaCategoria } from "../validacoes/verificarPrecoFinalDeCadaCategoria.js"

export function alterarPrecoProduto(e, objetoProduto, li) {
    e.preventDefault()
    const divInserirPreco = li.querySelector('.p-inserirPreco')
    const divPrecoInserido = li.querySelector('.p-precoInserido')
    
    divPrecoInserido.style.display = 'none'
    divInserirPreco.style.display = 'flex'

    const input = divInserirPreco.querySelector('input')
    input.focus()
    const inputFormatado = input.value.match(/R\$/g) ? input.value: `R$${input.value}` 
    let precoFormatado = parseFloat(inputFormatado.split('R$')[1].replace(',', '.'))

    if(Number.isNaN(precoFormatado)){
        precoFormatado = 0
    }

    objetoProduto.preco = precoFormatado
    objetoProduto.precoFinal = objetoProduto.quantidade * precoFormatado

    const ps = divPrecoInserido.querySelectorAll('p')
    ps[0].innerHTML = `${objetoProduto.quantidade}${objetoProduto.un} x R$${objetoProduto.preco.toFixed(2)}`
    ps[1].innerHTML = `R$${(objetoProduto.quantidade * objetoProduto.preco).toFixed(2)}`

    verificarPrecoFinalDeCadaCategoria()
    escreverInformacoesNoLocalStorage()
}