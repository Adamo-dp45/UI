import { useState } from "react"
import { Button } from "../components/Button"
import { Modal } from "../components/Modal"
import { Input } from "../components/forms/Input"

export function EditPostModal({post, onClose, onSave}) {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => { // On peut faire un async await
        e.preventDefault()
        setError(null)
        setLoading(true)
        const data = new FormData(e.target)
        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
            method: 'PUT',
            data: data
        }).then(r => r.json()).then(r => {
            onSave(Object.fromEntries(data.entries())) // Permet de convertir un FormData sous forme d'objet javascript
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }

    return <Modal onClose={onClose}>
        <h1>Editer l'article #{post.id}</h1>
        {error && `Erreur : ${error.toString()}`}
        <form action="" onSubmit={handleSubmit} className="vstack gap-3">
            <Input name="title" label="Titre" defaultValue={post.title} />
            <Input name="body" label="Contenu" type="textarea" defaultValue={post.body} />
            <div className="hstack gap-2 justify-content-end">
                <Button type="button" disabled={loading} onClick={onClose} variant="secondary">Annuler</Button>
                <Button type="submit" disabled={loading}>Sauvegarder</Button>
            </div>
        </form>
    </Modal>
}