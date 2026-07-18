<script setup>
    import { onMounted, onUnmounted, ref } from 'vue'

    const time = ref(0)
    const div = ref(null) // Pour faire une liaison avec le div comme un id, template ref
    const size = ref({width: 0, height: 0})

    let timer 
    onMounted(() => {
        console.log(div.value) // Va me donner l'élément html
        const rect = div.value.getBoundingClientRect() // Permet d'obtenir le rectangle que représente l'élémnt
        size.value = {width: rect.width, height: rect.height}

        timer = setInterval(() => {
            console.log('Incrément')
            time.value++
        }, 1000)
    })

    onUnmounted(() => {
        clearInterval(timer)
    })

    /*
        - Avec 'onMounted' même si je masque le composant monter le code à l'intérieur continura à s'executer, le 'onUnmounted' arrête l'incrémentation lorsque le composant est masqué

        - Si on utilise le 'onMounted' pour faire des appel réseaux qui peuvent être lent et que le composant peut être masquer avant que le résultat reviènne, ça peut petre intéressent d'avoir un système qui nettoie et pareille si on utilise le 'onMounted' pour un addEventlistener pour écouter quelque chose il faut penser à faire un removeListerner dans la partie 'onUnmounted' sinon on va garder un effet de bord en mémoire
    */
</script>

<template>
    <div ref="div">
        Temps : {{ time }}
        Largeur {{ size.width }}, Hauteur {{ size.height }}
    </div>
</template>