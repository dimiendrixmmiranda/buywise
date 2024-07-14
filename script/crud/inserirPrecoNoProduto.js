import { escreverInformacoesNoLocalStorage } from "../funcoes-adicionais/escreverInformacoesNoLocalStorage.js"
import { verificarPrecoFinalDeCadaCategoria } from "../validacoes/verificarPrecoFinalDeCadaCategoria.js"

export function inserirPrecoNoProduto(e, objetoProduto, divInserirPreco, li, alterarPreco = true) {
    const divPrecoInserido = li.querySelector('.p-precoInserido')
    let input

    if(alterarPreco){
        input = e.target.closest('.p-inserirPreco').querySelector('input')
    }else{
        input = e.target.parentElement.querySelector('.p-inserirPreco input')
    }
    const inputFormatado = input.value.match(/R\$/g) ? input.value: `R$${input.value}` 
    let precoFormatado = parseFloat(inputFormatado.split('R$')[1].replace(',', '.'))
    if(Number.isNaN(precoFormatado)){
        precoFormatado = 0
    }
    objetoProduto.preco = precoFormatado
    objetoProduto.precoFinal = objetoProduto.quantidade * precoFormatado

    divInserirPreco.style.display = 'none'
    divPrecoInserido.style.display = 'flex'
    const ps = divPrecoInserido.querySelectorAll('p')
    ps[0].innerHTML = `${objetoProduto.quantidade}${objetoProduto.un} x R$${objetoProduto.preco.toFixed(2)}`
    ps[1].innerHTML = `R$${(objetoProduto.quantidade * objetoProduto.preco).toFixed(2)}`

    verificarPrecoFinalDeCadaCategoria()

    // verificarPrecoFinalDaCategoriaGeral()
    // verificarPrecoFinalGeralCompra()
    escreverInformacoesNoLocalStorage()
}