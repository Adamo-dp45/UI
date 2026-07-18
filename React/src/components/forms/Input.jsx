import { forwardRef, useId } from "react"

// --- Mise à jour - On n'a plus besoin de 'forwardRef', car la ref est une propriété classique maintenant <Input ref

/**
 * 
 * @param {string} placeholder 
 * @param {string} value 
 * @param {string} type 
 * @param {string} label 
 * @param {(s: string) => void} onChange
 * @returns 
 */
export function Input({placeholder, value, onChange, type= 'text', label, inputRef, labelRef}) { // Ne pas le nommer ref sinon ça ne marchera pas
    const id = useId()
    const InputComponent = type === 'textarea' ? 'textarea' : 'input'

    return <div>
        {label && <label ref={labelRef} className="form-label" htmlFor={id}>{label}</label>}
        <InputComponent
            ref={inputRef}
            id={id}
            type={type}
            className="form-control"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)} // ?. Si 'onChange' n'est pas utiliser il n'y aura pas d'erreur
        />
    </div>
} // Ici au changement on appel le 'onChange' qu'on reçoit en params de la fonction et on lui envoie la valeur

/* - Une seconde manière pour utiliser les ref ici, notre composant va se comporter comme un élément Html
    export const Input = forwardRef(function Input({placeholder, value, onChange, type= 'text', label}, ref) {
        const id = useId()
        return <div>
            <label className="form-label" htmlFor={id}>{label}</label>
            <input
                ref={ref}
                id={id}
                type={type}
                className="form-control"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    })
*/
// Input.displayName = "InputComponet" -- Pour changer le nom de notre composant