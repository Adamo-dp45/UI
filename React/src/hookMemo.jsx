import { useMemo, useState } from "react"
import { Input } from "./components/forms/Input"

/*
    - Memo permet de mémoriser une valeur calculée coûteuse
    - A chaque fois qu'on fais un changement tel qu'il soit il réexécute notre fonction, pour ne pas vouloir ce comportement on utilisera le useMemo
    - hookMemo va permettre de mémoriser une valeur et de changer cette valeur que lorsque une certaine dépendance change
    - Aussi ça ne sert à rien de mettre en mémoire quelque chose qui prend très peu de temps
*/

function App() {

    const [firstname, setFirstname] = useState('John')
    const [password, setPassword] = useState('motdepasse')
    // const security = passwordSecurity(password)
    // Si la fontcion passwordSecurity er qu'on modifie le champ firstname, il va aussi executer cette fonction ce qui est dommage, on aimerais pouvoir lui dire n'exécute cette fonction que lorsqu'on en a besoin
    const security = useMemo(() => {
        return passwordSecurity(password) // Si je modifie autre chose que ma dépendance ce code n'est jamais modifié
    }, [password]) // Quand cette fonction va être exécuter le retour va être stocké dans security

    // const random = useMemo(() => Math.random(), []) // Sans dépendance il sera généré que lors du premier rendu, la valeur n'est générer qu'une seule fois

    return <div className="container my-2 vstack gap-2">
        <Input
            placeholder="Nom d'utilisateur"
            value={firstname}
            onChange={setFirstname}
        />
        <Input
            placeholder="Mot de passe"
            type="password"
            value={password}
            onChange={setPassword}
        />
        Sécurité : {security}
        <hr />
    </div>
}

function passwordSecurity(password) {
    // Fake lenteur
    let startTime = performance.now()
    while(performance.now() - startTime < 200) {
    }

    if(password.length < 3) {
        return 'Faible'
    } else if(password.length < 6) {
        return 'Moyen'
    }
    return 'Fort'
}

export default App