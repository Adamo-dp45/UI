import { createContext, useCallback, useContext, useState, type PropsWithChildren } from "react"

type ContextProps = {
    n: number,
    incr: () => void
}

const CounterContext = createContext<null | ContextProps>(null) // Si on sait qu'on vas toujours utilisé notre context on peut ne pas lui mettre une valeur par défaut 
/*
    const CounterContext = createContext({
        n: 0, -- On peut '.. as number'
        incr: () => {}
    })
*/

type Props = PropsWithChildren<{
    start?: number 
}>

export const CounterProvider = ({start = 0, children}: Props) => {
    const [n, setN] = useState(start)
    const incr = useCallback(() => setN(n => n + 1), [])

    return <CounterContext.Provider value={{n, incr}}>
        {children}
    </CounterContext.Provider>
}

export const useCounter = () => {
    const value = useContext(CounterContext)
    if(value == null) {
        throw new Error('Vous devez entourer ce composant d\'un <CounterProvider>')
    }
    return value
}