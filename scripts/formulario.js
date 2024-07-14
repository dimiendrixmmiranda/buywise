import { arrayDeCompras } from "./arrayDeCompras.js"
import { criarTarefaProduto } from "./criarTarefaProduto.js"
import { escreverInformacoesNoLocalStorage } from "./escreverNoLocalStorage.js"
import { formatarQuantidade } from "./formatarQuantidade.js"
import { gerarId } from "./gerarId.js"
import { limparCampos } from "./limparCampos.js"
import { verificarPrecoFinalDeTodasAsCategorias } from "./verificacao/verificarPrecoFinalDaCategoria.js"
import { verificarPrecoFinalGeralCompra } from "./verificacao/verificarPrecoFinalDaCompra.js"
import { verificarSeTemAlgumaCategoria } from "./verificacao/verificarSeTemAlgumaCategoria.js"

const formulario = document.querySelector('#formulario')
arrayDeCompras[0].forEach(produto => {
    criarTarefaProduto(produto)
});
verificarPrecoFinalDeTodasAsCategorias()
verificarPrecoFinalGeralCompra()
verificarSeTemAlgumaCategoria()

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputProduto = e.target.querySelector('#produto')
    // indentificar se é unidade, grama o kilograma no Input quantidade
    const inputQuantidade = e.target.querySelector('#quantidade')
    const inputCategoria = e.target.querySelector('#categoria')
    let quantidade = inputQuantidade.value.match(/(\d+)(,|\.)?(\d+)?/g)[0]
    let un = inputQuantidade.value.match(/un|g|kg/g)
    const quantidadeFormatada = formatarQuantidade(quantidade, un)
    const objetoProduto = {
        nome: inputProduto.value,
        quantidade: parseFloat(quantidadeFormatada),
        un: un[0],
        categoria: inputCategoria.value,
        id: gerarId(),
        itemPego: false,
        preco: 0,
        precoFinal: 0
    }
    if (objetoProduto.categoria != 'Selecione') {
        arrayDeCompras[0].push(objetoProduto)
        criarTarefaProduto(objetoProduto)
        escreverInformacoesNoLocalStorage()
        verificarSeTemAlgumaCategoria()
        limparCampos([[inputProduto, ''], [inputQuantidade, ''], [inputCategoria, 'Selecione']])
    } else {
        alert('Selecione a categoria')
    }
})