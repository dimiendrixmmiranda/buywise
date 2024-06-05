// const fraseFuncionalidade = document.querySelector('#fraseFuncionalidade')

// const fraseTeste = 'Permita'

// function escreverLetra(frase, tempo = 0) {
//     const arrayFrase = frase.split('')
//     let i = 0
//     return new Promise(function (resolve) {
//         setTimeout(() => {
//             const intervalo = setInterval(() => {
//                 if (i <= arrayFrase.length - 1) {
//                     fraseFuncionalidade.innerHTML += arrayFrase[i]
//                     i++
//                 } else {
//                     clearInterval(intervalo)
//                 }
//             }, 500);
//             resolve()
//         }, tempo);
//     })
// }


// function removerLetra(elemento, tempo) {
//     const arrayFrase = elemento.innerHTML.split('')
//     return new Promise(function (resolve) {
//         setTimeout(() => {
//             const intervalo = setInterval(() => {
//                 if (arrayFrase.length >= 1) {
//                     arrayFrase.pop()
//                     console.log(arrayFrase)
//                     elemento.innerHTML = arrayFrase.join('')
//                 } else {
//                     console.log('fim')
//                     clearInterval(intervalo)
//                 }
//             }, 500);
//             resolve()
//         }, tempo);
//     })
// }

// async function executarFuncoes(fraseTeste, fraseFuncionalidade) {
//     await escreverLetra(fraseTeste, 0)
//     console.log('async 1')

//     // await escreverLetra(fraseTeste, fraseTeste.length * 500)
//     await removerLetra(fraseFuncionalidade, fraseTeste.length * 500)
//     console.log('async 2')
// }

// executarFuncoes(fraseTeste, fraseFuncionalidade)