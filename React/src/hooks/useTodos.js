import { useCallback, useReducer } from "react"

function TodosReducer(state, action) {
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
            showCompleted: state.showCompleted
        }
    }
    return state
}

export function useTodos() {
    // On note que le dispash est une fonction qui ne change jamais, pas besoin de le mettre dans un useEffect
    const [state, dispash] = TodosReducer(reducer, {
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

    return {
        showCompleted: state.showCompleted,
        visibleTodos: visibleTodos,
        toggleTodos: useCallback((todo) => dispash({type: 'TOGGLE_TODO', payload: todo})),
        removeTodos: useCallback((todo) => dispash({type: 'REMOVE_TODO', payload: todo})),
        clearCompleted: useCallback(() => dispash({type: 'CLEAR_COMPLETED'})),
        toggleFilter: useCallback(() => dispash({type: 'TOGGLE_FILTER'}))
        // useCallback si je veux éviter qu'il génère de nouvelle méthodes à chaque fois que ces méthodes sont appelés
    }
}
