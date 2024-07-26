export function verificarSeTemAlgumaCategoria() {
    const finalizarCompra = document.querySelector('#finalizarCompra')
    const listaDeCategorias = document.querySelectorAll('.conteudo-lista-item')
    if (listaDeCategorias.length <= 0) {
        finalizarCompra.setAttribute('style', 'display: none;')
    } else {
        finalizarCompra.setAttribute('style', 'display: flex;')
    }
}