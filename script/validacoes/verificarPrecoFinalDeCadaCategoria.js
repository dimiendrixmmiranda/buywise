import { arrayDeProdutos } from "../dados/arrayDeProdutos.js"

const elementoPrecoFinalDaCompra = document.querySelector('.conteudo-precoFinalCompra')

export function verificarPrecoFinalDeCadaCategoria(){
    const listaDeCategorias = document.querySelectorAll('#listaDeCategorias .conteudo-lista-item')
    let precoFinalGeral = 0
    listaDeCategorias.forEach(lista => {
        const categoria = lista.dataset.categoria
        const precoFinalDaCategoria = arrayDeProdutos[0].filter(objeto => objeto.categoria === categoria)
            .map(objetos => objetos.precoFinal)
            .reduce((a, b) => a + b, 0)
        precoFinalGeral += precoFinalDaCategoria
            const elementoCategoria = document.querySelector(`[data-categoria="${categoria}"]`)
        const elementoPrecoFinal = elementoCategoria.querySelector('#precoFinal')
        elementoPrecoFinal.innerHTML = `R$${precoFinalDaCategoria.toFixed(2)}`
    })

    if(precoFinalGeral > 0){
        elementoPrecoFinalDaCompra.setAttribute('style', 'display: grid;')
        elementoPrecoFinalDaCompra.querySelector('.conteudo-precoFinalCompra-preco').innerHTML = `R$${precoFinalGeral.toFixed(2)}`
    }else{
        elementoPrecoFinalDaCompra.setAttribute('style', 'display: none;')
    }
}