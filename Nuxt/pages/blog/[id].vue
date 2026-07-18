<template>
    <main>
        <p>Article {{ route.params.id }}</p>
        <div v-if="post">
            <p>{{ post.title }}</p>
            <p>
                {{ post.body }}
            </p>
        </div>
        <div v-else>Chargement</div>
    </main>
</template>

<script setup>
    const route = useRoute()
    const {data: post, status} = await useFetch(() => "" + route.params.id, { /*
            - 'status' l'état du chargement, utile pour afficher un loader mais.. aussi 'post v-else'
        */
        lazy: true /*
            - Pour charger les données de manière 'async' côté client donc il n'a pas à attendre pour afficher la page
        */
    }) /*
        - 'useAsyncData()' pour récupérer des données via une libraire.. comme le 'useFetch' dispose d'une fonction qui permet de récup.. mais il nécéssaire d'avoir un code 'isomorphisse' 
    */
    useSeoMeta({
        title: () => post.value?.title /*
            - Si la valeur est réactive on le met dans une fonction
        */
    })
</script>