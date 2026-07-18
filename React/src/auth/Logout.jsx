import { useState } from "react"

/**
 * 
 * @param {{onLogout: () => Promise<void>}} 
 */
export function Logout({ onLogout }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleClick = async () => {
        setError(null)
        setLoading(true)
        try {
            await onLogout()
        } catch(e) {
            setError(e.message || 'Erreur lors de la déconnexion')
        } finally {
            setLoading(false)
        }
    }

    /*
        <Logout onLogout={handleLogout} />
        const handleLogout = async () => {
            return new Promise((resolve) => setTimeout(resolve, 1000)) // Simuler un appel Api de logout
        }
    */

    return <>
        <button
        onClick={handleClick}
        disabled={loading}
        >
            {loading ? 'Déconnexion...' : 'Se déconnecter'}
        </button>
        {error && <p>{error}</p>}
    </>
}