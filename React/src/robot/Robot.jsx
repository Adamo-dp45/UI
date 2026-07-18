import { useMachine } from "./useMachine"
import machine from "./machine"
import { Input } from "../components/forms/Input"
import { useCallback, useState } from "react"

export default function Robot({title}) {
    const [state, send, can, context] = useMachine(machine, {title})
    const [text, setText] = useState('Bonjour')
    const editMode = !['idle', 'success'].includes(state)

    const handleChange = (e) => {
        setText(e)
        send('input', {value: e})
    }

    const dismiss = useCallback(() => {
        send('dismiss')
    }, [send])

    return <>
        {!editMode ?
        <h1>{context.title}</h1> :
        <Input id="title" disabled={!can('input')} value={text} onChange={e => handleChange(e)} />
        }

        {state === 'success' && <p><button onClick={dismiss}>Le titre a bien été sauvegardé</button></p>}
        {state === 'error' && <p><button onClick={dismiss}>{context.error}</button></p>}

        {editMode ?
        <div>
            <button disabled={!can('submit')} onClick={() => send('submit')}>Envoyer</button> {/* loading={state === 'loading'} */}
            <button disabled={!can('cancel')} onClick={() => send('cancel')}>Annuler</button>
        </div> :
        <button onClick={() => send('edit')}>Editer</button>}
        {/*
            {state === 'edit' && <button onClick={() => send('cancel')}>Annuler</button>}
            {can('submit') && <button onClick={() => send('submit')}>Envoyer</button>}
            {can('cancel') && <button onClick={() => send('cancel')}>Annuler</button>}
        */}
        <p>
            Statut : {state}
        </p>
        <p>
            Contexte : {JSON.stringify(context)}
        </p>
    </>
}