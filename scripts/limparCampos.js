export function limparCampos(arrayInputs){
    arrayInputs.forEach(arrayInput => {
        arrayInput[0].value = `${arrayInput[1]}` 
    });
    arrayInputs[0][0].focus()
}