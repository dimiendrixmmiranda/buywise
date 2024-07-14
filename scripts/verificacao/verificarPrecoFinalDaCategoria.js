export function verificarPrecoFinalDeTodasAsCategorias() {
    const arrayDeCategorias = []
    document.querySelectorAll('.conteudo-lista .conteudo-lista-item').forEach(categoria => arrayDeCategorias.push(categoria.dataset.categoria))
    arrayDeCategorias.forEach(categoria => {
        const valorFinalDeCadaCategoria = arrayDeCompras[0].filter(produto => produto.categoria === categoria).map(produto => produto.precoFinal).reduce((a, b) => a + b, 0)
        const elementoValorFinal = document.querySelector(`[data-categoria="${categoria}"] #precoFinal`)
        elementoValorFinal.innerHTML = `R$${valorFinalDeCadaCategoria.toFixed(2)}`
    })
}