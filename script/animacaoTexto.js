const textoContainerFormulario = document.querySelector('#containerFormularioTexto')

export function animarTextoContainerFormulario() {
    const textoArray = textoContainerFormulario.innerHTML.split('')
    textoContainerFormulario.innerHTML = ''
    textoArray.forEach((letra, i) => {
        setTimeout(() => {
            textoContainerFormulario.innerHTML += letra
        }, 75 * i);
    })
}