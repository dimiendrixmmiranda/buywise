const listaDeQualidades = [
  `<i class="fa-solid fa-circle"></i> Organização Eficiente: Permite organizar e acompanhar as compras, marcando itens como concluídos.`,
  `<i class="fa-solid fa-circle"></i> Gerenciamento de Preços: Possibilita adicionar preços aos itens, ajudando a controlar os gastos.`,
  `<i class="fa-solid fa-circle"></i> Registro de Local e Data: Armazena o nome do mercado e a data da compra, facilitando a análise de onde e quando as compras foram feitas.`,
  `<i class="fa-solid fa-circle"></i> Histórico de Compras: Mantém um histórico das listas de compras, útil para revisar padrões de compra e planejamento futuro.`,
  `<i class="fa-solid fa-circle"></i> Personalização: Os usuários podem criar listas personalizadas, adaptando o aplicativo às suas necessidades específicas.`,
//   `<i class="fa-solid fa-circle"></i> Acompanhamento de Orçamento: Com a função de preços, os usuários podem monitorar e comparar os gastos em diferentes mercados e datas.`,
//   `<i class="fa-solid fa-circle"></i> Simplicidade e Usabilidade: Interface intuitiva que facilita o uso, mesmo para usuários menos experientes em tecnologia.`,
//   `<i class="fa-solid fa-circle"></i> Eficiência de Tempo: A função de marcar itens como concluídos ajuda a garantir que nada seja esquecido durante as compras.`,
//   `<i class="fa-solid fa-circle"></i> Acessibilidade de Dados: Acesso fácil e rápido às listas e ao histórico de compras, seja para consulta ou planejamento.`,
//   `<i class="fa-solid fa-circle"></i> Segurança e Privacidade: Proteção dos dados dos usuários, garantindo que informações pessoais e de compra estejam seguras.`
]

const conteudoFuncionalidadesLista = document.querySelector('.conteudo-funcionalidades-lista')
listaDeQualidades.forEach(qualidade => {
    const li = document.createElement('li')
    li.innerHTML = qualidade
    conteudoFuncionalidadesLista.appendChild(li)
})