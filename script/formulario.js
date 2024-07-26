import { validarQuantidade } from "./validacoes/validarQuantidade.js"
import { gerarIdentificador } from "./funcoes-adicionais/gerarIdentificador.js"
import { gerarProdutosDaLista } from "./crud/gerarProdutosDaLista.js"
import { arrayDeProdutos } from "./dados/arrayDeProdutos.js"
import { escreverInformacoesNoLocalStorage } from "./funcoes-adicionais/escreverInformacoesNoLocalStorage.js"
import { verificarPrecoFinalDeCadaCategoria } from "./validacoes/verificarPrecoFinalDeCadaCategoria.js"
import { verificarSeTemAlgumaCategoria } from "./validacoes/verificarSeTemAlgumaCategoria.js"

const formulario = document.querySelector('#formulario')

arrayDeProdutos[0].forEach(produto => {
    gerarProdutosDaLista(produto)
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputProduto = e.target.querySelector('#produto')
    const inputQuantidade = e.target.querySelector('#quantidade')
    const inputCategoria = e.target.querySelector('#categoria')
    const quantidade = validarQuantidade(inputQuantidade).split(/(un|kg|g)/gi)
    
    const objetoProduto = {
        nome: inputProduto.value,
        quantidade: parseFloat(quantidade[0].replace(',', '.')),
        un: quantidade[1],
        categoria: inputCategoria.value,
        id: gerarIdentificador(),
        itemPego: false,
        preco: 0,
        precoFinal: 0
    }

    if (objetoProduto.categoria != 'Selecione') {
        arrayDeProdutos[0].push(objetoProduto)
        gerarProdutosDaLista(objetoProduto)
        escreverInformacoesNoLocalStorage()
        // verificarSeTemAlgumaCategoria()
        limparCampos([[inputProduto, ''], [inputQuantidade, ''], [inputCategoria, 'Selecione']])
    } else {
        alert('Selecione a categoria')
    }
    verificarSeTemAlgumaCategoria()
})

verificarPrecoFinalDeCadaCategoria()
function limparCampos(array){
    array.forEach(input => {
        input[0].value = input[1]
    })
}