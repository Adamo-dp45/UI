import { useToasts } from "./ToastContext"

function App() {
    const { pushToast } = useToasts()
    const onSubmit = () => {
        pushToast({
            title: "Bravo",
            content: "Votre action à bien marché"
        })
    }
    return <>
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <button onClick={onSubmit}>Toast</button>
            <button onClick={() => pushToast({type: 'danger', content: 'error', duration: 1})}>Toast</button>
        </div>
    </>
}

export default App