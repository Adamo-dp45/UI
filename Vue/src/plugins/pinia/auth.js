import { defineStore, StoreToRef, acceptHMRUpdate, storeToRefs } from "pinia"
import { computed, ref } from "vue"
import { useRouter, useRoute } from "vue-router"

export const useAuth = defineStore('auth', () => {
    const user = ref(null)
    const isAuthenticated = computed(() => user !== null)
    const authenticate = () => {
        user.value = {
            username: 'John Doe'
        }
    }

    /*
        - On peut aussi utiliser des données qui proviennent d'autres fonctions composables
        - On peut utiliser un autre store à l'intérieur de notre store
    */
    const route = useRoute()

    return {
        user,
        url: computed(() => route.fullPath()),
        isAuthenticated,
        authenticate
    }
}) // -- Maintenant partout dans mon application je vais pouvoir récupérer des informations

const store = useAuth() // LoginPage.vue
store.authenticate()
/*
    - Dans Header.vue
        - v-if="store.user === null" Se connecter
        - v-else store.user.username Ou v-if="store.isAuthenticated" {{ store.user.username }}
        - {{ store.url }} /blog /home ..

    - Si on récupère le store de cette manière on vas perdre la valeur réactive
        - const { user, authenticate } = useAuth()

    - Le store un proxy et quand on accède à la valeur user on obtient directement la valeur même si on a mis une ref, si pour une autre raison on veut obtenir une ref, On le fais avec la fonction 'storeToRefs'
*/
const { user } = storeToRefs(store) // Va nous donner un objet qui contient des ref, et aussi lorsqu'on l'utilise il transforme en ref que les valeurs qui sont des ref

// -- Le rechargement à chaud avec pinia
if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
} // On peut faire des changements à chaud dans mon store il se fais instantannement