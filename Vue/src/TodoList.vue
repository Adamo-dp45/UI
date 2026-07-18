<script setup>
    import { onMounted, ref, computed } from 'vue'
    import Checkbox from './components/Checkbox.vue'
    import Timer from './Timer.vue'

    const showTimer = ref(true)
    const NewTodo = ref('')
    const hideCompleted = ref(false)

    const todos = ref([
        {
            title: 'Tâche de test',
            completed: true,
            date: 1
        },
        {
            title: 'Tâche à faire',
            completed: false,
            date: 2
        }
    ])

    /* - Cycle de vie des composants : Permet de netoyer les effets de bord
        onMounted(() => { -- Va récupéré les informations dépuis le serveur et il va remplir notre liste de tâche et il ne fera qu'au montage
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(r => r.json)
            -- .then(v => todos.value = v)
            .then(v => todos.value = v.map(todo => ({...todo, date: todo.id}))) -- Permet de remplacer le nom d'un champ
        })
    */

    const addTodo = () => {
        todos.value.push({ // Va ajouter un nouvel élément dans notre ref
            title: NewTodo.value,
            completed: false,
            date: Date.now()
        })
        NewTodo.value = '' // Après avoir soumis le form je vide le champ
    }

    const sortedTodos = computed(() => { // Permet d'avoir notre tableau todos dans le bon ordre, affiche les tâches à faire en premier
        console.log('computed')
        const sorted = todos.value.toSorted((a, b) => a.completed > b.completed ? 1 : -1) // 'toSorted' permet d'avoir le tableau organisé sans le modifier ou utiliser un clone du tableau [...todos.value]
        if(hideCompleted.value === true) {
            return sorted.filter(t => t.completed === false)
        }
        return sorted
    })

    const remainingTodos = computed(() => {
        return todos.value.filter(t => t.completed === false).length
    })

    console.log(
        sortedTodos // Va être comme un objet vue.js, va fonctionner comme une référence
    )
    console.log(sortedTodos.value) // Il ne vas pas à chaque fois réexécuter la fonction car il va détecter qu'il n'y a pas eu de changement
    console.log(sortedTodos.value)
    console.log(sortedTodos.value)
</script>

<template>
    <button @click="showTimer = !showTimer">Afficher le temps</button>
    <Timer v-if="showTimer"></Timer>

    <form action="" @submit.prevent="addTodo">
        <fieldset role="group">
            <!-- Pour récupérer la valeur au niveau du champ on utilise v-model -->
            <input v-model="NewTodo" type="text" placeholder="Tâche à éffectuer">
            <button :disabled="NewTodo.length === 0">Ajouter</button>
        </fieldset>
    </form>

    <div v-if="todos.length === 0">Vous n'avez pas de tâche à faire :(</div>
    <div v-else>
        <ul> <!-- Ici on ne fais plus appel à une fonction comme sortedTodos() mais sortedTodos à cause du computed, sert à optimiser les choses sinon il va l'appeler à tous moment -->
            <li v-for="todo in sortedTodos"
                :key="todo.date"
                :class="{completed: todo.completed}"
            > <!-- le key est clé qui permet d'indentifié chaque tâche -->
                <label>
                    <input type="checkbox" v-model="todo.completed"> <!-- On l'utilise ici pour modifier dynamiquement la propriété competed, On peut faire aussi :checked="todo.completed" mais il faudra détecter lorsqu'on clique -->
                    {{ todo.title }}
                </label>
                <Checkbox :label="todo.title"
                    @check="(p) => console.log('coché', p)"
                    @uncheck="console.log('décoché')"
                    v-model="todo.completed"
                />
                <!-- <Checkbox :label="todo.title" /> -- Propriété dynamique utiliser Todo
                    (p) je suis intérèssé par le paramètre et je veux que tu me l'affiche
                -->
            </li>
        </ul>
        <label>
            <input type="checkbox" v-model="hideCompleted">
            Masquer les tâches complètés
        </label>
    </div>
    <p v-if="remainingTodos > 0">
        {{ remainingTodos }} tâche{{ remainingTodos > 1 ? 's' : '' }} à faire
    </p>
</template>

<style scoped>
    .completed {
        opacity: .5;
        text-decoration: line-through;
    }
</style>