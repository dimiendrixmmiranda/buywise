import { arrayDeCompras } from "./arrayDeCompras.js"
import { criarElemento } from "./criarElemento.js"

const btnFinalizarCompra = document.querySelector('#finalizarCompra')
btnFinalizarCompra.addEventListener('click', (e) => {
    e.preventDefault()
    const containerCaixaFinalizarCompra = criarCaixaFinalizarCompra()
    document.body.appendChild(containerCaixaFinalizarCompra)

    const btnCancelar = containerCaixaFinalizarCompra.querySelector('#cancelar')
    const btnFinalizarCompra = containerCaixaFinalizarCompra.querySelector('#finalizarCompra')

    btnFinalizarCompra.addEventListener('click', (e) => {
        e.preventDefault()
        const nomeDoMercado = e.target.closest('.caixa-finalizar-compra').querySelector('.caixa-finalizar-compra-input')
        const data = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
        const hora = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`

        const objetoGerarLista = {
            nomeDoMercado: nomeDoMercado.value,
            listaDeProdutos: arrayEmOrdem(arrayDeCompras[0]),
            data: data,
            hora: hora
        }
        window.location.href = '../pages/historicoDeCompras.html'
        console.log(objetoGerarLista)
    })

    btnCancelar.addEventListener('click', (e) => {
        e.preventDefault()
        containerCaixaFinalizarCompra.remove()
    })
})

function criarCaixaFinalizarCompra() {
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

function arrayEmOrdem(array) {
    const arrayEmOrdem = []
    const arrayProdutosGerais = array.filter(produto => produto.categoria == 'produtos-gerais')
    const arrayCarnes = array.filter(produto => produto.categoria == 'carnes')
    const arrayFrutasVerduras = array.filter(produto => produto.categoria == 'frutas-verduras')
    const arrayBebidas = array.filter(produto => produto.categoria == 'bebidas')
    const arrayProdutosDeLimpeza = array.filter(produto => produto.categoria == 'produtos-de-limpeza')
    const arrayHigienePessoal = array.filter(produto => produto.categoria == 'higiene-pessoal')
    const arrayPadaria = array.filter(produto => produto.categoria == 'padaria')
    const arrayPetshop = array.filter(produto => produto.categoria == 'petshop')
    const arrayUtensiliosDomesticos = array.filter(produto => produto.categoria == 'utensilios-domesticos')


    arrayEmOrdem.push(arrayProdutosGerais)
    arrayEmOrdem.push(arrayCarnes)
    arrayEmOrdem.push(arrayFrutasVerduras)
    arrayEmOrdem.push(arrayBebidas)
    arrayEmOrdem.push(arrayProdutosDeLimpeza)
    arrayEmOrdem.push(arrayHigienePessoal)
    arrayEmOrdem.push(arrayPadaria)
    arrayEmOrdem.push(arrayPetshop)
    arrayEmOrdem.push(arrayUtensiliosDomesticos)

    const arrayFinal = arrayEmOrdem.filter(array => array.length > 0)

    return arrayFinal
}