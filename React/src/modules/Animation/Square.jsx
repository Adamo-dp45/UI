import { useEffect, useState } from "react"

export function Square({text}) {
    const [n, setN] = useState(0)

    useEffect(() => {
        const timer = window.setInterval(() => setN((n) => n + 1), 1000)
        return () => clearInterval(timer)
    }, [])

    return <>
        <div className="square">
            {text}
            <br />
            {n}
        </div>
    </>
}