import { criarElemento } from "./criarElemento.js"

export function gerarCaixaMensagem(mensagem) {
    const div = criarElemento('div', '', 'caixa-mensagem')
    const p = criarElemento('p', mensagem, 'caixa-mensagem-texto')
    const btnSim = criarElemento('button', 'Sim', 'caixa-mensagem-btn', 'sim')
    const btnNao = criarElemento('button', 'Nao', 'caixa-mensagem-btn', 'nao')
    div.appendChild(p)
    div.appendChild(btnSim)
    div.appendChild(btnNao)
    return div
}