/**
 * @typedef {{id: number, username: string}} Account
 */

import { useCallback } from "react"
import { useAccountStore } from "../plugins/zustand/store"

export const UNKNOWN = 0
export const AUTHENTICATED = 1
export const GUEST = 2

export function useAuth() {
    const {account, setAccount} = useAccountStore()
    let status

    switch(account) {
        case null:
            status = GUEST
            break
        case undefined:
            status = UNKNOWN
            break
        default:
            status = AUTHENTICATED
            break
    }

    const authenticate = useCallback(async () => {
        fetch('http://localhost:8000/fr/api/plateforme/me', {
            method: 'GET',
            headers: {
                'Accept': 'application/ld+json'
            }
        }).then((response) => {
            if(!response.ok) {
                return
            }
            return response.json()
        }).then((data) => {
            setAccount(data)
        }).catch((error) => {
            setAccount(null)
        })
    }, [])

    const login = useCallback((username, password) => {
        fetch('http://localhost:8000/fr/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: 'include' // 'credentials' permet d'inclure les cookies
        }).then((response) => {
            if(response.ok) {
                return response.json()
            } else if(response.status === 401) { // Au cas ou l'utilisateur n'a pas de cookies mais a le localStorage, on vérifie si il y'a le moindre endpoint qui nous dit l'utilisateur n'a pas accès et il doit être dans un 'useFetch'
                localStorage.removeItem('auth')
                window.location.reload() // Permet de recharger la page
            }
        }).then((data) => {
            console.log(data)
            return setAccount(data)
        }).catch((error) => {
            setAccount(null)
        })
    }, [])

    const logout = useCallback(async () => {
        fetch('http://localhost:8000/fr/api/deconnexion', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        }).then((response) => {
            if(!response.ok) {
                return
            }
            return response.json()
        }).then((data) => {
            setAccount(data)
        }).catch((error) => {
            setAccount(null)
        })
    }, [])

    return {
        account,
        status,
        authenticate,
        login,
        logout
    }
}