<template>
    <h1>Blog</h1>
    <Loader v-if="state === 'loading'" />
    <div v-if="state === 'error'">Impossible de charger les articles depuis le serveur</div>
    <div v-else :aria-busy="state === 'loading'"> <!-- 'aria-busy' va affiché un loader si on utilise picocss -->
        <Grid v-if="posts">
            <PostCard v-for=" post in posts" :key="post.id" :post="post" />
        </Grid>
    </div>
    <div class="pagination">
        <button @click="page--" :disabled="page === 1">Page précédente</button>
        <button @click="page++">Page suivante</button>
    </div>
</template>

<script setup>
import PostCard from '../components/PostCard.vue'
import Grid from '../components/Grid.vue'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useFetch } from '../composable/useFetch.js'
import Loader from '../components/Loader.vue'
import { useRoute, useRouter } from 'vue-router'

const page = ref(1)

const { state, data: posts } = useFetch(
    computed(() => `https://jsonplaceholder.typicode.com/posts?_limit=6&_page=${page.value}`)
) // 'computed' car on n'a une valeur réactive à l'intérieur

/* -- Vue router
    const router = useRouter() -- Permet de naviguer ou manipuler les routes
    router.replace()
    router.push
*/
</script>

<style>
.pagination {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>