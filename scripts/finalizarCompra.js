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
            listaDeProdutos: arrayDeCompras[0],
            data: data,
            hora: hora
        }

        gerarPdfLista(objetoGerarLista)
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
    input.setAttribute('max-length', '25')
    const buttonFinalizar = criarElemento('button', 'Finalizar Compra', 'caixa-finalizar-compra-btn', 'finalizarCompra', 'button')
    const buttonCancelar = criarElemento('button', 'Cancelar', 'caixa-finalizar-compra-btn', 'cancelar', 'button')
    div.appendChild(label)
    div.appendChild(input)
    div.appendChild(buttonFinalizar)
    div.appendChild(buttonCancelar)
    return div
}



function gerarPdfLista(objetoGerarLista) {
    const arrayFormatado = arrayEmOrdem(objetoGerarLista)
    console.log(arrayFormatado)
}

function arrayEmOrdem(objetoGerarLista){
    const arrayEmOrdem = []
    console.log(objetoGerarLista)
    const arrayProdutosGerais = objetoGerarLista.listaDeProdutos.filter(produto => produto.categoria == 'produtos-gerais')
    const arrayCarnes = objetoGerarLista.listaDeProdutos.filter(produto => produto.categoria == 'carnes')
    const arrayFrutasVerduras = objetoGerarLista.listaDeProdutos.filter(produto => produto.categoria == 'frutas-verduras')
    const arrayBebidas = objetoGerarLista.listaDeProdutos.filter(produto => produto.categoria == 'bebidas')
    const arrayProdutosDeLimpeza = objetoGerarLista.listaDeProdutos.filter(produto => produto.categoria == 'produtos-de-limpeza')
    const arrayHigienePessoal = objetoGerarLista.listaDeProdutos.filter(produto => produto.categoria == 'higiene-pessoal')
    const arrayPadaria = objetoGerarLista.listaDeProdutos.filter(produto => produto.categoria == 'padaria')
    const arrayPetshop = objetoGerarLista.listaDeProdutos.filter(produto => produto.categoria == 'petshop')
    const arrayUtensiliosDomesticos = objetoGerarLista.listaDeProdutos.filter(produto => produto.categoria == 'utensilios-domesticos')


    arrayEmOrdem.push(arrayProdutosGerais)
    arrayEmOrdem.push(arrayCarnes)
    arrayEmOrdem.push(arrayFrutasVerduras)
    arrayEmOrdem.push(arrayBebidas)
    arrayEmOrdem.push(arrayProdutosDeLimpeza)
    arrayEmOrdem.push(arrayHigienePessoal)
    arrayEmOrdem.push(arrayPadaria)
    arrayEmOrdem.push(arrayPetshop)
    arrayEmOrdem.push(arrayUtensiliosDomesticos)

    const array = arrayEmOrdem.filter(array => array.length > 0)
    return array
}