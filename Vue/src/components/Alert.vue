<script setup>
import { computed } from 'vue'

const props = defineProps({
    type: String
})
const emits = defineEmits(['close']) // On émit l'évènement close
const classes = computed(() => `alert alert-${props.type}`) // On peut aussi faire :class="['alert', alert-${type}]"
</script>

<template>
    <div
        :class="classes"
        role="alert"
    >
        <slot></slot>
        <button @click="emits('close')" aria-label="Close">&times;</button>
    </div>
</template>

<style>
.alert {
    position: relative;
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;
}

.alert-danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}

.alert button {
    background: transparent;
    border: none;
    padding: .25rem;
    position: absolute;
    top: 0.5rem;
    right: 1.25rem;
}
</style>