import { useState } from "react"
import { Datepiker } from "./Datepiker"

// -- Mise en garde : Lorsqu'on grèffe des librairies on doit regarder s'il permet d'avoir un destroy, lorsque le composant est démonté on le supprime

function App() {
    const [value, setValue] = useState('2025-07-06')
    const [username, setUsername] = useState('John')

    const handleChange = (date) => {
        // On verra que lors du changement cette fonction ne sera pas appelé, car il va falloir passer pas le système d'évènement de flatpikr
        console.log(username + ' ' + date) 
    }

    return <>
        <h1>Librairie classique</h1>
        <p>
            <input type="text" value={value} onChange={e => setValue(e.target.value)} />
        </p>
        <p>
            <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </p>
        <h2>Datepiker</h2>
        <Datepiker value={value} onChange={setValue} />
    </>
}

export default App