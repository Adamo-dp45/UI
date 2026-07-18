import { createApp } from 'vue'
import App from './App.vue'
import TodoList from './TodoList.vue'
import Watcher from './Watcher.vue'
import Quiz from './TpQuiz.vue'
import Transition from './transition/Transition.vue'
import Vue from './VueComponents.vue'
import Style from './Style.vue'
import Blog from './Blog.vue'

import { createRouter, createWebHistory, createWebHashHistory, useRoute } from 'vue-router'
import { routes } from './routes'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"
import { QueryCache, VueQueryPlugin } from '@tanstack/vue-query'

const router = createRouter({
    history: createWebHistory(), // Permet de définir le type d'historique qu'on veut utiliser, 'createWebHashHistory' va utiliser les hash
    routes
})
/*
    - On notera qu'en production faudra redirigé toutes les liens de notre site vers index.html
    - On peut avoir plusieurs RouterView et on peut les nommées
*/

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const queryClient = new QueryCache({ // Config globale Tanstack
    defaultOptions: {
        queries: {
            staleTime: 5000 // Toutes les requêtes soit considérée comme périmé qu'au bout de 5s
        }
    }
})

const app = createApp(Blog)
app.use(router) // 'use' permet de charger des plugins
// app.use(createPinia())
app.use(pinia)
app.use(VueQueryPlugin)
// app.use(VueQueryPlugin, {queryClient: queryClient})
app.mount('#blog')

/*
    if (page.value.page === 'profil' && !user.value) {
        return LoginPage
    } -- Avec le store gloable
*/

createApp(App).mount('#app')
createApp(TodoList).mount('#todo')
createApp(Watcher).mount('#watch')
createApp(Quiz).mount('#quiz')
createApp(Transition).mount('#trans')
createApp(Vue).mount('#comp')
createApp(Style).mount('#style')