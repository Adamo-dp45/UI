<script setup>
import { ref } from 'vue'
import fadeSlide from './fadeSlide.vue'

const showSpoler = ref(false)
const toggleSpoiler = () => showSpoler.value = !showSpoler.value
</script>

<template>
    <button @click="toggleSpoiler">Afficher / Masquer</button>

    <!-- - Provient de vue
        <Transition name="slide">
            <div class="spoiler" v-if="showSpoler">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo quis, ipsum id non reprehenderit itaque, quidem hic magni, veniam optio fugit natus. Commodi ea voluptatibus ad et aut dolorum expedita!
            </div>
        </Transition>
    -->

    <fadeSlide>
        <div class="spoiler" v-if="showSpoler">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo quis, ipsum id non reprehenderit itaque, quidem hic magni, veniam optio fugit natus. Commodi ea voluptatibus ad et aut dolorum expedita!
        </div>
        <div v-else>
            Je m'affiche avant
        </div>
    </fadeSlide>
</template>

<style>
    .spoiler {
        padding: 20px;
        border: 1px solid #FFFFFF58;
        transition: .5s;
    }

    /* - Si on a donné un nom a notre animation 
        .slide-enter-from { -- Quand l'élément arrive 
            opacity: 0;
            transform: translateX(10px);
        }
        .slide-leave-to { -- Quand il part 
            opacity: 0;
            transform: translateX(-10px);
        }
        .v-enter-from,
        .v-leave-to {
            opacity: 0;
        }
    */
</style>