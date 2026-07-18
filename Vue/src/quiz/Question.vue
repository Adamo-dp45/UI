<script setup>
    import { ref, computed, watch, onMounted, onUnmounted } from "vue"
    import { shuffleArray } from "../functions/array.js"
    import Answer from "./Answer.vue"

    const props = defineProps({
        question: Object
    }) // Le composant 'Question' va devoir informer le composant parent des changements, çe n'est pas lui qui responsable du fait que quand on clique sur question suivante il nous affiche la suivante te quand on n'a pas coché le button ne s'affiche pas
    const emits = defineEmits(['answer']) // Un evènement pour dire que j'ai repondu à une question, mais le composant 'Quiz' ce qui l'intérèsse c'est de savoir quelle reponse on n'a choisi, veut dire que lorsque je vais appelé emits je derais lui passer la reponse choisi par l'utilisateur
    const answer = ref(null)
    const hasAnswer = computed(() => answer.value !== null) // Si il est null c'est qu'on n'a pas encore coché de case

    /*
        watch(() => props.question, () => { -- Va observer si la question change et met la reponse à null sinon quand on vas choisir la reponse le button ne sera plus désactiver pour la question suivante
            answer.value = null
        }) -- On peut aussi donner cette responsabilité au composant Quiz avec un v-model, ou aussi le faire à travers une :key lors de l'utilisation de ce composant dans ce cas dès que la clé change ce composant est renouvellé
    */

    let randomChoices = computed(() => shuffleArray(props.question.choices)) // Rendre les choix aléatoire
    /*
        Pour désactiver les autres reponses lorsque l'utilisateur aura fais son choix avec le composant 'Answer', on vas se passer du button suivant et utiliser un timer
    */
    let timer
    const onAnswer = () => {
        // answer.value = e.currentTarget.value -- à cause du v-model
        clearTimeout(timer)
        timer = setTimeout(() => {
            emits('answer', answer.value)
        }, 1000)
    }

    onMounted(() => {
        timer = setTimeout(() => {
            answer.value = ''
            onAnswer() // Va permettre redémarer un petit timer de 1 seconde
        }, 8000);
    })
    onUnmounted(() => {
        clearTimeout(timer)
    })
</script>

<template>
    <div class="question">
        <h3>{{ question.question }}</h3>
        <ul>
            <li v-for="(choice, index) in randomChoices" :key="choice"> <!-- On peut récupérer l'index, et je n'utilise pas ça question.choices pour pouvoir mélenger les reponses -->
                <!--
                <label :for="`answer${index}`">
                    <input :id="`answer${index}`" type="radio" name="answer" v-model="answer" :value="choice">
                    {{ choice }}
                </label>
                -->
                <Answer
                    :id="`answer${index}`"
                    :disabled="hasAnswer"
                    :value="choice"
                    v-model="answer"
                    @change="onAnswer"
                    :correctAnswer="question.correct_answer"
                /> <!-- hasAnswer est ce qu'on a une reponse -->
            </li>
        </ul>
        {{ answer }}
        <!--
        <button :disabled="!hasAnswer" @click="emits('answer', answer)">Question suivante</button> -- La il pourra passer des infos au composant parent -->
    </div>
</template>

<style scoped>
.question {
    padding-top: 1rem;
}

button {
    margin-left: auto;
    display: block;
}
</style>