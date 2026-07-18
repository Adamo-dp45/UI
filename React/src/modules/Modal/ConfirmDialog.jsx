import { createPortal } from "react-dom"

export function ConfirmDialog({
    title,
    content,
    onConfirm,
    onCancel,
    open
}) {

    return createPortal(
        <>
        <dialog onCancel={onCancel} open={open}>
            <form action="" onSubmit={onConfirm} method="dialog">
                <h2>{title ?? 'Confirmation'}</h2>
                <p>{content ?? 'Voulez vous vraiment éffectuer cette action'}</p>
                <p>
                    <button type="submit">Confirmer</button>
                    <button type="button" value="cancel" onClick={onCancel}>
                        Annuler
                    </button>
                </p>
            </form>
        </dialog>
        </>, document.body
    )
}