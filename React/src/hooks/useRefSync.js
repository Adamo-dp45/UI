import { useRef } from "react"

/**
 * 
 * @param {*} data 
 * @returns 
 */
export function useRefSync(data) {
    const dataRef = useRef(data)
    dataRef.current = dataRef
    return dataRef
} // A chaque fois qu'on a un nouveau rendu du composant je maintient syncornisé la valeur de current