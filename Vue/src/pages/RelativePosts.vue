<template>
    <h4>Article relatifs</h4>
    <ul v-if="data">
        <li v-for="post in data">
            <RouterLink :to="{ name: 'post.show', params: { id: post.id }}">{{ post.title }}</RouterLink>
        </li>
    </ul>
</template>

<script setup>
import { computed } from "vue"
import { useFetch } from "../composable/useFetch.js"

const {data, state} = useFetch(computed(() => 'https://jsonplaceholder.typicode.com/posts?_limit=5'))
</script>