import { arrayDeCompras } from "./arrayDeCompras.js";

export function acharProdutoPeloId(idElemento){
    return arrayDeCompras[0].findIndex(el => el.id === idElemento)
}
