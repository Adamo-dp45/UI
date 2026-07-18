import { useToggle } from "../../hooks/useToggle"
import { Square } from "./Square"
import "./App.css"
import { Fade } from "./Fade"

function App() {
    const [open, toggle] = useToggle(true)
    // animateEnter : Effet d'animation à l'entrer

    return <>
        <button onClick={toggle}>Afficher/Masquer</button>
        <Fade visible={open} duration={300} from={{
            opacity: 0,
            x: 10,
            y: 10
        }}>
            <Square text="Hello 1" />
        </Fade>
        <Fade visible={open} duration={300} animateEnter>
            <Square text="Hello 2" />
        </Fade>
        {/* On pourrait avoir une condition pour afficher l'élément et automatiquement c'est le FadePresence qui va détecter si l'élément apparaît ou disparaît pou déclencher l'animation
            <FadePresence>
                <Child />
                <Child />
                {open && <Child />}
            </FadePresence>
        */}
    </>
}

export default App