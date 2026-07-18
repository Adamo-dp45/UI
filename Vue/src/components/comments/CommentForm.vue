<script setup>
import { ref } from 'vue'
import Field from '../blog/Field.vue'

const emit = defineEmits(['submit-reply'])
const props = defineProps({ postId: Number }) // Va servir si on veut l'ajouter dans la base de données
const name = ref('')
const body = ref('')

function submit() {
    // alert(`Commentaire ajouté !\nNom: ${name.value}\nMessage: ${body.value}`)
    const reply = {
        id: Date.now(),
        name: name.value,
        email: 'reply@example.com', // mock email for replies
        body: body.value,
        replies: []
    }
    emit('submit-reply', reply)
    name.value = ''
    body.value = ''
}
</script>

<template>
    <form @submit.prevent="submit">
        <Field label="Nom">
            <input v-model="name" required />
        </Field>
        <Field label="Commentaire">
            <textarea v-model="body" required></textarea>
        </Field>
        <button>Envoyer</button>
    </form>
</template>