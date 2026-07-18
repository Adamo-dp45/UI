import { useCallback, useRef, useState } from "react"
import { interpret } from "robot3"

export function useMachine(machine, initialContext = {}) {
    const {current: service} = useRef(interpret(machine, () => { // On interprête la machine et écoute le changement, 'useRef' pour avoir la même machine ou utiliser un 'useMemo'
        setState(service.machine.current)
        setContext(service.context)
    }, initialContext))

    const [state, setState] = useState(service.machine.current)
    const [context, setContext] = useState(service.context)

    const send = useCallback(function(type, params = {}) {
        service.send({type: type, ...params})
    }, [service]) // On sais que le service ne changera pas

    const can = useCallback((transitionName) => { // Permet de vérifier si on peut éffectuer une transition
        const transitions = service.machine.state.value.transitions // Vue que c'est une map on peut utiliser ces fonctions
        if(!transitions.has(transitionName)) {
            return false
        }
        const transition = transitions.get(transitionName)
        for(const t of transition) {
            if(t.guards && t.guards(service.context) || !t.guards) {
                return true
            }
        }
        return false
    }, [service.machine.state.value.transitions, service.context])

    return [state, send, can, context]
}

// -- Il existe des intégrations comme 'react-robot' mais nous on vas le faire nous même