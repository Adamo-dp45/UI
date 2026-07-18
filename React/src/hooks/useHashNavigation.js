import { useEffect, useState } from "react";

export function useHashNavigation() {
    const [hash, setHash] = useState(location.hash)
    useEffect(() => {
        const handleChangeHash = () => {
            setHash(location.hash)
        }
        window.addEventListener('hashchange', handleChangeHash)
        return () => {
            window.removeEventListener('hashchange', handleChangeHash)
        }
    })

    const cleanedHash = hash.replaceAll('#', '').toLowerCase()

    return {
        page: cleanedHash ? cleanedHash.split(':')[0] : 'home',
        param: cleanedHash.split(':')[1]
    }
}