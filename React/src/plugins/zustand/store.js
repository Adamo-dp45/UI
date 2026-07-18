import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

const createSelector = (_store) => { // Permet de changer le foramat de la récupération
    let store = _store
    store.use = {}
    for(let k of Object.keys(store.getState())) {
        store.use[k] = () => store((s) => s[k])
    }
    return store
}

export const useAppStore = create((set) => ({ // 'set' permet de changer la valeur dans l'état
    email: 'john@doe.fr',
    updateEmail: (email) => {
        set({email: email})
    },

    // -- On peut modifier ce store depuis l'extérieur
    timer: 0,

    user: null,
    login () {
        // fetch('').then((r) => r.json()).then((user) => set({user: user}))
        set({user: "John"})
    },
    updateUsername(username) {
        /*
            set(produce((state) => { -- Immer - produce
                state.user.username = username
            }))
        */
        set(state => ({ 
            user: {
                ...state.user,
                username: username
            }
        }))
    }
}))

// -- On modifier le store depuis ici
window.setInterval(() => {
    useAppStore.setState((state) => ({timer: state.timer + 1})) // Avec zustand quand on fais modifie le store, on n'a pas besoin de remettre toutes les clés, car il va faire une fusion des éléments de (premier niveau)
}, 1000)

export const globalUpdatedEmail = (email) => {
    useAppStore.setState((state) => ({email: email}))
} // On peut le séparer ainsi, au lieu de le faire dans store


// Fonctionalités : 'Middleware' vont permettre de se grèffé sur un store et détecter lorsqu'il y'a des changements, on peut le faire pour sauvegarder les données dans le localStorage
export const useStoreMiddle = create(devtools((set) => ({
    email: 'john@doe.fr',
    updateEmail: (email) => {
        set({email: email})
    }
}))) // devtools : Détecte les changements de valeurs
// Quand le middlewere est activer, ça me permet d'ouvrir le Redux devtools dans l'inspecteur

export const useStorePersist = create(persist((set) => ({
    email: 'john@doe.fr',
    updateEmail: (email) => {
        set({email: email})
    }
}), {name: "app-storage"})) // name : Donne un nom a mon store dans le localStorage
// persist : Va persister mes données dans le localStorage

// -- Auth -- //
export const useAccountStore = create(persist((set) => ({
    account: null, // On met 'null' au lieu 'undefined' à cause du système de localStorage
    setAccount: (account) => {
        set({account: account})
    },
}), {name: 'auth'}))