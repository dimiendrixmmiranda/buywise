import { arrayDeProdutos } from "../dados/arrayDeProdutos.js";

export function escreverInformacoesNoLocalStorage() {
    localStorage.setItem("compras", JSON.stringify(arrayDeProdutos))
}
