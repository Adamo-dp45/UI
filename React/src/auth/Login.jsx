import { useAuth } from "./useAuth"

export function Login() {
    const {login} = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        login(
            data.get('username').toString(),
            data.get('password').toString()
        )
    }

    return <>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
                <input type="text" className="form-control" defaultValue="admin" name="username" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe</label>
                <input type="text" className="form-control" defaultValue="admin" name="password" />
            </div>
            <button type="submit" className="btn btn-primary">Se connecter</button>
        </form>
    </>
}