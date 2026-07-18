import { useEffect, useRef, useState } from "react"

const VISIBLE = 1
const HIDDEN = 2
const ENTERING = 3
const LEAVING = 4 // Commence à quitter

export function Fade({
    visible,
    children,
    duration = 300,
    animateEnter = false,
    from = {opacity: 0} // Va nous permettre de spécifier vers ou vas aller l'animation - x: 0, y: 0, z: 0
}) {

    const childRef = useRef(children)
    const [state, setState] = useState(visible ? (animateEnter ? ENTERING : VISIBLE) : HIDDEN)
    const className = state === VISIBLE ? 'fade' : 'fade out'

    if(visible) {
        childRef.current = children
    }

    useEffect(() => {
        if(!visible) {
            setState(LEAVING)
        } else {
            setState((s) => s === HIDDEN ? ENTERING : VISIBLE) // Si l'élément est masquer
        }
    }, [visible])

    useEffect(() => {
        if(state === LEAVING) {
            let timer = setTimeout(() => {
                setState(HIDDEN)
            }, duration)
            return () => {
                clearTimeout(timer)
            }
        } else if(state === ENTERING) {
            document.body.offsetHeight // On demande au navigateur de peindre le changement sinon l'élément apparatra instantanement, on force le navigateur à faire le rendu
            setState(VISIBLE)
        }
    }, [state])

    if(state === HIDDEN) {
        return null
    }

    // On peut utiliser les styles au lieu des class
    let styles = {
        transitionDuration: `${duration}ms`,
        transitionProperty: 'opacity transform'
    } // On pourrait lui dire de faire une transition sur opacity seulement si elle existe
    if(state !== VISIBLE) {
        if(from.opacity !== undefined) { // undefined : Sinon s'il voit la valeur 0, il dit c'est incorrect
            styles.opacity = from.opacity
        }
        // styles.opacity = 0
        // styles.transform = 'translateX(10px)'
        styles.transform = `translate3d(${from.x ?? 0}px, ${from.y ?? 0}px, ${from.z ?? 0}px)`
    }

    return <div style={styles}> {/* className={className} */}
        {childRef.current}
    </div>

    /* -- On peut s'arrêter là, mais la div parent ne sera pas supprimer du DOM, ce qui peut géner lors d'un display grid
        const [showChildren, setShowChildren] = useState(visible)
        useEffect(() => {
            if(visible) {
                setShowChildren(true)
            } else {
                let timer = setTimeout(() => {
                    setShowChildren(false)
                }, 300)
                return () => {
                    clearTimeout(timer)
                }
            }
        }, [visible])
        let className = 'fade'
        if(!visible) {
            className += ' out'
        }
        return <div className={className}>
            {showChildren && children}
        </div>
    */
}