import { useEffect, useRef } from "react"

export function useDocumentTitle(title) {
    const titleRef = useRef(document.title)

    useEffect(() => {
        return () => {
            document.title = titleRef.current
        }
    }, []) // Lorsque le composant est démonté il remet le titre original, nétoye les éffets de bord

    useEffect(() => {
        document.title = title ? title : titleRef.current
    }, [title])
}