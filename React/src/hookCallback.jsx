import { memo, useCallback, useMemo, useRef, useState } from "react"
import { Input } from "./components/forms/Input"

/*
    - useCallback : Permet de mémoriser une fonction
        - L'utilisation de useCallback revient au faite que c'est dommage de dire j'ai une fonction qui retourne une fonction, s'il utilise une valeur réactive à l'intérieur elle doit être en dépendance sinon va retourner le même état de cette valeur qu'il a sauvegarder au rendu si 0 par défaut
        - Utile pour tous ce qui est callback qu'on passera au composant enfant pour éviter qu'un composant pur comprenne qu'il est de nouvelle propriété et qu'il se réactualise systèmatiquement
*/

function App() {

    console.log('Rerendu de Info')
    const [callback, setCallback] = useState('')
    /*
        const handClick = useMemo(() => {
            return () => {
                console.log('Memo - useMemo')
            }
        }, [])
    */

    /* -- Ou utiliser une ref car on sait que la ref ne change jamais au cas ou on envoi directement notre callback en dépendance du handClick
        const nameRef = useRef(callback)
        nameRef.current = callback
        const handClick = useCallback(() => {
            console.log(nameRef)
        }, [])
    */
    // - Raccourci de useMemo écrit comme précédemment
    const handClick = useCallback(() => {
        console.log(callback.length)
    }, [callback.length]) // Ici on lui dit de récréer la fonction à chaque fois que la taille change, dans ce cas lors du prémier rendu ça va prendre du temps mais si la taille ne change il sera instantané, donc il ne génère pas une nouvelle version de cette fonction

    return <div className="container my-4 vstack gap-2">
        <Demo />
        <Info />
        <InfoMemo />
        <InfoUseMemo onClick={handClick} />
        <hr />
    </div>
}

// Sol 1 : Ici lorsqu'il y'aura un changement d'état il ne vas pas rerendre le Info
function Demo() {
    console.log('Demo')
    const [name, setName] = useState('')
    return <div>
        <Input label="Nom" onChange={setName} value={name} />
        <div>
            {name.toUpperCase()}
        </div>
    </div> 
}
function Info() {
    console.log('Info')
    return <div className="alert alert-info">
        Lorem ipsum dolor sit amet
    </div>
}

// Sol 2 : Utiliser memo, mais ne doit conténir aucune valeur réactive sinon il reviendrais au même problème
const InfoMemo = memo(function Info() { // Sauvegarde le résultat et s'il n'y a pas de changement il ne rerend pas
    console.log('InfioMemo')
    return <div className="alert alert-info">
        Lorem ipsum dolor sit amet
    </div>
})

// Sol 2 : Utiliser memo et useMemo
const InfoUseMemo = memo(function Info({onClick}) { // Sauvegarde le résultat et s'il n'y a pas de changement il ne rerend pas
    console.log('Info useMemo')
    return <div className="alert alert-info" onClick={onClick}>
        Lorem ipsum dolor sit amet
    </div>
})

export default App