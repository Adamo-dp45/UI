import { useOnline } from "./hooks/useOnline"

// -- Permet de brancher un état react à un élément qui provient de l'extérieur

export default function ChatIndicator() {
    const isOnline = useOnline()
    return <h1>
        {isOnline ? 'En ligne' : 'Hors ligne'}
    </h1>
}