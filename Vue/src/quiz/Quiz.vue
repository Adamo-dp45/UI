<script setup>
    import { ref, computed } from "vue"
    import Progress from "./Progress.vue"
    import Question from "./Question.vue"
    import Recap from "./Recap.vue"

    const props = defineProps({
        quiz: Object
    })

    const step = ref(0)
    const question = computed(() => props.quiz.questions[step.value]) // Car je me dis que ça dépend d'autre valeur réactive, et je prend la question qui correspond à l'étape

    const state = ref('question')
    // Va avoir besoin d'incrémenté l'étape et mémorisé les réponses choisis par l'utilisateur
    const answers = ref(props.quiz.questions.map(() => null))
    const addAnswer = (answer) => {
        answers.value[step.value] = answer // Avoir la question choisi
        if(step.value === props.quiz.questions.length - 1) { // Sinon à la dernière question va mettre 6/5
            state.value = 'recap' // On vas faire la moyenne
        } else {
            step.value++ // Aller à la page suivante
        }
    }
</script>

<template>
    <div>
        <h1>{{ quiz.title }}</h1>
        <Progress :value="step" :max="quiz.questions.length - 1" /> <!-- Taille du nombre de question - 1 car on n'a fais commencé step à 0 -->
        <Question :question="question" v-if="state === 'question'" @answer="addAnswer" :key="question" /> <!-- @answer vient du composant Question emits, Quand key change ça devient un nouveau composant -->
        {{ answers }}
        <Recap v-if="state === 'recap'" :answers="answers" :quiz="quiz" />
    </div>
</template>