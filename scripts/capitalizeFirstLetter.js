export function capitalizeFirstLetter(arrayString) {
    const array = []
    arrayString.forEach(palavra => {
        array.push(palavra.charAt(0).toUpperCase() + palavra.slice(1))
    });
    return array
}