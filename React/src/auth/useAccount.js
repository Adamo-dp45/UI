import { useAuth } from "./useAuth"

export function useAccount() {
    const {account} = useAuth()

    const can = (permission) => {
        return true
    }

    if(!account) {
        throw new Error('User is not authenticated')
    }

    return {
        account,
        can
    }
}