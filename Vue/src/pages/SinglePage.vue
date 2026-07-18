<template>
    <div :aria-busy="state === 'loading'">
        <article v-if="post">
            <h1>{{ post.title }}</h1>

            <p>
                <img :src="thumbnail" alt="">
            </p>

            <p>
                {{ post.body }}
            </p>

            <p>
                <button class="secondary" @click="onEdit">Editer</button>
            </p>

            <PostForm :post="formData" v-if="formData" @close="formData = null" @save="onSave" />
        </article>

        <p v-else-if="state === 'loading'">Chargement...</p>
        <p v-else-if="state === 'error'">Impossible de charger l'article depuis le serveur</p>
    </div>
</template>

<script setup>
import PostForm from '../components/PostForm.vue'
import { useFetch } from '../composable/useFetch.js'
import { computed, ref, toRaw } from 'vue'
import { usePage } from '../composable/usePage'
import { useRoute } from 'vue-router'

/* -- On peut utiliser le 'usePage' ici pour avoir le param
    const { param } = usePage()
    const id = ref(param.value)
*/
const props = defineProps({
    id: String
})
/* -- On peut aussi utiliser 'useRoute' pour récupérer l'id si on n'utilise pas les props dans 'routes.js'
    const route = useRoute()
    route.params.id
*/
const formData = ref(null)
const { state, data: post } = useFetch(computed(() => `https://jsonplaceholder.typicode.com/posts/${props.id}`))
const thumbnail = computed(() => `https://picsum.photos/id/${post.value.id}/800/600`)

const onEdit = () => {
    formData.value = structuredClone(toRaw(post.value)) // Ici on crée un clone de notre article pour que lui soit modifier sans altérer l'artcile original, 'toRaw' débarasse l'objet du proxy de vue pour qu'on est l'original ensuite on clone
}
const onSave = (newPost) => {
    formData.value = null
    post.value = newPost
}
</script>