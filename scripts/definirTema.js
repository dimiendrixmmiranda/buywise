const inputToggle = document.querySelectorAll('#alterarTema')
const elementoOffcanvas = document.querySelector('#offcanvas')

inputToggle.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const input = e.target
        const tema = input.dataset.tema
        console.log(input.dataset)
        if(tema == 'dark'){
            input.dataset.tema = 'light'
            document.body.dataset.tema = 'light'
            elementoOffcanvas.classList.remove('dark')
            elementoOffcanvas.classList.add('light')
        }else{
            input.dataset.tema = 'dark'
            document.body.dataset.tema = 'dark'
            elementoOffcanvas.classList.remove('light')
            elementoOffcanvas.classList.add('dark')
        }
    })
})