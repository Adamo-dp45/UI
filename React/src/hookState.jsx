import { useState } from 'react'
/*
    - 'useState' est un petit espace mémoire associé au composant avec lequel on vas pouvoir intéragir, on l'appel l'état qui permet de représenter les données qui associés spécifiquement à ce composant donc pour intéragir avec cet état on utilise des 'hooks' qui ne peut être utilisé qu'à l'intérieur des composants aussi pas dans un 'if' ou 'for'
*/
function UseState() {
    const [count, setCount] = useState(0)
    const [person, setPerson] = useState({
        nom: 'John',
        prenom: 'Doe',
        age: 18
    })

    const increment = () => {
        setCount(count + 1) /*
            - setCount((count) => count + 1) -- Va prendre la valeur actuelle de 'count' + 1 et si on écrit plusieurs fois il va cumuler sinon avec ça '(count + 1)' si on écrit 2 fois on aura 1 vu que la valeur 'count' est 0 au rendu
        */ 
    }

    const decrement = () => {
        setCount(count - 1)
    }

    const incrementAge = () => {
        setPerson({...person, age: person.age + 1}) /*
            - Lorsqu'on appelle un 'setter' on doit lui donner une nouvelle version de l'objet vu qu'on ne peut pas faire de mutation sur les 'object' ou 'array' dans le cardre de 'React'
                - [...todos, 'note'] ou la fonction 'filter'
        */
    }

    return (
        <>
            <h1>useState</h1>

            <p>Compteur {count}</p>
            <button onClick={increment}>Incrémenter</button>
            <button onClick={decrement}>Décrémenter</button>

            <p>Age de {person.nom} {person.prenom} est {person.age}</p>
            <button onClick={incrementAge}>Ajouter une année</button>
            <hr />
        </>
    )
}

export default UseState
