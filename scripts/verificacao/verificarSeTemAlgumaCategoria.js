export function verificarSeTemAlgumaCategoria(){
    const btnFinalizarCompra = document.querySelector('.conteudo-lista-salvarCompra')
    const listaDeCategorias = document.querySelectorAll('.conteudo-lista .conteudo-lista-item')
    if(listaDeCategorias.length > 0){
        btnFinalizarCompra.style.display = 'flex'
    }else{
        btnFinalizarCompra.style.display = 'none'
    }
}
