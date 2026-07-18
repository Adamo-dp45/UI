<script setup>
    /*
        - v-show : Permet d'affichier ou de cacher un élément, v-hide : !! l'inverse du v-show
        - v-if : Permet d'afficher ou supprimer l'element
    */
    import { computed, defineCustomElement, ref, shallowRef, onBeforeUnmount, onMounted } from 'vue'
    import { useTheme } from './plugins/pinia/theme'
    import Layout from './components/Layout.vue'

    /* - Pour comprendre la réactivité, si on ne veut pas utiliser 'ref' et qu'on ne veut pas modifier une propriété en profondeur
        const raw = { firstname: 'John' }
        const neChangePas = shallowRef(raw) -- Ne modifie pas l'objet original avec les proxy mais le ref le fait, ou ..
        const neChangePas = ref(markRaw({}))
        console.log(
            toRaw(neChangePas.value) === raw -- Utilise l'objet original
        )
    */

    const count = ref(0)
    const buttonCount = ref(0)
    const fisrtname = 'John'
    const Html = '<strong>Pour injecter du html</strong>'

    const increment = (event) => { // On peut recevoir l'évènement en params
        console.log(event)
        buttonCount.value++
    }
    const decrement = () => {
        buttonCount.value--
    }
    setInterval(() => {
        count.value++
    }, 1000)

    // --
    const movies = ref([
        'Matrix',
        'Rambo',
        'Vandame'
    ])
    const deleteMovie = (mov) => {
        movies.value = movies.value.filter(m => m !== mov)
    }
    const sortMovies = () => {
        movies.value.sort((a, b) => a > b ? 1 : -1)
    }

    const movieName = ref('') // Pour le v-model
    const addMovie = () => { // On peut récupérer l'event ici mais j'ai un attribut au niveau du formulaire
        movies.value.push(movieName.value)
        movieName.value = '' // On n'en profite pour vider la valeur du champ
    }

    // --
    const person = ref({ // Lorsqu'on a une ref d'un objet tout l'objet devient dynamique, et lorsqu'on modifie une propriété de cet objet automatiquement tout l'objet se met à jour
        fisrtname: 'John',
        lastname: 'Doe',
        age: 20
    })

    /* - Premier reflex
        const randomAge = () => {
            person.value = {
                ...person.value,
                age: Math.round(Math.random() * 100)
            }
        }
    */

    const randomAge = () => {
        person.value.age = Math.round(Math.random() * 100)
    }

    // -- Pinia -- //
    const store = useTheme()
    const theme = computed(() => store.isDark ? 'Light' : 'Dark')

    // --
    const isOnline = ref(navigator.onLine)
    const updateStatus = () => {
        isOnline.value = navigator.onLine
    }

    onMounted(() => {
        window.addEventListener('online', updateStatus)
        window.addEventListener('offline', updateStatus)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('online', updateStatus)
        window.removeEventListener('offline', updateStatus)
    })
</script>

<template>
    <h1
        class="network"
        :class="{ online: isOnline, offline: !isOnline }"
        role="status"
        aria-live="polite"
    >
        {{ isOnline ? 'En ligne' : 'Hors ligne' }}
    </h1>
    <hr>
    <h1>Bonjour {{ fisrtname.toUpperCase() }}</h1>
    <h2>Compteur : {{ count }}</h2> <!-- count.value car vue déconstruit -->
    <h2>Compteur au click : {{ buttonCount }}</h2>
    <button @click="increment">Incrementer</button>
    <button v-on:click="decrement">Decrementer</button>
    <!--<button v-on:click="buttonCount--">Decrementer directe</button>-->
    <div v-if="buttonCount >= 5">Bravo vous avez cliquer plus de 5 fois</div>
    <div v-else>Vous avez cliquer moins de 5 fois</div>

    <button @click="store.switchTheme">Pinia {{ theme }}</button>

    <h2 v-bind:id="buttonCount">Valuer d'attribut dynamique  : {{ buttonCount }}</h2> <!-- Ou :id, avec backtik `p-${buttonCount}` -->
    <h2 :style="{color: count >= 5 ? 'red' : 'green'}">Changement de couleur en fonction de la situation - Style dynamique</h2>
    <h2 :class="{active: buttonCount > 5}">Class dynamique en fonction de la situation</h2>
    <div v-html="Html"></div>
    <hr>

    <form action="" @submit.prevent="addMovie"> <!-- .prevent équivaut à faire un preventDefault() dans la partie script -->
        <input type="text" placeholder="Nouveau film" v-model="movieName"> {{ movieName }} <!-- v-model veut dire que cette valeur est automatiquement associé a ce champ là, Fonctionne avec les éléments de formulaire -->
        <button>Ajouter</button>
    </form>
    <ul>
        <li
            v-for="movie in movies"
            :key="movie"
        > <!-- :key : Permet de deplacer le li sinon il vas juste changer la valeur du li, et la clé doit être unique pour chaque li -->
            {{ movie }} <button v-on:click="deleteMovie(movie)">Supprimer</button>
        </li>
    </ul>
    <button @click="sortMovies">Reorganiser</button>

    <ul>
        <li>{{ person.fisrtname }}</li>
        <li>{{ person.lastname }}</li>
        <li>{{ person.age }}</li>
    </ul>
    <button class="hr" @click.prevent="randomAge">Changer Age</button>
    <Layout>
        <template v-slot:header> <!-- On peut remplacer le v-slot par un # -->
            En tête
        </template>
        <template v-slot:aside>
            SideBare
        </template>
        <template v-slot:main>
            Contenu
        </template>
        <template v-slot:footer>
            Bas de pâge
        </template>
    </Layout>
</template>

<style scoped>
    body {
        background-color: #f7fafb;
    }

    h1 {
        color: red;
    }

    .active {
        color: blue;
    }

    .hr {
        margin-bottom: 20px;
    }

    .network {
        font-weight: 600;
    }

    .network.online {
        color: #065f46;
    }

    .network.offline {
        color: #991b1b;
    }
</style>
