export function gerarId() {
    const array = []
    for (let i = 0; i < 6; i++) {
        const numero = Math.floor(Math.random() * 10)
        array.push(numero)
    }
    return array.join('')
}