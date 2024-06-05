export function formatarQuantidade(quantidade, un) {
    let novaQuantidade

    const arrayQuantidade = quantidade.split('') 

    if (un == 'g') {
        if (quantidade < 1000 && arrayQuantidade[0] != 0) {
            novaQuantidade = `0.${quantidade}`
        }else if(quantidade > 1000 && arrayQuantidade.length <= 4){
            novaQuantidade = `${arrayQuantidade[0]}.${arrayQuantidade[1]}${arrayQuantidade[2]}${arrayQuantidade[3]}`
        }else if(arrayQuantidade[0] == '0'){
            novaQuantidade = quantidade
        }
    } else if (un == 'kg') {
        novaQuantidade = quantidade.replace(',', '.')
    }
    return parseFloat(novaQuantidade)
}