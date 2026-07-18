import { useCallback, useState } from "react"

export function useIncrement({initial = 0, max = Infinity, min= -Infinity}) {
    const [state, setState] = useState(initial)
    return {
        count: state,
        increment: useCallback(() => setState(v => v < max ? v + 1 : v), [max]),
        decrement: useCallback(() => setState(v => v > min ? v - 1 : v), [min]) // L'objectif est de ne pas recréer cette fonction à chaque si rien n'a changer, mais de rendre le calcule
    }
}