<script setup>
defineProps({
    id: String,
    label: String,
    type: {
        type: String,
        default: 'text'
    }
})
const model = defineModel()
</script>

<template>
    <div>
        <label :for="id">{{ label }}</label>
        <textarea v-if="type === 'textarea'" v-model="model" :id="id" />
        <input v-else :type="type" v-model="model" :id="id">
    </div>
</template>
