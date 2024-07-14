const btnBars = document.querySelector('#btnBars')
const offcanvas = document.querySelector('#offcanvas')
const offcanvasBarsBtnFechar = document.querySelector('#offcanvasBtnFechar')

btnBars.addEventListener('click', fadeIn)
offcanvasBarsBtnFechar.addEventListener('click', fadeOut)

function fadeIn(){
    offcanvas.setAttribute('style', 'animation: offcanvasAbrir 0.6s ease; left: 20%;display:grid')
}

function fadeOut(){
    offcanvas.style.display = 'none'
    offcanvas.style.left = '100%'
    offcanvas.setAttribute('style', 'animation: offcanvasFechar 0.6s ease; left: 100%;display:none')
}