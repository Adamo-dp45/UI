import { useContext } from "react"
import { useTheme } from "../hooks/useTheme"
import { useFormStatus } from "react-dom"

export function Button({variant = 'primary', ...props}) { // Car type est déjà un attribut
    const newProps = {
        ...props,
        className: `btn btn-${variant}`
    }
    const theme = useTheme() // Va me donner la valeur de themeContext
    // return <button>{theme}</button>
    if(props.href) {
        return <a {...newProps} />
    }
    return <button {...newProps} />
}

/*
    - Dans le cas de react-dom le formulaire va servir de context et tous les éléments enfants peuvent observer l'etat de chargement du formulaire useFormStatus
        - 'pending' soummsion en cours
        - 'data' données associés à notre formulaire
        - 'method' méthode utilisée
        - 'action' permet de savoir l'action qui est utilisé
    - Sachant que si le button est en dehors du formulaire le pending sera à false et le button ne sera pas désactiver
*/

export function ButtonDom({children}) {
    const { pending } = useFormStatus()
    return <button disabled={pending}>{children}</button>
}