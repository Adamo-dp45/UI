<script setup>
import { computed } from 'vue'

const props = defineProps({
    width: {
        type: Number,
        default: 300
    }
})
const style = computed(() => ({
    '--width': `${props.width}px`
}))
</script>

<template>
    <div class="grid" :style="style">
        <slot></slot>
    </div>
</template>

<style>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(var(--width), 1fr));
    gap: 1rem;
}

.grid>* {
    margin: 0;
}
</style>