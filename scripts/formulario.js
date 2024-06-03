import { arrayDeCompras } from "./arrayDeCompras.js"
import { criarTarefaProduto } from "./criarTarefaProduto.js"
import { escreverInformacoesNoLocalStorage } from "./escreverNoLocalStorage.js"
import { gerarId } from "./gerarId.js"
import { limparCampos } from "./limparCampos.js"

const formulario = document.querySelector('#formulario')
arrayDeCompras[0].forEach(produto => {
    criarTarefaProduto(produto)
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputProduto = e.target.querySelector('#produto')
    // indentificar se é unidade, grama o kilograma no Input quantidade
    const inputQuantidade = e.target.querySelector('#quantidade')
    const inputCategoria = e.target.querySelector('#categoria')

    const objetoProduto = {
        nome: inputProduto.value,
        quantidade: parseFloat(inputQuantidade.value),
        categoria: inputCategoria.value,
        id: gerarId(),
        itemPego: false,
        preco: 0, 
        precoFinal: 0
    }
    arrayDeCompras[0].push(objetoProduto)
    criarTarefaProduto(objetoProduto)
    escreverInformacoesNoLocalStorage()
    limparCampos([[inputProduto, ''], [inputQuantidade, ''], [inputCategoria, 'Selecione']])
})