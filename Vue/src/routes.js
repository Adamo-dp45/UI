import HomePage from "./pages/HomePage.vue"
import ContactPage from "./pages/ContactPage.vue"
import BlogPage from "./pages/BlogPage.vue"
import NotFoundPage from "./pages/NotFoundPage.vue"
import BlogLayout from "./pages/BlogLayout.vue"
import SinglePage from "./pages/SinglePage.vue"
import RelativePosts from "./pages/RelativePosts.vue"

/*
    - Dans le système d'imbrication vue router ajoute des class sur le lien lorsque la route est active 
*/

export const routes = [
    {path: '/', component: HomePage, name: 'home'},
    {path: '/contact', component: ContactPage, name: 'contact'},
    // {path: '/blog', component: BlogPage, name: 'posts.index'},
    // {path: '/blog/:id(\\d+)', component: SinglePage, props: true, name: 'post.show'}, -- 'props' permet de ne pas utiliser le 'useRoute' de vue-router dans 'SinglePage' et le composant recevra dans ses props les paramètres qui sont dans l'url

    // -- Chemin imbriqué
    {path: '/blog', component: BlogLayout, children: [ // Va gérér automatiquement le système d'imbrication, va utiliser le 'BlogLayout' qui utilisera le 'RouterView' pour afficher le 'SinglePage' ou 'BlogPage'
        {path: '', component: BlogPage, name: 'posts.index'},
        {
            path: ':id(\\d+)', // On peut choisir d'avoir des routes imbriquées qui ne partage pas le même segment, en faisant /post/:id..
            components: {
                default: SinglePage,
                sidebar: RelativePosts // Le 'RouterView' nommer à l'intérieur
            },
            props: { // 'props' en objet sinon va envoyer le props id à tous ces composants
                default: true,
                sidebar: false
            },
            name: 'post.show'

            /* -- Pour le single seulement
                path: ':id(\\d+)',
                component: SinglePage,
                props: true,
                name: 'post.show'
            */
        }
    ]},

    {path: '/:pathMatch(.*)*', component: NotFoundPage} // 'pathMatch' params de n'importe quel type et peut être repéter un nombre incalculable de fois et permet de tous capturer sachant que si une url est capturer avant on arrivera pas ce niveau
]

// Ensuite dans le main.js