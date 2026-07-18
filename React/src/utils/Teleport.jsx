import { createPortal } from "react-dom"
/*
    - Les portails permettent de téléporter nos élément dans des endroits spécifique dans le DOM comme les boites Modal et autres
*/
function App() {

    return <div>
        <Modal />
    </div>
}

function Modal() {
    return createPortal(<div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
        border: 'solid 1px grey',
        background: '#FFF'
    }}>
        Je suis une modal
    </div>, document.body) // L'élément cible
}

export default App