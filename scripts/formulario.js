import { criarTarefaProduto } from "./criarTarefaProduto.js"
import { gerarId } from "./gerarId.js"
import { limparCampos } from "./limparCampos.js"

const formulario = document.querySelector('#formulario')
formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const inputProduto = e.target.querySelector('#produto')
    const inputQuantidade = e.target.querySelector('#quantidade')
    const inputCategoria = e.target.querySelector('#categoria')
    
    const objetoProduto = {
        nome: inputProduto.value,
        quantidade: inputQuantidade.value,
        categoria: inputCategoria.value,
        id: gerarId(),
        itemPego: false
    }

    criarTarefaProduto(objetoProduto)

    limparCampos([[inputProduto, ''], [inputQuantidade, ''], [inputCategoria, 'Selecione']])
})