import { arrayDeCompras } from "./arrayDeCompras.js";

export function escreverInformacoesNoLocalStorage() {
    localStorage.setItem("compras", JSON.stringify(arrayDeCompras))
}
