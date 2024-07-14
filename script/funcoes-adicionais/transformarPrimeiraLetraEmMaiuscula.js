export function transformarPrimeiraLetraEmMaiuscula(string, separador) {
    const array = []
    string.split(separador).forEach(palavra => {
        array.push(palavra.charAt(0).toUpperCase() + palavra.slice(1))
    });
    return array.join(' ')
}