import { acharProdutoPeloId } from "./acharProdutoPeloId.js"
import { arrayDeCompras } from "./arrayDeCompras.js"
import { capitalizeFirstLetter } from "./capitalizeFirstLetter.js"
import { criarElemento } from "./criarElemento.js"
import { criarTarefaProduto } from "./criarTarefaProduto.js"
import { escreverInformacoesNoLocalStorage } from "./escreverNoLocalStorage.js"
import { formatarQuantidade } from "./formatarQuantidade.js"
import { verificarPrecoFinalDaCategoriaGeral, verificarPrecoFinalGeralCompra } from "./verificarPrecoFinalCategoria.js"
import { verificarSeTemAlgumaCategoria } from "./verificarSeTemAlgumaCategoria.js"

export function excluirLista(e) {
    const caixaDeMensagem = criarCaixaDeMensagem('Deseja realmente excluir essa categoria?')
    document.body.appendChild(caixaDeMensagem)
    const btnSim = caixaDeMensagem.querySelectorAll('button')[0]
    const btnNao = caixaDeMensagem.querySelectorAll('button')[1]
    const listaDeProdutos = e.target.closest('.conteudo-lista-item').querySelectorAll('ul li')
    const produtoAtual = e.target.closest('.conteudo-lista-item')
    btnSim.addEventListener('click', (e) => {
        e.preventDefault()
        const arrayDeId = []
        listaDeProdutos.forEach(produto => arrayDeId.push(produto.dataset.id))
    
        arrayDeId.forEach(id => {
            const produto = acharProdutoPeloId(id)
            arrayDeCompras[0].splice(produto, 1)
            escreverInformacoesNoLocalStorage()
        })
        // removendo visualmente
        produtoAtual.remove()
        verificarPrecoFinalDaCategoriaGeral()
        verificarPrecoFinalGeralCompra()
        verificarSeTemAlgumaCategoria()
        caixaDeMensagem.remove()
    })
    btnNao.addEventListener('click', (e) => {
        e.preventDefault()
        caixaDeMensagem.remove()
    })

}

export function excluirItemDaLista(e) {
    const caixaDeMensagem = criarCaixaDeMensagem('Deseja realmente excluir essa categoria?')
    document.body.appendChild(caixaDeMensagem)
    const btnSim = caixaDeMensagem.querySelectorAll('button')[0]
    const btnNao = caixaDeMensagem.querySelectorAll('button')[1]
    
    const produto = e.target.closest('.conteudo-lista-item-produto')
    const lista = e.target.closest('.conteudo-lista-item')
    btnSim.addEventListener('click', (e) => {
        e.preventDefault()
        const idProduto = produto.dataset.id
        arrayDeCompras[0].splice(acharProdutoPeloId(idProduto), 1)
        const qtdeDeProdutos = produto.closest('ul').querySelectorAll('li').length
        if (qtdeDeProdutos > 1) {
            produto.remove() // removendo visualmente
        } else {
            lista.remove() // removendo visualmente
        }
        verificarPrecoFinalDaCategoriaGeral()
        verificarPrecoFinalGeralCompra()
        verificarSeTemAlgumaCategoria()
        escreverInformacoesNoLocalStorage()
        caixaDeMensagem.remove()
    })

    btnNao.addEventListener('click', (e) => {
        e.preventDefault()
        caixaDeMensagem.remove()
    })
}

export function concluirProduto(e) {
    const produto = e.target.closest('.conteudo-lista-item-produto')
    const idProduto = produto.dataset.id
    const containerPrecoInserido = produto.querySelector('.p-precoInserido')
    const inserirPreco = produto.querySelector('.p-inserirPreco')

    if (produto.classList.contains('concluido')) {
        produto.classList.remove('concluido')
        containerPrecoInserido.style.backgroundColor = '#17025f'
        inserirPreco.style.backgroundColor = '#17025f'
    } else {
        produto.classList.add('concluido')
        containerPrecoInserido.style.backgroundColor = '#1ebe5e'
        inserirPreco.style.backgroundColor = '#1ebe5e'
    }

    if (arrayDeCompras[0][acharProdutoPeloId(idProduto)].itemPego) {
        arrayDeCompras[0][acharProdutoPeloId(idProduto)].itemPego = false
    } else {
        arrayDeCompras[0][acharProdutoPeloId(idProduto)].itemPego = true
    }

    escreverInformacoesNoLocalStorage()
}

export function alterarProduto(e, formulario, objetoProduto) {
    formulario.querySelector('#novaQuantidadeProduto').setAttribute('pattern', '(\\d+)(,|\\.)?(\\d+)?(un|g|kg)')
    const btnAlterar = e.target.parentElement
    const li = e.target.closest('.conteudo-lista-item-produto')
    const formularioAlterarTarefa = li.querySelector('.conteudo-alterar-produto')
    const selectNovaCategoria = formularioAlterarTarefa.querySelector('#novaCategoria')

    if (btnAlterar.classList.contains('active')) {
        ocultarFormulario(btnAlterar, formularioAlterarTarefa)
    } else {
        btnAlterar.classList.add('active')
        formularioAlterarTarefa.setAttribute('style', 'display: grid; animation: animarFormularioAlterarTarefaAbrir 0.6s ease;top: 0; position: relative;')
        const formulario = e.target.closest('.conteudo-lista-item-produto').querySelector('.conteudo-alterar-produto')
        const novoNomeProduto = formulario.querySelector('#novoNomeProduto')
        novoNomeProduto.focus()
        const novaQuantidadeProduto = formulario.querySelector('#novaQuantidadeProduto')
        const novaCategoria = formulario.querySelector('#novaCategoria')

        novoNomeProduto.value = objetoProduto.nome
        novaQuantidadeProduto.value = objetoProduto.quantidade
        let id
        selectNovaCategoria.querySelectorAll('option').forEach(option => {
            if (option.value === objetoProduto.categoria) {
                id = option.dataset.selected
            }
        })
        selectNovaCategoria.selectedIndex = id

        formulario.addEventListener('submit', (e) => {
            e.preventDefault()
            const inputNomeProduto = e.target.querySelector('#novoNomeProduto')
            const inputQuantidadeProduto = e.target.querySelector('#novaQuantidadeProduto')
            const categoria = e.target.querySelector('#novaCategoria')
            let quantidade = inputQuantidadeProduto.value.match(/(\d+)(,|\.)?(\d+)?/g)[0]
            let un = inputQuantidadeProduto.value.match(/un|g|kg/g)
            const quantidadeFormatada = formatarQuantidade(quantidade, un)

            const novoObjetoProduto = {
                nome: inputNomeProduto.value,
                quantidade: parseFloat(quantidadeFormatada),// vou ter que fazer alteração para quilo e grama
                un: un[0],
                categoria: categoria.value,
                id: objetoProduto.id,
                itemPego: objetoProduto.itemPego,
                preco: objetoProduto.preco,
                precoFinal: parseFloat(quantidadeFormatada) * objetoProduto.preco
            }
            arrayDeCompras[0][acharProdutoPeloId(objetoProduto.id)] = novoObjetoProduto
            alterarProdutoVisualmente(li, novoObjetoProduto, novaCategoria.value)
            ocultarFormulario(btnAlterar, formularioAlterarTarefa)
            escreverInformacoesNoLocalStorage()
        })
    }

}

function ocultarFormulario(btnAlterar, formularioAlterarTarefa) {
    btnAlterar.classList.remove('active')
    formularioAlterarTarefa.setAttribute('style', 'display: none; animation: animarFormularioAlterarTarefaFechar 0.6s ease;top: 0; position: absolute;')
}

function alterarProdutoVisualmente(li, novoObjetoProduto, novaCategoria) {
    console.log(novoObjetoProduto)
    const categoriaAntiga = li.closest('.conteudo-lista-item').dataset.categoria
    if (novaCategoria === categoriaAntiga) {
        const quantidade = li.querySelector('.p-quantidade')
        if (novoObjetoProduto.un == 'kg' || novoObjetoProduto.un == 'g') {
            quantidade.innerHTML = `${(novoObjetoProduto.quantidade).toFixed(3)}${novoObjetoProduto.un}`
        } else {
            quantidade.innerHTML = `${novoObjetoProduto.quantidade}${novoObjetoProduto.un}`
        }
        const produto = li.querySelector('.p-produto')
        const containerPreco = li.querySelectorAll('.p-precoInserido p')
        containerPreco[0].innerHTML = `${novoObjetoProduto.quantidade}${novoObjetoProduto.un} x R$${novoObjetoProduto.preco.toFixed(2)}`
        containerPreco[1].innerHTML = `R$${novoObjetoProduto.precoFinal.toFixed(2)}`
        produto.innerHTML = capitalizeFirstLetter(novoObjetoProduto.nome.split(' ')).join(' ')
    } else {
        criarTarefaProduto(novoObjetoProduto)
        const listaCategoriaAntiga = document.querySelectorAll(`[data-categoria="${categoriaAntiga}"] ul li`)
        if (listaCategoriaAntiga.length > 1) {
            li.remove()
        } else {
            document.querySelector(`[data-categoria="${categoriaAntiga}"]`).remove()
        }

        verificarPrecoFinalDaCategoriaGeral()
        verificarPrecoFinalGeralCompra()
        console.log('vou mudar')
    }
}

function criarCaixaDeMensagem(mensagem) {
    const div = criarElemento('div', '', 'caixa-mensagem')
    const p = criarElemento('p', mensagem, 'caixa-mensagem-texto')
    const btnSim = criarElemento('button', 'Sim', 'caixa-mensagem-btn')
    const btnNao = criarElemento('button', 'Nao', 'caixa-mensagem-btn')
    div.appendChild(p)
    div.appendChild(btnSim)
    div.appendChild(btnNao)
    return div
}