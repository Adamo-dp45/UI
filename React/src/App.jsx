import { useState } from 'react'
import reactLogo from '/react.svg'
import { Select } from './components/forms/Select'
// import { confirm } from './modules/Modal/ConfirmGlobal'
import { useConfirm } from './modules/Modal/ConfirmContext'
import PropTypes from 'prop-types'
import { Activity } from 'react'
import { useToggle } from './hooks/useToggle'
import { useEffectEvent } from 'react'
/*
    - Pour ne pas avoir d'élément racine suplémentaire <Fragment></Fragment> ou <></>
    - L'attribut 'dangerouslySetInnerHTML' permet d'autoriser le html
    - Dans une liste chaque enfant doit avoir une clé unique 'key'

    - 'Activity' permet de gérer l'affichage ou le masquage des éléments et aussi de gérer des éléments avec des priorités inférieur, la particularité est qu'il garde l'état des composants même quand on le cache
        - Par défaut il rend les composants même s'il n'est pas affiché mais avec une priorité inférieur et si on n'a un 'useEffect' à l'intérieur il ne sera pas lancé
        - Permet aussi de précharger les données dans le cas ou on ferai un appel 'fecth' à l'intérieur du composant caché

    - 'useEffectEvent' permet de transformé une fonction pour pouvoir l'appeler dans un 'useEffect', permet d'avoir la dernière version de l'état de notre composant, va sauvegarder une fonction en gardant la même instance comme l'astuce du 'useRefSync', utile dans le cas ou on a une fonction qui définie dans le composant et qui est ensuite utilisé dans le 'useEffect'
*/
const title = "Vite + <em>React</em> Click"
const style = {color: 'blue', backgroundColor: 'red'}
const showTitle = true
const todos = [
    'Amanont',
    'Mamarou',
    'Jean'
]

function App() {
    const [count, setCount] = useState(0)
    const {confirm} = useConfirm()
    const [state, toggle] = useToggle()

    const handleClick = async (e) => {
        console.log(e) /*
            - N'est pas un évènement classique au niveau du 'DOM' car 'React' va entourer tous les évènements natifs du navigateur par ses évènements ce qui est générique quelque soit la plateforme
        */
        e.preventDefault()
        alert('J\'ai cliqué sur le titre')
    }

    const handleModal = async (e) => {
        if(await confirm({
            title: 'Voulez vous vraiment faire l\'action'
        })) {
            alert('J\'ai cliqué sur le titre')
        }
    }

    return (
        <>
            <h1>App</h1>
            <p>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </p>

            {showTitle && <h1 onClick={handleClick} style={{color: 'blue', backgroundColor: 'red'}} dangerouslySetInnerHTML={{__html: title}}></h1>}
            {showTitle ? <span>True</span> : <span>False</span>}

            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>

            <p>
                <button onClick={handleModal}>Modal</button>
            </p>

            <Title color="green" id="monid" data-title>Title composant</Title>

            <ul>
                {todos.map(todo => (<li key={todo}>{todo}</li>))}
            </ul>

            <Select
                options={[
                    { label: "Pomme", value: "apple" },
                    { label: "Banane", value: "banana" },
                    { label: "Mangue", value: "mango" }
                ]}
                onChange={(e) => console.log(e)}
                name='select'
            />

            {/* <Activity mode={state ? 'visible' : 'hidden'}>
                <Video />
            </Activity> */}
            <hr />
        </>
    )
}

function Title({color, children, hidden, ...props}) { /*
        - On a utilisé la déstructuration pour extraitre les valeurs ou 'props' qui reçoit l'objet
        - La propriété 'children' est différente des autres vu qu'il va contenir les enfants
        - Le sprède opérator '...props' permet de faire passé des propriétés du parent vers l'enfant et avec lui on peut même se passer du 'children'
    */
    if(hidden) {
        return null
    }
    /* Ou..
        const props = {
            id: 'monid',
            className: 'maclass'
        }
    */
    return <h1 style={{color: color}} {...props}>{children}</h1>
}

export default App