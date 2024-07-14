import { criarElemento } from "./criarElemento.js"

export function gerarCaixaFinalizarCompra() {
    const div = criarElemento('div', '', 'caixa-finalizar-compra')
    const label = criarElemento('label', 'Informe o nome do mercado:', 'caixa-finalizar-compra-label', 'inputFinalizarCompra')
    const input = criarElemento('input', '', 'caixa-finalizar-compra-input', 'inputFinalizarCompra', 'text')
    input.setAttribute('maxlength', '25')
    input.setAttribute('minlength', '1')
    input.setAttribute('autocomplete', 'off')
    const buttonFinalizar = criarElemento('button', 'Finalizar Compra', 'caixa-finalizar-compra-btn', 'finalizarCompra', 'button')
    const buttonCancelar = criarElemento('button', 'Cancelar', 'caixa-finalizar-compra-btn', 'cancelar', 'button')
    div.appendChild(label)
    div.appendChild(input)
    div.appendChild(buttonFinalizar)
    div.appendChild(buttonCancelar)
    return div
}