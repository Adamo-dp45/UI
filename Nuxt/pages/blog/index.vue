<template>
    <h1>Blog</h1>
    <div v-if="!posts">
    <article v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body.slice(0, 100) }}</p>
        <p>
            <NuxtLink :to="`/blog/${post.id}`">Voir l'article</NuxtLink> <!-- ':to' vu qu'il va être dynamique -->
        </p>
    </article>
    </div>
    <p v-else>Aucun article</p>
</template>

<script setup>
    const {data: posts} = await useFetch('') /*
        - Le 'useFetch' ici est 'isomorphisse' va être exécuter à la fois côté serveur et client
            - Le principe est que si on charge la page blog directement le serveur va se charger de récupérer les données et généré la page html, si on fais une navigation côté client c'est le client qui récupérer le json et généré l'html 
    */
</script>