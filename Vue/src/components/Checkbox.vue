<script setup>
defineProps({
    // label: String,
    label: {
        type: String,
        // required: true
        // default: ''
    }
})
/* - Si on n'utilise pas les props on peut s'en passer
    const props = defineProps({
        label: String
    })
    console.log(props)
*/

const emits = defineEmits(['check', 'uncheck']) // Faire remonter les informations grâce au évènements
const onChange = (e) => {
    if(e.currentTraget.checked) {
        emits('check', e.currentTraget)
    } else {
        emits('uncheck', e.currentTraget)
    }
}
const model = defineModel()
</script>

<template>
    <label>
        <input type="checkbox" v-model="model" @change="onChange">
        {{ label }}
    </label>
</template>