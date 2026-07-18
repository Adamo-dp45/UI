import { useEffect } from "react"
import { Dashbord } from "./Dashbord"
import { Login } from "./Login"
import { GUEST, UNKNOWN, useAuth } from "./useAuth"
import { Header } from "./Header"

/*
    -- Pour l'authentification on peut utiliser un système de token, aussi les cookies qui dans lequel le serveur est responsable de mémoriser l'authentification pour ça lors de la requête 'fetch' on utilise l'option 'credentials' à 'include' pour envoyer les cookies, lorsqu'une requête est faite on vas passer les cookies et les définir, les cookies ne pourront pas être lues depuis le nom de domaine du front vu qu'il seront définie pour le domaine du serveur par contre lorsqu'on vas vouloir faire de nouvelles requêtes au domaine du serveur les cookies seront transférés automatiquement et permettra au serveur de savoir si l'utilisateur est authentifié ou pas
*/
function App() {
    const {status, authenticate} = useAuth()

    // -- On va partir du principe qu'on a les informations grâce au localStorage, l'inconvenient de cette approche est que si on modifie le localStorage on aura des informations différents de celle du serveur qui seront affiché, mais c'est que de l'affichage ou utiliser notre 'authenticate' pour resyncro les informations dépuis le serveur
    /*
        useEffect(() => {
            authenticate()
        }, [])
    */

    if(status === UNKNOWN) {
        return (
            <div className="mx-auto my-5" style={{width: 'min-content'}}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    if(status === GUEST) {
        return (
            <div className="container mt-5">
                <Login />
            </div>
        )
    }

    return <>
        <Header />
        <div className="container mt-3">
            <Dashbord />
        </div>
    </>
}

export default App