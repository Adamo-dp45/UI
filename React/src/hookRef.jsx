import { useEffect, useRef } from "react"
import { Input } from "./components/forms/Input"

/*
    - 'useRef' permet d'intéragir avec le html mais aussi de conserver des valeurs sans forcement changer l'état et la particularité est qu'il ne fais pas de rerendu lors du changement de la valeur du ref, si une ref est undifined ça ne pose aucun problème
    - Remarque : Lorsqu'on branche une ref à notre élément Html et que cet élément est supprimer automatiquement la ref prend une valeur null
*/

function App() {
    const ref = useRef(null)
    // console.log(ref) -- {current: null}
    const refHtml = useRef(null) // On vas utiliser une ref sur un élément qui n'est pas du Html
    // console.log(refHtml) -- {current: div}

    useEffect(() => {
        console.log(refHtml.current.offsetHeight) // Va nous donner la hauteur de notre div
    }, []) // On n'est pas obligé de mettre [ref] car la ref sera toujours le même objet qui sera réutiliser entre chaque rendu
    // console.log(refHtml.current.offsetHeight) -- Attention si on le fais comme ça il va donner null, et faut le faire un useEffect, attendre que le composant soit rendu

    useEffect(() => {
        if(ref.current) {
            // -- A cause de la remarque
        }
    }, [])

    const compteur = useRef({count: 0})
    const handleClick = () => {
        compteur.current.count++
        console.log(compteur) // Retourne le même objet seule la valeur de current change
    }

    return <div ref={refHtml} onClick={() => ref.current = 'hello'}>
        <Input inputRef={ref} label='Ref' />
        <button onClick={handleClick}>Récupérer la valeur</button>
        <hr />
    </div>
}

export default App