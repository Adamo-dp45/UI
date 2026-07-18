import { defineStore, acceptHMRUpdate } from "pinia"
import { computed, ref } from "vue"

export const useTheme = defineStore('theme', () => {
    const darkTeme = ref(false)
    const switchTheme = () => {
        darkTeme.value = !darkTeme.value
    }
    return {
        isDark: darkTeme,
        switchTheme
    }
}, {persist: true}) // Utilise le plugin 'persisted'

/*
    - Dans Footer.vue
        - const store = useTheme()
        - {{ store.isDark ? 'Light' : 'Dark' }} @click="store.switchTeme"
    - Dans App.vue
        - const theme = computed(() => store.isDark ? darkTeme : null) -- <tag :theme="theme"></tag>

    - Pour persister l'état dans le système de stockage du navigateur - pinia-plugin-persistedstate
*/