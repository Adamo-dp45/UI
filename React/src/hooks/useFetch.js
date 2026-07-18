import { useEffect, useRef, useState } from "react";

const emptyObject = {}

/**
 * 
 * @param {string} url 
 * @param {object} options 
 */
export function useFetch(url, options = {}/*emptyObject*/) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    // Ou - aussi useRefSync
    const optionsRef = useRef(options)
    optionsRef.current = options

    useEffect(() => {
        fetch(url, {
            ...optionsRef.current,
            headers: {
                'Accept': 'application/json; charset=UTF-8',
                ...optionsRef.current?.headers
            },
            // credentials: 'include' -- Pour qu'il inclus les cookies
        })
        .then(r => r.json()).then(data => { // On pourait mieux vérifié le r.json voir si il est valide
            setData(data)
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }, [url/*, emptyObject */]) // Pour avoir le même objet tout au long de l'application, sinon va éxécuter en boucle le useFetch car il va crée un nouvel objet à chaque fois

    // [] Fais le chargement dès que le composant est monté
    // [url] Fais le chargement dès que l'url change pour la partie Single

    return {
        loading,
        data,
        error,
        setData // Pour pouvoir modifier les données
    }
}

// ----- //
/**
 * Api
 
class ApiErrors {
    constructor(errors) {
        this.errors = errors
    }
}

/**
 * 
 * @param {string} url 
 * @param {object} options 
 *
async function apiFetch(url, options = {}) {
    options = {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
        },
        ...options,
    }
    if(options.body !== null && typeof options.body === 'object' && !(options.body instanceof FormData)) {
        options.headers['Content-Type'] = 'application/json'
        options.body = JSON.stringify(options.body)
    }
    const response = await fetch(url, options)
    if(response.status === 204) {
        return null
    }
    const data = await response.json()
    if(response.ok) {
        return data
    } else {
        if(data.errors) {
            throw new ApiErrors(data.errors)
        }
    }
}
*/