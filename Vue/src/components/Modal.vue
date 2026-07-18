<script setup>
import { onMounted, ref } from 'vue'

const dialog = ref()
defineProps({
    title: String
})
const emits = defineEmits(['close'])
onMounted(() => {
    dialog.value.show()
})
</script>

<template>
    <dialog ref="dialog"> <!-- Pour que notre dialog soit une boite modal et avoir le focus on utilise '.show' plutôt que l'attribut 'open' -->
        <article>
            <header>
                <button aria-label="Fermer" rel="prev" @click="emits('close')"></button>
                <h2>{{ title }}</h2>
            </header>
            <slot></slot>
        </article>
    </dialog>
</template>