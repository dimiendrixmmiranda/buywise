import { arrayDeProdutos } from "../dados/arrayDeProdutos.js";

export function acharProdutoPeloIdentificador(idElemento){
    return arrayDeProdutos[0].findIndex(el => el.id === idElemento)
}
