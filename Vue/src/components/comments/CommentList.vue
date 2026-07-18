<script setup>
    /* -- Pour l'utiliser dans le SinglePage
        <CommentList :post-id="id" /> -- 'post' au lieu de 'id'
        watch(() => id, (newId) => { -- On lui envoie une fonction qui renvoi la valeur à observer car elle peut changer
            id.value = newId
        })
    */
    import { ref, onMounted } from 'vue'
    import Loader from './Loader.vue'
    import CommentForm from './CommentForm.vue'
    import CommentItem from './CommentItem.vue'

    const props = defineProps({
        postId: Number
    })

    const comments = ref([])
    const loading = ref(true)

    onMounted(async () => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${props.postId}/comments`)
        // comments.value = await res.json()
        data = await res.json()
        comments.value = data.map(c => ({ ...c, replies: [] })) // Pour ajouter un tableau replies vide à chaque commentaire
        loading.value = false
    })

    function addReply(parentId, reply) {
        const comment = comments.value.find(c => c.id === parentId)
        if (comment) {
            comment.replies.push(reply)
        }
    }
</script>

<template>
    <section class="comments">
        <h2>Ajouter un Commentaire</h2>
        <CommentForm :postId="postId" />
        <h3>Commentaires</h3>
        <Loader v-if="loading" />
        <ul v-else>
            <!--
                <li v-for="comment in comments" :key="comment.id">
                    <p><strong>{{ comment.name }}</strong> ({{ comment.email }})</p>
                    <p>{{ comment.body }}</p>
                </li>
            -->
            <CommentItem
                v-for="comment in comments" 
                :key="comment.id" 
                :comment="comment" 
                @add-reply="addReply"
            />
        </ul>
    </section>
</template>

<style scoped>
    .comments {
        margin-top: 2rem;
    }

    .comments ul {
        list-style: none;
        padding: 0;
    }

    .comments li {
        margin-bottom: 1rem;
        border-bottom: 1px solid #ccc;
        padding-bottom: 1rem;
    }
</style>
