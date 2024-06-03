// Primeiro array vai armazenar os itens da compra atual, o segundo vai armazenar o histórico de compras
export const arrayDeCompras = JSON.parse(localStorage.getItem("compras")) || [[], []]