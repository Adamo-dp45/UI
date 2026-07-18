<template> <!-- DarkMode -->
    <slot></slot> <!-- On mais les slot enfant -->
</template>

<script setup>
import { provide, readonly } from 'vue'

const darkMode = ref(true) // Pour qu'il soit dynamique
// provide('darkMode', true) -- Static
provide('darkMode', darkMode)

// Parfois on voudra une valeur réactive pour des raisons particulière, on ne veut pas que les enfants puissue là changer, ça peur méner à des effets de bord
provide('darkMode', darkMode(darkMode)) // La ref est en lecture seule, les composants enfants ne pourront pas là changer
// Ce qu'on préféra faire
provide('darkMode', {
    darkMode: darkMode(darkMode),
    toggleDarkMode: () => {
        darkMode.value = !darkMode.value
    }
})
// Pour l'utiliser
const {darkMode} = inject('darkMode')
const {toggleDarkMode} = inject('darkMode')
</script>

<template>
    <DarkMode> <!-- Nom du composant qui provide -->
        <Sidebar /> <!-- Ici, si j'entoure ce composant avec mon DarkMode qui lui provide une valeur true, notre composant aura lui aussi une valeur true lorsqu'il font un inject -->
    </DarkMode>
</template>

<script setup>
import { inject, unref } from 'vue'

const darkMode = inject('darkMode')
console.log(darkMode)

// Dynamique, vue que je peux m'attendre à une valeur ou une ref
unref(darkMode) // Maintenant cette ref peut changer
// ---
<Button @click="toggleDarkMode" />
const toggleDarkMode = () => {
    darkMode.value = !darkMode
}
</script>

<script>
// App principale, va l'injecter dans toute notre application
provide('darkMode', false)
</script>