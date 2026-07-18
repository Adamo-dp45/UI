<template>
    <Header />

    <!-- Hash
        <div class="container">
            <ContactPage v-if="page === 'contact'" />
            <BlogPage v-else-if="page === 'blog'" />
            <HomePage v-else-if="page === ''" />
            <SinglePage v-else-if="page === 'blog'" :id="param" />
            <NotFoundPage v-else />
        </div>
    -->

    <!-- Vue router -->
    <RouterView /> <!-- On n'est pas obligé de l'importer ici, ensuite je vais créer un fichier routes.js -->
</template>

<script setup>
import Header from './components/Header.vue'
import HomePage from './pages/HomePage.vue'
import ContactPage from './pages/ContactPage.vue'
import BlogPage from './pages/BlogPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import { usePage } from './composable/usePage.js'
import SinglePage from './pages/SinglePage.vue'

const { page, param } = usePage()

/*
    Créer une 'single page application', L'objectif est de créer un site multipage qui contiendra 4 pages :
        - Une page d'accueil
        - Une page qui liste des articles (on utilisera Json placeholder pour simuler une api)
        - Une page article qui affichera un article en particulier.
        - Une page contact

    Sur la page d'un article on permettra l'édition d'un article à travers un formulaire qui sera disponible dans une boîte de dialogue

    Etapes :
        - Créer un composant <Header> qui permettra d'afficher l'en tête du site
        - Créer une fonction composable usePage() qui permet de déterminer la page à afficher à partir du hash de la page
        - Créer un composant qui servira de page carrefour, et qui affichera le bon composant en fonction de la page renvoyée par usePage()
        - Pour la page articles, mettre en place un système qui permet de récupérer les articles depuis une api. Pour tester, on utilisera le chemin /posts de jsonplaceholder
        - Pour la page d'article on utilisera un format d'URL particulier (le hash #post:3) et on modifiera usePage() pour gérer les paramètres
        - On récupèrera ensuite ce paramètre sur la page de l'article pour charger les données correspondant à l'article à afficher
        - Enfin, sur cette même page on mettra en place la boite de dialogue (en utilisant la balise <dialog>)
*/
</script>

<style>
.container {
    padding-top: 2rem;
    max-width: calc(100vw - 4rem);
}
</style>
