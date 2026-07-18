/**
 * Permet de mélenger un tableau aléatoirement
 * @param {*} arr 
 * @returns 
 */
export function shuffleArray(arr) {
    return arr.map(item => ({value: item, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(item => item.value) // Extrait la valeur original
}