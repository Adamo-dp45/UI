import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Input } from "./components/forms/Input"
import { Checkbox } from "./components/forms/Checkbox"
/*
    - Permet d'observer quand une valeur change et faire un traitement et gère les effets de bord comme 'fetch', 'timers', 'eventListener' aussi montage/démontage comme le onMuted de Vue
*/
function App() {
    const [showInput, setShowInput] = useState(true)
    const [duration, setDuration] = useState(5)
    const [secondsLeft, setSecondsLeft] = useState(duration)

    const handleChange = (v) => {
        setSecondsLeft(v)
        setDuration(v)
    }

    // Après rendu du composant et est async
    useEffect(() => {
        let timer = setInterval(() => {
            // setSecondsLeft(secondsLeft - 1) -- A ne pas faire car il restera bloquer sur le 4
            setSecondsLeft((v) => { // v <= 1 ? 0 : v - 1 -- Quand on fais un set et qu'on ne change pas la valeur, ça ne fais pas de nouveau rendu, mais on vas être optimal
                if(v <= 1) {
                    clearInterval(timer)
                    return 0
                }
                return v - 1 // Optimal
            })
        }, 1000)
        console.log('munted')
        return () => {
            clearInterval(timer)
            console.log('unmunted')
        }
    }, [duration])

    // Avant rendu du composant et est sync, applique le changement avant le rendu, utile pour manipuler le DOM
    const p = useRef(null)

    useLayoutEffect(() => {
        p.current.style.color = "red"
    }) // La couleur sera rouge avant même le rendu du composant car il est sync et peut être utile pour modifier le dom avant le rendu

    useLayoutEffect(() => {
        if(secondsLeft > 2) {
            p.current.style.color = "green"
        }
    }, [secondsLeft]) // Avec dépendance

    return <div>
        <Checkbox 
            checked={showInput}
            onChange={setShowInput}
            id="titleshow"
            label="Afficher le champ titre"
        />
        {showInput && <EditTile />}
        <Input
            placeholder="Timer.."
            value={duration}
            onChange={handleChange}
        />
        <p ref={p}>
            Décompte : {secondsLeft}
        </p>
        <hr />
    </div>
}

function EditTile() {
    const [title, setTitle] = useState('')
    const [firstname, setFirstname] = useState('')
    const [y, setY] = useState(0)

    useEffect(() => { // Reçoit un callback qui sera exécuter dès lors qu'une dépendance change
        document.title = title
    }, [title]) // Appel ce code que quand le titre change

    useEffect(() => {
        const originalTitle = document.title
        return () => { // Si est le composant est démonter
            document.title = originalTitle
        }
    }, [])

    useEffect(() => { // Sera appele lorsque le composant est monté, donc une seule fois
        const handler = (e) => {
            console.log('scroll')
            setY(window.scrollY)
            window.addEventListener('scroll', handler)
            return () => { // On peut retourner une fonction qui va nétoyer les effets de bord lorsque le composer est démonter
                window.removeEventListener("scroll" ,handler)
            }
        }
    }, []) // Sans dépendance

    useEffect(() => { // A éviter car il y'a une autre manière de faire les choses, car il y'aura 2 rendu lors d'un changement
        setY() // Ne pas le mettre directement à la racine, on peut le mettre dans un setInterval etc...
    }, [title])

    /* - Une autre Sol : Au lieu d'utiliser le useEffect, j'utilise une const et l'utiliser dans ma vue
        - const fullname = `${duration}${secondsLeft}` Ou ..
        - const fullname = useMemo(() => `${duration}${secondsLeft}`, [duration, secondsLeft])
    */

    // document.title = title -- Le code que l'on met directement dans le composant est exécuter à chaque fois qu'il y'a un rendu, dès qu'on change le titre ou le prenom il le fera aussi

    return <div className="v-stack gap-2">
        <div>
            Scroll {y}
        </div>
        <Input
            placeholder="Modifier l'article"
            value={title}
            onChange={setTitle}
        />
        <Input
            placeholder="Prénom"
            value={firstname}
            onChange={setFirstname}
        />
    </div>
}

export default App