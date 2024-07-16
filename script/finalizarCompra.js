import { gerarCaixaFinalizarCompra } from "./crud/gerarCaixaFinalizarCompra.js"
import { arrayDeProdutos } from "./dados/arrayDeProdutos.js"
import { escreverInformacoesNoLocalStorage } from "./funcoes-adicionais/escreverInformacoesNoLocalStorage.js"
import { verificarSeTemAlgumaCategoria } from "./validacoes/verificarSeTemAlgumaCategoria.js"

const finalizarCompra = document.querySelector('#finalizarCompra')
verificarSeTemAlgumaCategoria()

finalizarCompra.addEventListener('click', (e) => {
    e.preventDefault()
    const caixaMensagemFinalizarCompra = gerarCaixaFinalizarCompra()
    document.body.appendChild(caixaMensagemFinalizarCompra)

    const btnCancelar = caixaMensagemFinalizarCompra.querySelector('#cancelar')
    const btnFinalizarCompra = caixaMensagemFinalizarCompra.querySelector('#finalizarCompra')

    btnFinalizarCompra.addEventListener('click', (e) => {
        e.preventDefault()
        const nomeDoMercado = e.target.closest('.caixa-finalizar-compra').querySelector('.caixa-finalizar-compra-input')
        const data = `${validarHoraData(new Date().getDate())}/${validarHoraData(new Date().getMonth() + 1)}/${new Date().getFullYear()}`
        const hora = `${validarHoraData(new Date().getHours())}:${validarHoraData(new Date().getMinutes())}:${validarHoraData(new Date().getSeconds())}`
        
        const objetoGerarLista = {
            nomeDoMercado: nomeDoMercado.value,
            listaDeProdutos: arrayEmOrdem(arrayDeProdutos[0]),
            data: data,
            hora: hora
        }

        arrayDeProdutos[1].push(objetoGerarLista)
        arrayDeProdutos[0] = []
        escreverInformacoesNoLocalStorage()
        window.location.href = '../pages/historicoDeCompras.html'

    })

    btnCancelar.addEventListener('click', (e) => {
        e.preventDefault()
        caixaMensagemFinalizarCompra.remove()
    })
})

function validarHoraData(numero){
    return numero <= 9 ? '0' + numero : numero
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