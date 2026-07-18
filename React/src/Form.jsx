import { useActionState, useOptimistic, useRef, useState, useTransition } from 'react'
import { ButtonDom } from './components/Button'
/*
    - Par défaut si on laisse le 'value={firstname}' on ne pourra rien écrire dans le champ sauf si on a un 'onChange' qui prend en param notre 'handleChange'
        - Le 'onChange' dans react est appélé dès qu'il y'a un changement pas comme en js classique
        - Si on met une value il faut qu'elle ne soit jamais 'undifined', cela voudra dire qu'on passe d'un champ controllé à un champ non controllé
    - Pour mettre une valeur initial dans le champ 'defaultValue' au lieu de 'value'
*/
function Form() {
    /*
        - Sol 1 : Les champs controllés mais l'incoveniant de cette approche est qu'il va rerendre le composant à chaque fois qu'il y'a un changement
    */
    const [firstname, setFirstname] = useState('John Doe')
    const handleChange = (e) => {
        setFirstname(e.target.value)
    }
    const reset = () => {
        setFirstname('')
    }

    /*
        - Sol 2 : Les champs non controllés vu qu'il n'est pas controllé par react il n'y a pas rerendu à chaque fois qu'on tape quelque chose et c'est la valeur taper par l'utilisateur qui nous intérèsse
    */
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(new FormData(e.target))
    }
    const [checked, setChecked] = useState(false)
    const toggleCheck = () => {
        setChecked(!checked)
    }

    const [isTermAccepted, setIsTermAccepted] = useState(false) // Pour faire remonter les informations
    /*
        const formRef = useRef(null)
        const onSubmit = async (e) => {
            e.preventDefault()
            const data = new FormData(formRef.current)
        }
    */
    // -- On peut utiliser action du formulaire la petite particularité est qu'il réinitialise les formulaires non controllés après soumission, fais le préventDefault automatiquement, la fonction qui gère la soumission reçoit un data de type (objet FormData) comme dans le DOM au lieu de e -- //

    /*
        Dans le cas de react-dom le formulaire va servir de context et tous les éléments enfants peuvent observer l'etat de chargement du formulaire useFormStatus, voir ButtonDom
    */
    const formRef = useRef(null)
    const onSubmit = async (data) => {
        // createUser(data)
    }

    /*
        - 'useActionState' permet de créer une action sur laquelle on vas pouvoir observer l'état de chargement, retourne un tableau - [state, action, pending] : pending permet d'indiquer si on n'est en progression ou non
    */
    const [state, action, pending] = useActionState((oldState, data) => {
        // throw new Error() -- Si on n'a eu erreur comme si la promesse n'est pas resolue, il va planter notre appli, on vas plutôt l'utiliser ainsi
        try {
            return {
                state: "success",
                user: createUser(data)
            }
        } catch(e) {
            return { state: "error", message: e.toString() }
        }
        // return createUser(data)
    }, {}) // Prend en premier params une action qui sera appelé lorsqu'on va appelé notre action du form et peut être async, en deuxième params on lui passe l'état initial, maintenant dès que je vais appeler mon action la valeur de pending sera à true pendant que le createUser est résolue, le retour de cette fonction sera placé dans state

    console.log(
        pending, // Passe à true, si il fini passe à false
        state // Une fois qu'il a fini lui donne le retour
    )

    /*
        - 'useTransition' permet d'observer l'état de progression d'une promesse, on peut aussi l'utiliser pour le changement d'état, aussi pour avoir des opérations non bloquante
    */
    const [loading, startTransition] = useTransition()
    const onTrashClick = async () => {
        startTransition(async () => {
            // throw new Error() -- Aussi si on n'a une erreur va faire planter toute l'appli, il faudra la capturer
            // await onDeleteUser()
        })
    }

    /*
        - 'useOptimistic' permet de faire un changement d'état optimiste
            - Remarque : Une mise à jour optimistic ne peut se faire que si notre code est exécuté dans une transition startTransition
    */
    const [a, setA] = useOptimistic("No")
    const onDelete = async () => {
        setA("Yes")
    }
    console.log(a) // La valeur sera a Yes et a un momant donné sera à No
    // Si le setA est appelé dans une transition, automatiquement il va prendre la valeur du set que pendant la phase de transition

    // -- Cas d'utilisation
    const [users, setUsers] = useState([])
    const [optimisticUsers, setOptimisticUsers] = useOptimistic(users)
    const onDeleteUsers = async (user) => {
        const newUsers = users.filter((u) => u.id !== user.id)
        setOptimisticUsers(newUsers)
        try {
            // await deleteUsers(user.id)
        } catch(e) {
            // console.log(e)
        }
    }
    // optimisticUsers.map((u) => (li)) -- Ici dès clique sur supprimer, directement notre utilisateur sera supprimer car on par du principe que notre serveur repondra oui, mais s'il li y'a une erreur va remettre les données à leurs places

    return (
        <>
        <h1>Form</h1>
        <form action="" style={{marginTop: '15px'}}>
            <input type="text" name="firstname" value={firstname} onChange={handleChange} /> {firstname}
            <button onClick={reset} type="button">Reset</button>
        </form>

        <form onSubmit={handleSubmit}>
            <input type="text" name="firstname" defaultValue="John Doe" />

            <input type="checkbox" checked={checked} onChange={toggleCheck} />
            <button disabled={!checked}>Envoyer Formulaire</button>

            <CGUCheckbox checked={isTermAccepted} onCheck={setIsTermAccepted} />
            <button disabled={!isTermAccepted}>Envoyer Checkbox</button>
        </form>

        <form ref={formRef} action={onSubmit}>
            <input type="text" name="name" id="name" placeholder="Nom" />
            <ButtonDom>Créer l'utilisateur</ButtonDom>
        </form>

        <form ref={formRef} action={action}>
            <input disabled={pending} type="text" name="name" id="name" placeholder="Nom" />
            <ButtonDom>useActionState</ButtonDom>
        </form>
        { state.state === "error" && <p>{state.message}</p> }

        <button onClick={onTrashClick}></button>
        <button onClick={onDelete}>useOptimistic</button>
        <hr />
        </>
    )
}

function CGUCheckbox({checked, onCheck}) { /*
    - On a fais monter les infos avec 'onCheck' qui reçoit callback pour que l'enfant communique avec le parent 
*/
    return <div>
        <label htmlFor="">
            <input type="checkbox" checked={checked} onChange={(e) => onCheck(e.target.checked)} />
            Accepter les conditions d'utilisation
        </label>
    </div>
}

export default Form