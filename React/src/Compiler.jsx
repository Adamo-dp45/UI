import { useState } from "react"

export default function Compiler() {
    // "use no memo" -- Pour désactiver le compiler pour ce composant
    const [count, setCount] = useState(0)

    console.log('Compiler render')

    const increment = () => {
        setCount((v) => v + 1) // Avec un callback qui incrémente la valeur à l'intérieur de l'état le compiler va mémoriser
        // setCount(count + 1) -- Dans ce cas le comportement du compiler sera différent vu qu'on utilise la valeur du compteur, les 2 composants vont être rerendu car la fonction va changé à chaque rerendu vu qu'elle a besoin de l'état du coup le composant 'Button' va récevoir un callback qui sera différent ce qui montre que le compiler est assez intélligent pour savoir si une fonction dépend de l'état ou non pour le mémorisé
    }

    return <>
        <div>{count}</div>
        <Button onClick={increment}/>
    </>
}

const Button = ({onClick}) => {
    console.log('Button render')

    return <>
        <button onClick={onClick}>
            Incrémenter
        </button>
    </>
}