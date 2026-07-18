import { useState } from "react"
import { useIncrement } from "./hooks/useIncrement"
import { useDocumentTitle } from "./hooks/useDocumentTitle"
import { Input } from "./components/forms/Input"
import { useFetch } from "./hooks/useFetch"
import { useToggle } from "./hooks/useToggle"

export function App() {
    const [checked, toggleChecked] = useToggle()
    const {count, increment, decrement} = useIncrement({
        initial: 0,
        max: 20,
        min: 0
    })
    const [name, setName] = useState('')
    useDocumentTitle(name ? `Editer ${name}` : null)

    const {loading, data, errors} = useFetch('https://jsonplaceholder...')

    return <div>
        <input type="checkbox" checked={checked} onChange={toggleChecked} />
        {checked && checked ? 'Je suis coché' : 'Je ne suis pas encore coché'}
        <p>
            Compteur : {count}
            <button onClick={increment}>Incrémenté</button>
            <button onClick={decrement}>Décrémenté</button>
        </p>
        <Input value={name} onChange={setName} label="Changer titre" />

        {loading && <div>Chargment...</div>}
        {errors && <div style={{color: 'red', background: '#DDD', padding: '15px 20px', fontWeight: '400'}}>{errors.toString()}</div>}
        {data && <div>
            <ul>
                {data.map(post => (<li key={post.id}>{post.title}</li>))}
            </ul>
        </div>}
        <hr />
    </div>
}

export default App