import { Controller, useForm } from "react-hook-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
/*
    const [startDate, setStartDate] = useState(new Date())
    return <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

*/
const wait = function(duration) {
    return new Promise((resolve) => {
        window.setTimeout(resolve, duration) // Va résoudre au bout de la durée
    })
}

const schema = yup // Doc react hook form - Schema Validation
    .object({
        nom: yup.string().required(),
        prenom: yup.string().required(),
        // email: yup.string().email().required(),
        // password: yup.string().min(4).required(),
        // age: yup.number().positive().integer().required(),
    })
    .required()
// Si on n'utilise 'Yup' plus besoin de rajouter les règles de validations côté champ

function App() {
    /*
        - register : Permet d'enregistrer les valeurs que vont prendre un champ
        - ref={register} : Permet à react hook form de venir écouter les évènements natifs de l'input et de sauvegarder les changements de valeurs et le champ doit avoir un nom
        - handleSubmit : Permet de transferer les données
        - formState : Nous donne des infos sur l'état de notre formulaire, isSubmitting : Le formualire est en cours de traitement
        - ref={register({required: true})} : Validation, il focus le champ s'il contient des erreurs - ref={register({required: 'Vous devez mettre un pseudo, minLenght: 10 -ou- minLenght: {value: 10, message: "ddd"}})} : Pour avoir un message d'erreur
        - setError : Permet de definir une erreur manuellement, clearErrors : Permet de netoyer toutes les erreurs
        - control : Utiliser avec le Controller
        - watch : Observe en direct une valeur de champ
        - reset : Réinitialise le formulaire

        - Pour des librairies externes, on vas utilisé un Controller, qui est un composant qui va permettre de faire la parcerelle avec un composant qui ne peut pas recevoir des ref
    */

    // const {register, handleSubmit, formState, setError} = useForm()
    const {register, handleSubmit, formState /*: {errors}*/, setError, clearErrors, control, watch, reset, resetField} = useForm({
        mode: 'onTouched',
        // onChange : Si on veut la validation instantané, mais ça vas rerendre le composant à chaque changement
        // onTouched : Valide quand on quitte le champ
        shouldFocusError: true, // Si on veut focus le champ lors d'une erreur
        resolver: yupResolver(schema) // schema de validation basé sur yup
    })
    /*
        - 'isValid' fonctionne quand on a le mode onChange ce qui vas nous permettre de désactiver le bouton tant que le formulaire n'est pas valide
        - isSubmitted : Permet de savoir si le formulaire a été soumis, isSubmitSuccessful : Si elle a été soumis convenablement
    */
    const {isSubmitting, isValid, isSubmitted, isSubmitSuccessful} = formState

    const onSubmit = async data => {
        await wait(2000)
        console.log(data)
        /*
            setError('nom', { -- Au cas ou le serveur repond avec une erreur
                type: 'manual', -- Il y'a plusieurs types (min, max, maxLength ...)
                message: 'Le serveur ne comprend pas ça'
            }) -- Va afficher l'erreur au niveau du champ
        */
        // console.log(isSubmitted, isSubmitSuccessful) -- Va me dire 'isSubmitted' true et 'isSubmitSuccessful' false
    }
    // console.log('Hello') -- On verra que lorsqu'on vas taper de nouvelles valeurs dans le champ, on n'aura pas de nouveau rendu
    console.log(formState.errors) // Erreurs
    /*
        if(isSubmitSuccessful) {
            <Redirect />
        }
    */
    return <>
        <h1>Inscription</h1>
        {isSubmitSuccessful && <div className="alert alert-success">Le formulaire a bien été soumis</div>}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Nom</label>
            <input type="text" name="nom" defaultValue={'John'} {...register('nom')} />
            {/* errors.name && <span>{errors.name.message}</span> */}

            <label htmlFor="">Prenom</label>
            <input type="text" name="prenom" {...register('prenom')} />
            <Controller
                control={control}
                name="datepicker"
                render={({onChange, onBlur, value, name, ref}) => (
                    <DatePicker 
                        selected={value}
                        onBlur={onBlur}
                        onChange={onChange}
                    />
                )}
            />
            <button disabled={isSubmitting ?? !isValid} type="submit">S'inscrire</button>
        </form>
    </>
}

export default App