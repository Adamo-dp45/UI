<template>
    <label :for="id" :class="classes">
        <input :disabled="disabled" :id="id" type="radio" name="answer" :value="value" v-model="model" @change="onChange">
        {{ value }}
    </label>
</template>

<script setup>
    import { computed } from "vue"

    const props = defineProps({
        id: String,
        disabled: Boolean,
        value: String,
        correctAnswer: String
    })

    const model = defineModel()
    const emits = defineEmits(['change'])
    const classes = computed(() => ({ // Ici on vas ajouter des styles reponses selon la situation
        disabled: props.disabled,
        right: props.disabled && props.value === props.correctAnswer,
        wrong: props.disabled && props.value !== props.correctAnswer && model.value === props.value
    }))

    const onChange = (e) => {
        emits('change', e)
    }
</script>

<style>
    .disabled {
        opacity: .5;
    }
    .right {
        opacity: 1;
        color: green;
    }
    .wrong {
        opacity: 1;
        color: red;
    }
</style>