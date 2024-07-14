export function criarElemento(tag, conteudo = '', classe = '', id = '', type = ''){
    const elemento = document.createElement(tag)

    if(conteudo){
        elemento.innerHTML = conteudo
    }
    if(classe){
        elemento.classList.add(classe)
    }
    if(id){
        elemento.id = id
    }
    if(type){
        elemento.setAttribute('type', type)
    }

    return elemento
}