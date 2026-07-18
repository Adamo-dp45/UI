import { useAppStore } from "./store"

export function Hero() {
    // -- Si on consome tous le store, dès qu'un élément change notre composant sera rerendu
    const {email, updateEmail, timer} = useAppStore()
    const user = useAppStore((state) => state.user)
    const login = useAppStore((state) => state.login)
    /*
        const email = useAppStore.use.email
        const updateEmail = useAppStore.use.updateEmail
        const timer = useAppStore.use.timer
        const user = useAppStore.use.user
        const login = useAppStore.use.login
    */

    const handleLogin = () => {
        login()
    }

    const updateUsername = useAppStore((state) => state.updateUsername)
    const handleUpdate = (e) => {
        e.preventDefault()
        updateUsername(new FormData(e.currentTarget).get('username'))
    }

    return <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque laborum quasi quia ut ipsum praesentium, veritatis quos possimus minus libero voluptate sit, eligendi nostrum doloribus ducimus architecto culpa vitae recusandae?
        <p>
            <input type="text" value={email} onChange={(e) => updateEmail(e.target.value)} />
        </p>
        <p>
            Timer {timer}
        </p>
        <p>
            {user && `Utilisateur ${user.username} connecté`}
            {!user && "Utilisateur non connecté"}
        </p>
        <button onClick={handleLogin}>Se connecter</button>
        <hr style={{marginBottom: '10px'}} />
        <div>
            {user && <form onSubmit={handleUpdate}>
                <label htmlFor="">Modifier mon nom</label>
                <input type="text" name="username" defaultValue={user.username} />
                <button>Soumettre</button>
            </form>}
        </div>
        <hr style={{marginBottom: '10px'}} />
    </div>
}