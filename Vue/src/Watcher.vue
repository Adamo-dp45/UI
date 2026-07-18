<script setup>
    import { ref, watch, watchEffect } from 'vue'
    import { useTimer } from './composable/useTimer' // Pour séparer de la logique

    // -- Permet d'observer les changements de valeur d'une variable réactive et on vas pouvoir faire des opérations

    const name = ref('')
    const page = ref({
        title: ''
    })
    const { time, reset } = useTimer()

    /* - Prend en paramètre la nouvelle valeur et l'ancienne valeur
        watch(name, (newValue, oldValue) => {
            document.title = newValue
        }, {immediate: true}) -- L'option immediate pour exécuter au premier chargement, notre titre sera vide avant qu'on commence a taper dans le champ 

        watch(() => page.value.title, (newValue, oldValue) => { -- Ici on lui envoie une fonction qui renvoi la valeur à observer car elle peut changer
            document.title = newValue
        }) -- Ou..
    */

    watchEffect(() => {
        document.title = page.value.title
    })
</script>

<template>
    <!-- <input type="text" v-model="name"> -->
    <input type="text" v-model="page.title">

    Temps écoulé : {{ time }}
    <button @click="reset">Reset</button>
</template>