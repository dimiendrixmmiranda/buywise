import { criarElemento } from "./criarElemento.js"
import { arrayDeProdutos } from "../dados/arrayDeProdutos.js"
import { acharProdutoPeloIdentificador } from "../funcoes-adicionais/acharProdutoPeloIdentificador.js"
import { escreverInformacoesNoLocalStorage } from "../funcoes-adicionais/escreverInformacoesNoLocalStorage.js"
import { transformarPrimeiraLetraEmMaiuscula } from "../funcoes-adicionais/transformarPrimeiraLetraEmMaiuscula.js"
import { validarQuantidade } from "../validacoes/validarQuantidade.js"
import { verificarPrecoFinalDeCadaCategoria } from "../validacoes/verificarPrecoFinalDeCadaCategoria.js"
import { alterarPrecoProduto } from "./alterarPrecoProduto.js"
import { criarNovaCategoria } from "./criarNovaCategoria.js"
import { criarNovoProduto } from "./criarNovoProduto.js"
import { inserirPrecoNoProduto } from "./inserirPrecoNoProduto.js"

const listaDeCategorias = document.querySelector('#listaDeCategorias')
export function alterarProduto(e, objetoProduto) {
    e.preventDefault()
    const li = e.target.closest('.conteudo-lista-item-produto')
    const divPrecoInserido = li.querySelector('.p-precoInserido')
    const divInserirPreco = li.querySelector('.p-inserirPreco')

    if (li.classList.contains('form-active')) {
        li.classList.remove('form-active')
        li.querySelector('.conteudo-alterar-produto').remove()
    } else {
        li.classList.add('form-active')
        const formulario = gerarFormulario(objetoProduto)
        li.appendChild(formulario)

        formulario.addEventListener('submit', (e) => {
            e.preventDefault()
            const listaDeUlCategorias = document.querySelectorAll('.conteudo-lista-item ul')
            const inputNomeProduto = e.target.querySelector('#novoNomeProduto')
            const inputQuantidadeProduto = e.target.querySelector('#novaQuantidadeProduto')
            const inputCategoriaProduto = e.target.querySelector('#novaCategoria')
            const quantidade = validarQuantidade(inputQuantidadeProduto).split(/(un|kg|g)/gi)

            const novoObjetoProduto = {
                nome: inputNomeProduto.value,
                quantidade: parseFloat(quantidade[0].replace(',', '.')),
                un: quantidade[1],
                categoria: inputCategoriaProduto.value,
                id: objetoProduto.id,
                itemPego: objetoProduto.itemPego,
                preco: objetoProduto.preco,
                precoFinal: objetoProduto.precoFinal
            }
            arrayDeProdutos[0][acharProdutoPeloIdentificador(novoObjetoProduto.id)] = novoObjetoProduto
            escreverInformacoesNoLocalStorage()
            
            inserirPrecoNoProduto(e, novoObjetoProduto, divPrecoInserido, li, false)
            if(!(novoObjetoProduto.preco != 0)){
                divPrecoInserido.style.display = 'none'
            }

            if (novoObjetoProduto.categoria == objetoProduto.categoria) {
                li.querySelector('.p-quantidade').innerHTML = `${novoObjetoProduto.quantidade}${novoObjetoProduto.un}`
                li.querySelector('.p-produto').innerHTML = transformarPrimeiraLetraEmMaiuscula(novoObjetoProduto.nome)
            } else {
                const categoria = document.querySelector(`[data-categoria="${novoObjetoProduto.categoria}"]`)
                const produto = criarNovoProduto(novoObjetoProduto)

                if (categoria) {
                    categoria.querySelector('ul').appendChild(produto)
                } else {
                    const novaCategoria = criarNovaCategoria(novoObjetoProduto)
                    novaCategoria.querySelector('ul').appendChild(produto)
                    listaDeCategorias.appendChild(novaCategoria)
                }
                li.remove()
            }
            arrayDeProdutos[0][acharProdutoPeloIdentificador(novoObjetoProduto.id)] = novoObjetoProduto
            formulario.remove()
            escreverInformacoesNoLocalStorage()
            li.classList.remove('form-active')

            // Verificando se tem algum item dentro da lista
            listaDeUlCategorias.forEach(ul => {
                if (ul.innerHTML == '') {
                    ul.closest('.conteudo-lista-item').remove()
                }
            })
            verificarPrecoFinalDeCadaCategoria()
        })
    }
    verificarPrecoFinalDeCadaCategoria()
}

function gerarFormulario(objetoProduto) {
    const formulario = criarElemento('form', '', 'conteudo-alterar-produto')

    const fieldsetNovoProduto = criarElemento('fieldset', '', 'novo-nome-produto')
    const labelNovoProduto = criarElemento('label', 'Novo nome do produto:')
    labelNovoProduto.setAttribute('for', 'novoNomeProduto')
    const inputNovoProduto = criarElemento('input', '', '', 'novoNomeProduto', 'text')
    inputNovoProduto.value = `${transformarPrimeiraLetraEmMaiuscula(objetoProduto.nome)}`
    inputNovoProduto.setAttribute('autocomplete', 'off')
    fieldsetNovoProduto.appendChild(labelNovoProduto)
    fieldsetNovoProduto.appendChild(inputNovoProduto)

    const fieldsetQuantidadeProduto = criarElemento('fieldset', '', 'novo-quantidade-produto')
    const labelNovaQuantidade = criarElemento('label', 'QTDE')
    labelNovaQuantidade.setAttribute('for', 'novaQuantidadeProduto')
    const inputNovaQuantidade = criarElemento('input', '', '', 'novaQuantidadeProduto', 'text')
    inputNovaQuantidade.value = `${objetoProduto.quantidade}${objetoProduto.un}`
    inputNovaQuantidade.setAttribute('autocomplete', 'off')
    fieldsetQuantidadeProduto.appendChild(labelNovaQuantidade)
    fieldsetQuantidadeProduto.appendChild(inputNovaQuantidade)

    const novoCategoriaProduto = criarElemento('fieldset', '', 'novo-categoria-produto')
    const labelNovaCategoria = criarElemento('label', 'Nova Categoria:')
    labelNovaCategoria.setAttribute('for', 'novaQuantidadeProduto')

    const selectCategoria = criarElemento('select', '<option data-selected="0">Selecione</option><option value="produtos-gerais" data-selected="1">Produtos Gerais</option><option value="carnes" data-selected="2">Carnes</option><option value="frutas-verduras" data-selected="3">Frutas/Verduras</option><option value="bebidas" data-selected="4">Bebidas</option><option value="produtos-de-limpeza" data-selected="5">Produtos de Limpeza</option><option value="higiene-pessoal" data-selected="6">Higiene Pessoal</option><option value="padaria" data-selected="7">Padaria</option><option value="petshop" data-selected="8">PetShop</option><option value="utensilios-domesticos" data-selected="9">Utensílios Domésticos</option>', '', 'novaCategoria')
    novoCategoriaProduto.appendChild(labelNovaCategoria)
    novoCategoriaProduto.appendChild(selectCategoria)

    const btnSalvarAlterarcao = criarElemento('button', 'Salvar Alteração', 'salvar-alteracao-produto')
    formulario.appendChild(fieldsetNovoProduto)
    formulario.appendChild(fieldsetQuantidadeProduto)
    formulario.appendChild(novoCategoriaProduto)
    formulario.appendChild(btnSalvarAlterarcao)
    return formulario
}