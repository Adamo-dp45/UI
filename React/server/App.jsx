import { useState } from "react"

function App() {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(count => count + 1)
    }

    return <>
        <p>
            Count {count}
            <button onClick={increment}>Incrémenter</button>
        </p>
    </>
}

export default App