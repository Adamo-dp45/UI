<script setup>
import { ref } from 'vue'
import CommentForm from './CommentForm.vue'

const props = defineProps({
    comment: Object
})

const emit = defineEmits(['add-reply'])
const showReplyForm = ref(false)

function toggleReplyForm() {
    showReplyForm.value = !showReplyForm.value
}

function handleReply(reply) {
    emit('add-reply', props.comment.id, reply)
    showReplyForm.value = false
}
</script>

<template>
    <li class="comment-item">
        <p><strong>{{ comment.name }}</strong> ({{ comment.email }})</p>
        <p>{{ comment.body }}</p>

        <button @click="toggleReplyForm">
            {{ showReplyForm ? 'Annuler' : 'Répondre' }}
        </button>

        <CommentForm 
            v-if="showReplyForm" 
            :post-id="comment.postId" 
            @submit-reply="handleReply" 
        />

        <ul v-if="comment.replies.length" class="replies">
            <CommentItem
                v-for="reply in comment.replies" 
                :key="reply.id" 
                :comment="reply" 
                @add-reply="$emit('add-reply', $event.parentId, $event.reply)"
            />
        </ul>
    </li>
</template>

<style scoped>
    .comment-item {
        margin-bottom: 1rem;
        border-bottom: 1px solid #ccc;
        padding-bottom: 1rem;
    }

    .replies {
        list-style: none;
        padding-left: 1.5rem;
        margin-top: 1rem;
        border-left: 2px solid #eee;
    }

    button {
        margin-top: 0.5rem;
        background: none;
        border: none;
        color: #42b983;
        cursor: pointer;
    }

    button:hover {
        text-decoration: underline;
    }
</style>