export function validarQuantidade(inputQuantidade) {
    const valorQuantidade = inputQuantidade.value.replace(',', '.')
    let valorFinalQuantidade

    if (!valorQuantidade.match(/(g|kg|un)/g)) {
        if (valorQuantidade.match(/(\.|,)/g)) {
            valorFinalQuantidade = `${valorQuantidade}kg`
            return valorFinalQuantidade
        } else {
            valorFinalQuantidade = `${valorQuantidade}un`
            return valorFinalQuantidade
        }
    } else {
        if (valorQuantidade.match(/(kg)/gi)) {
            valorFinalQuantidade = `${valorQuantidade.split('kg')[0]}kg`
            return valorFinalQuantidade
        } else if (valorQuantidade.match(/(g)/gi)) {
            valorFinalQuantidade = `${valorQuantidade.split('g')[0] / 1000}g`
            return valorFinalQuantidade
        }else if (valorQuantidade.match(/(un)/gi)) {
            valorFinalQuantidade = valorQuantidade
            return valorFinalQuantidade
        }
    }
}