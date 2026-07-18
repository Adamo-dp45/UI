<script setup>
import { computed } from 'vue'

const props = defineProps({
    post: Object
})

// const link = computed(() => `#blog:${props.post.id}`) -- Hash
const link = computed(() => `/blog/${props.post.id}`) // Ou..
/* -- Si on n'a nommé la route
    const link = computed(() => ({
        name: 'post.show',
        params: {
            id: props.post.id
        }
    }))
*/
const thumbnail = computed(() => `https://picsum.photos/id/${props.post.id}/280/180`) // 'computed' vu que ça dépend de post
</script>

<template>
    <article class="post">
        <!-- Hash
            <a :href="link">
                <img :src="thumbnail" alt="">
            </a>
        -->

        <RouterLink :to="link"> <!-- Vue router -->
            <img :src="thumbnail" alt="">
        </RouterLink>
        <h2>
            <RouterLink :to="link">
                {{ post.title }}
            </RouterLink>
            <!--
                <a :href="link">
                    {{ post.title }}
                </a>
            -->
        </h2>
        <p> 
            {{ post.body.slice(0, 80) }}
        </p>
    </article>
</template>

<style>
.post {
    margin: 0;
    align-self: flex-start;
}

.post a {
    text-decoration: none;
}

.post img {
    width: calc(100% + 2 * var(--pico-block-spacing-horizontal));
    max-width: none;
    height: auto;
    margin: calc(var(--pico-block-spacing-horizontal) * -1);
    margin-bottom: 1rem;
}
</style>