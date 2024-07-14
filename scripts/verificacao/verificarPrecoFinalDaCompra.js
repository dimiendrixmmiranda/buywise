import { arrayDeCompras } from "../arrayDeCompras.js"

export function verificarPrecoFinalGeralCompra() {
    const precoFinal = arrayDeCompras[0].map(produto => produto.precoFinal).reduce((a, b) => a + b, 0)
    const elementoPrecoFinal = document.querySelector('#precoFinalGeralCompra')
    const containerPai = elementoPrecoFinal.parentElement
    elementoPrecoFinal.innerHTML = `R$${precoFinal.toFixed(2)}`
    elementoPrecoFinal.dataset.preco = precoFinal
    if (elementoPrecoFinal.dataset.preco != 0) {
        containerPai.style.display = 'block'
    } else {
        containerPai.style.display = 'none'
    }
}