export function alterarProduto(e, formulario, objetoProduto) {
    console.log(objetoProduto)
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
        novaQuantidadeProduto.value = `${objetoProduto.quantidade}${objetoProduto.un}`
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
            console.log(quantidade)
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
        escreverInformacoesNoLocalStorage()
    }

}