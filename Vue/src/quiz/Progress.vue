<script setup>
    defineProps({
        value: Number,
        max: Number
    })
</script>

<template>
    <div>
        Etape {{ value + 1 }} / {{ max + 1 }} <!-- On peut ne pas additionner c'est juste pour avoir 1/5 au lieu 0/4 -->
        <progress :value="value" :max="max"></progress>
    </div>
</template>