import { useToggle } from "../hooks/useToggle"

export function Alert({type = 'danger', childern}) {
    const [show, toggle] = useToggle(true)
    if(!show) {
        return null
    }

    return <>
        <div className={`alert alert-${type}`} role="alert">
            {childern}
            <button onClick={toggle}>Fermer</button>
        </div>
    </>
}