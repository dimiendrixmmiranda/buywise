import { arrayDeCompras } from "./arrayDeCompras.js"
import { criarElemento } from "./criarElemento.js"

const btnFinalizarCompra = document.querySelector('#finalizarCompra')
btnFinalizarCompra.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(arrayDeCompras[0])
    const containerCaixaFinalizarCompra = criarCaixaFinalizarCompra() 
    document.body.appendChild(containerCaixaFinalizarCompra)

    const btnCancelar = containerCaixaFinalizarCompra.querySelector('#cancelar')

    btnCancelar.addEventListener('click', (e) => {
        e.preventDefault()
        containerCaixaFinalizarCompra.remove()
    })
})

function criarCaixaFinalizarCompra() {
    const div = criarElemento('div', '', 'caixa-finalizar-compra')
    const label = criarElemento('label', 'Informe o nome do mercado:', 'caixa-finalizar-compra-label', 'inputFinalizarCompra')
    const input = criarElemento('input', '', 'caixa-finalizar-compra-input', 'inputFinalizarCompra', 'text')
    input.setAttribute('max-length', '25')
    const buttonFinalizar = criarElemento('button', 'Finalizar Compra', 'caixa-finalizar-compra-btn', 'finalizarCompra', 'button')
    const buttonCancelar = criarElemento('button', 'Cancelar', 'caixa-finalizar-compra-btn', 'cancelar', 'button')
    div.appendChild(label)
    div.appendChild(input)
    div.appendChild(buttonFinalizar)
    div.appendChild(buttonCancelar)
    return div
}