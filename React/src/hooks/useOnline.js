import { useSyncExternalStore } from "react"

// -- Permet de vérifier si l'utilisateur est en ligne ou pas - On pourrait tenter d'utiliser 'useState' mais on vas utiliser useSyncExternalStore

const getSnapshot = () => { // Permet de récupérer la valeur
    return navigator.onLine
}

const subscribe = (callback) => { // Permettra de s'abonner au changement et devra retourner une fonction qui permettra de se désabonner un peu comme le useEffect
    window.addEventListener('online', callback)
    window.addEventListener('offline', callback)
    return () => {
        window.removeEventListener('online', callback)
        window.removeEventListener('offline', callback)
    }
}

export const useOnline = () => {
    return useSyncExternalStore(subscribe, getSnapshot, () => true) // Le 3ème params désigne le rendu côté serveur, si j'ai un rendu côté serveur useOnline sera à true
}

// -- Il est important de lorsqu'on fais un useSyncExternalStore lui envoyer une méthode subscribe qui ne vas pas changer à chaque rerendu sinon il va s'abonner et se désabonner à chaque fois, c'est pour ça qu'on définie la fonction subscribe en dehors du code de useOnline, le second point est que le callback n'a pas d'importance on peut lui passer n'importe quoi, ça n'a pas d'importance, dès qu'il y'a un changement ce que vas faire est react va utiliser la méthode getSnapshot pour avoir la nouvelle valeur, donc dès que l'état du navigateur change, automatiquement le callback (subscribe) est appelé et react dit ah il y'a eu un changement et vas appelé la méthode getSnapshot pour avoir la nouvel valeur, il est important que getSnapshot renvoi un valeur qui complètement nouvel, il va pas faire le test en profondeur, il faut vraiment que ça soit un tout nouvel objet, si dans le subscribe on fais une mutation il va pas forçement le détecté lors du getSnapshot -- //