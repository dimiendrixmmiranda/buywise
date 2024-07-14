import { acharProdutoPeloId } from "./acharProdutoPeloId.js"
import { arrayDeCompras } from "./arrayDeCompras.js"
import { capitalizeFirstLetter } from "./capitalizeFirstLetter.js"
import { criarElemento } from "./criarElemento.js"
import { criarTarefaProduto } from "./criarTarefaProduto.js"
import { escreverInformacoesNoLocalStorage } from "./escreverNoLocalStorage.js"
import { formatarQuantidade } from "./formatarQuantidade.js"
import { verificarSeTemAlgumaCategoria } from "./verificacao/verificarSeTemAlgumaCategoria.js"



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

