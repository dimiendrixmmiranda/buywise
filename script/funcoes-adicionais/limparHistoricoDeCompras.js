import { gerarCaixaMensagem } from "../crud/gerarCaixaMensagem.js"
import { arrayDeProdutos } from "../dados/arrayDeProdutos.js"
import { escreverInformacoesNoLocalStorage } from "../funcoes-adicionais/escreverInformacoesNoLocalStorage.js"

export function limparHistoricoDeCompras(){
    const btnLimparHistoricoCompras = document.querySelector('#btnLimparHistoricoCompras')

    btnLimparHistoricoCompras.addEventListener('click', (e) => {
        e.preventDefault()
        const caixaDeMensagem = gerarCaixaMensagem('Deseja Realmente apagar o histórico de compras?')
        document.body.appendChild(caixaDeMensagem)

        caixaDeMensagem.querySelector('#sim').addEventListener('click', (e) => {
            e.preventDefault()
            arrayDeProdutos[1] = []
            escreverInformacoesNoLocalStorage()
            window.location.reload(true)
        })
        caixaDeMensagem.querySelector('#nao').addEventListener('click', (e) => {
            e.preventDefault()
            e.target.closest('.caixa-mensagem').remove()
        })
        console.log(btnLimparHistoricoCompras)
    })
}