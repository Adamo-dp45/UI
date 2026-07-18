import { act, useReducer } from "react"
/*
    - 'useReducer' permet de représenter un état complexe qui subi des mutations importantes comme une todolist

    -- useTodos
*/

function reducer(state, action) {
    if(action.type === 'REMOVE_TODO') {
        // state.todos = .. -- A ne pas faire, On note que dans cette fonction il est important de ne jamais mutter l'état sinon ça donnera le même problème que dans le useState, c'est pour ça que j'ai crée un nouvel objet
        return { // Ou le séparer dans une fonction removeTodo
            ...state,
            todos: state.todos.filter(todo => todo !== action.payload)
        }
    }
    if(action.type === 'TOGGLE_TODO') {
        return {
            ...state,
            todos: state.todos.map(todo => todo === action.payload ? {
                ...todo,
                checked: !todo.checked
            } : todo)
        }
    }
    if(action.type === 'CLEAR_COMPLETED') {
        return {
            ...state,
            todos: state.todos.filter(todo => !todo.checked)
        }
    }
    if(action.type === 'TOGGLE_FILTER') {
        return {
            ...state,
            showCompleted: !state.showCompleted
        }
    }
    return state // Retourne l'état
}

function reduce(state, action) {
    switch(action.type) {
        case 'increment':
            return state + 1
        case 'decrement':
            if(state <= 0) {
                return state
            }
            return state - 1
        default:
            throw new Error("L'action de " + action.type + "est inconnue") // Si on décide de ne pas retourner state le code va planter
    }
}

function App() {
    // On note que le dispash est une fonction qui ne change jamais, pas besoin de le mettre dans un 'useEffect'
    const [state, dispash] = useReducer(reducer, {
        showCompleted: true,
        todos: [
            {
                name: 'Faire les courses',
                checked: false
            },
            {
                name: 'Ranger les courses',
                checked: true
            },
            {
                name: 'Manger les courses',
                checked: false
            }
        ]
    })
    const visibleTodos = state.showCompleted ? state.todos : state.todos.filter(t => !t.checked)

    // Exp 2
    const [count, dispash2] = useReducer(reduce, 0) // 0 valeur par defaut

    return <div>
        <p>
            <input type="checkbox" checked={state.showCompleted} onChange={() => dispash({type: 'TOGGLE_FILTER'})} />
            Afficher les tâches accomplies
        </p>
        <ul>
            {visibleTodos.map(todo => (<li 
                key={todo.name}
            >
                <input type="checkbox" onChange={() => dispash({type: 'TOGGLE_TODO', payload: todo})} checked={todo.checked} />
                {todo.name}
                <button onClick={() => dispash({type: 'REMOVE_TODO', payload: todo})}>Supprimer</button>
            </li>))}
        </ul>
        <button onClick={() => dispash({type: 'CLEAR_COMPLETED'})}>Suppimer les tâches accomplies</button>
        <p>
            Compteur : {count}
        </p>
        <button onClick={() => dispash2({type: 'increment'})}>Incrémenter</button>
        <button onClick={() => dispash2({type: 'decrement'})}>Décrémenter</button>
        <button onClick={() => dispash2({type: 'inconnu'})}>Action Inconnue</button>
    </div>
}

export default App