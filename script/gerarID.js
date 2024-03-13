export function gerarID(){
    const array = []

    for (let i = 0; i <= 5; i++) {
        const numero = (Math.random() * 9).toFixed(0)
        array.push(numero)
    }

    return array.join('')
}