import { globalUpdatedEmail, useAppStore, useStoreMiddle, useStorePersist } from "./store"

export function Footer() {

    // const {email} = useAppStore() -- Si je laisse comme je verrai que ce composant sera rerendu chaque second à cause de mon timer vue qu'il consomme mon store
    // const [email, updateEmail] = useAppStore((state) => [state.email, state.updateEmail]) -- Pose le même problème, va renvoyer un nouveau tableau toutes les secondes

    const email = useAppStore((state) => state.email) // Permet de récupérer que ce dont on n'a besoin
    // const updateEmail = useAppStore((state) => state.updateEmail) -- Permet de récupérer que ce dont on n'a besoin
    // const email = useAppStore.use.email

    const middle = useStoreMiddle((state) => state.email)
    const middleEmail = useStoreMiddle((state) => state.updateEmail)
    const persist = useStorePersist((state) => state.email)
    const persistEmail = useStorePersist((state) => state.updateEmail)

    return <footer>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur modi animi facere nesciunt, accusantium error placeat vitae necessitatibus, exercitationem minima mollitia ratione illo, fugit laborum atque libero dolorem voluptatibus incidunt.
        <p>
            <input type="text" value={email} onChange={(e) => globalUpdatedEmail(e.target.value)} />
        </p>
        <p>
            {middle} - {persist}
        </p>
        <p>
            <input type="text" value={middle} onChange={(e) => middleEmail(e.target.value)} />
            <input type="text" value={persist} onChange={(e) => persistEmail(e.target.value)} />
        </p>
    </footer>
}