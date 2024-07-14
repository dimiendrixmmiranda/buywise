import { criarElemento } from "./crud/criarElemento.js";
import { arrayDeProdutos } from "./dados/arrayDeProdutos.js";

const historicoDeComprasLista = document.querySelector('#historicoDeComprasLista')

arrayDeProdutos[1].forEach(objetoCompra => {
    const liCompra = criarListaCompra(objetoCompra)
    historicoDeComprasLista.appendChild(liCompra)
})

function criarListaCompra(objetoCompra) {
    const li = criarElemento('li', '', 'historico-de-compras-lista-item')
    const botaoCompra = criarBotaoCompra(objetoCompra)
    botaoCompra.addEventListener('click', (e) => {
        e.preventDefault()
        const elementoHistoricoCompras = e.target.closest('.historico-de-compras-lista-item').querySelector('.historico-de-compras-lista-item-tabela')

        const btn = e.target.closest('.historico-de-compras-lista-item').querySelector('.historico-de-compras-lista-item-botao div')

        if (elementoHistoricoCompras.classList.contains('active')) {
            elementoHistoricoCompras.classList.remove('active')
            btn.setAttribute('style', 'rotate: 0deg;transition: .6s ease;')
        } else {
            elementoHistoricoCompras.classList.add('active')
            btn.setAttribute('style', 'rotate: 180deg;transition: .6s ease;')
        }
    })
    const historicoComprasTabela = criarHistoricoDeComprasTabela(objetoCompra)
    let precoFinal = 0
    objetoCompra.listaDeProdutos.forEach(item => {
        precoFinal += item.map(produto => produto.precoFinal).reduce((a, b) => a + b)
    })
    const precoFinalDaCategoria = criarElemento('div')
    const p1 = criarElemento('p', 'Preço Final da Compra:')
    const p2 = criarElemento('p', `R$${precoFinal.toFixed(2)}`)
    precoFinalDaCategoria.appendChild(p1)
    precoFinalDaCategoria.appendChild(p2)
    
    li.appendChild(botaoCompra)
    li.appendChild(historicoComprasTabela)

    li.querySelector('.historico-de-compras-lista-item-tabela').appendChild(precoFinalDaCategoria)
    return li
}

function criarBotaoCompra(objetoCompra) {
    const btn = criarElemento('button', '', 'historico-de-compras-lista-item-botao')
    const p1 = criarElemento('p', `Compra do dia ${objetoCompra.data}-${objetoCompra.hora}`)
    const p2 = criarElemento('p', `${objetoCompra.nomeDoMercado}`)
    const div = criarElemento('div', '<i class="fa-solid fa-sort-down"></i>')
    btn.appendChild(p1)
    btn.appendChild(p2)
    btn.appendChild(div)

    return btn
}

function criarHistoricoDeComprasTabela(objetoCompra) {
    const historicoComprasTabela = criarElemento('div', '', 'historico-de-compras-lista-item-tabela')
    const ul = criarElemento('ul')

    objetoCompra.listaDeProdutos.forEach(listaCategoria => {
        const li = criarElemento('li', '', 'historico-de-compras-lista-item-tabela-item')
        const h4 = criarElemento('h4', (listaCategoria[0].categoria).replace('-', ' '))

        const tabela = criarTabela(listaCategoria)
        li.appendChild(h4)
        li.appendChild(tabela)
        ul.appendChild(li)
    })

    historicoComprasTabela.appendChild(ul)
    return historicoComprasTabela
}

function criarTabela(listaCategoria) {
    const tabela = criarElemento('table', '')
    const thead = criarElemento('thead')
    const trThead = criarElemento('tr')
    const tdNome = criarElemento('td', 'Nome')
    const tdQuantidade = criarElemento('td', 'QTDE')
    const tdPreco = criarElemento('td', 'Preco')
    const tdPrecoFinal = criarElemento('td', 'Preco Final')
    trThead.appendChild(tdNome)
    trThead.appendChild(tdQuantidade)
    trThead.appendChild(tdPreco)
    trThead.appendChild(tdPrecoFinal)

    thead.appendChild(trThead)

    const tbody = criarElemento('tbody')
    listaCategoria.forEach(item => {
        const tr = criarElemento('tr')
        const tdNome = criarElemento('td', item.nome)
        const tdQuantidade = criarElemento('td', item.quantidade)
        const tdPreco = criarElemento('td', `R$${item.preco.toFixed(2)}`)
        const tdPrecoFinal = criarElemento('td', `R$${item.precoFinal.toFixed(2)}`)
        tr.appendChild(tdNome)
        tr.appendChild(tdQuantidade)
        tr.appendChild(tdPreco)
        tr.appendChild(tdPrecoFinal)
        tbody.appendChild(tr)
    })
    const precoFinal = listaCategoria.map(item => item.precoFinal).reduce((a, b) => a + b)

    const trPrecoFinal = criarElemento('tr')
    const td1 = criarElemento('td', 'Preço final da categoria:')
    trPrecoFinal.appendChild(td1)
    const td2 = criarElemento('td', `R$${precoFinal.toFixed(2)}`)
    trPrecoFinal.appendChild(td2)
    tbody.appendChild(trPrecoFinal)

    tabela.appendChild(thead)
    tabela.appendChild(tbody)
    return tabela
}