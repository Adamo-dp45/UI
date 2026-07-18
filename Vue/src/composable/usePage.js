import { onMounted, onUnmounted, ref } from "vue"

export function usePage() {
    const hash = parseHash()
    const page = ref(hash[0])
    const param = ref(hash[1])

    let removeListener;

    onMounted(() => {
        const listener = () => {
            [page.value, param.value] = parseHash()
        }
        window.addEventListener("hashchange", listener)
        removeListener = () => {
            window.removeEventListener("hashchange", listener)
        }
    }) // Dès qu'on fais un 'addEventListener' il faut penser à nettoyer les choses

    onUnmounted(() => { // Techniquement le composant App ne sera jamais démonté mais on prend le reflexe de le faire
        removeListener()
    })

    return {
        page,
        param,
    }
}

function parseHash() {
    return window.location.hash.replace("#", "").split(":") // 'split' va permettre de renvoyer 2 valeurs 'v:v'
    /* - Ou
        const hash = window.location.hash.slice(1)
        const [p, id] = hash.split(':')
    */
}