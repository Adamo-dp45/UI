<template>
    <div class="container">
         <div v-if="state === 'error'">
            <p class="error">
                Impossible de charger le questionnaire
            </p>
        </div>
        <div :aria-busy="state === 'loading'"> <!-- On n'est occupé, dans le cas de pico css -->
            <!-- {{ quiz }} -->
            <Quiz :quiz="quiz" v-if="quiz" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Quiz from './quiz/Quiz.vue'

// const quiz = ref(null) -- Si on fais l'appel fetch
const quiz = ref({
    "title": "Questionnaire",
    "minimum_score": 4,
    "success_message": "Félicitations",
    "failure_message": "Dommage",
    "questions": [
        {
            "id": 1,
            "question": "Quelle est la capitale de la Côte d'Ivoire ?",
            "choices": [
                "Yamoussoukro",
                "Abidjan",
                "Bouaké",
                "Daloa"
            ],
            "correct_answer": "Yamoussoukro"
        },
        {
            "id": 2,
            "question": "Quel langage est principalement utilisé pour développer avec Vue.js ?",
            "choices": [
                "PHP",
                "Python",
                "JavaScript",
                "Ruby"
            ],
            "correct_answer": "JavaScript"
        },
        {
            "id": 3,
            "question": "Quelle est la commande pour installer Vue avec npm ?",
            "choices": [
                "npm install vue",
                "npm vue install",
                "vue install",
                "npm add vuejs"
            ],
            "correct_answer": "npm install vue"
        },
        {
            "id": 4,
            "question": "Dans quel dossier place-t-on généralement les composants Vue ?",
            "choices": [
                "src/components",
                "public/js",
                "assets/css",
                "node_modules/vue"
            ],
            "answer": "src/components"
        },
        {
            "id": 5,
            "question": "Quel fichier configure Webpack Encore dans un projet Symfony ?",
            "choices": [
                "webpack.config.js",
                "vite.config.js",
                "webpack.js",
                "encore.config.js"
            ],
            "correct_answer": "webpack.config.js"
        }
    ]
})

const state = ref('loading')
/*
    onMounted(() => {
        fetch('http://quiz.json') -- Vue que ça me dit json native
            .then(r => {
                if(r.ok) {
                    return r.json
                }
                throw new Error('Impossible de récupéré le json')
            })
            .then(data => {
                quiz.value = data
                state.value = 'idle' -- Ok
            })
            .catch(e => {
                state.value = 'error'
            })
    })
*/
</script>

<style scoped>
    .error {
        color: red;
        background-color: rgb(255, 202, 202);
        padding: 15px 20px;
        font-weight: bold;
        border-radius: 5px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .container {
        margin-top: 2rem;
    }
</style>