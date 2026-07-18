### Vue 3 - Api Composition `vuejs.org`

- Extension navigateur `Vue.js devtools`
    > `Vetur` une extension vscode conseiller par vue au par avant
    > `Volar` une extension vscode qui comprend le mode `setup` du script, pour fonctionner il faut juste la présence d'un fichier `jsconfig.json`

- **Important !**
    > `Composition` ou `Option` : Le `setup` de la partie srcipt, l'option est hérité de l'ancienne version de vue et le composition est la nouvelle ce qui explique le setup
    > Quand on met l'évènement d'un enfant sur son parent il le reçoit car ça passe au travers
    > `Propriétés calculées` par defaut si je tape dans le champ vue va appeler ma fonction `sortedTodos` alors que ma liste de tâche n'a pas encore changer, cela se fait car ma fonction dépend d'autres variable dynamique, donc pour modifier ce comportement on utilisera propriété `computed` et vue sera capable d'optimiser les choses, autre remarque faire attention à ne rien mutté dans la partie computed du genre à utiliser `sort`
    > `computed` permet de retourner une valeur calculée à partir de données réactives, si on veut l'utiliser pour un `fetch` on créer une url avec computed `computed(() => '/api/${id}')` et on réagi avec `watch` ou `watchEffect` pour faire le fetch `watch(url, (newUrl) => { fetch(newUrl) }, { immediate: true})`
    > Pour charger les données comme des appelles `fetch` au moment ou le composant est monté on utilise `onMounted`
    > `Props` permet de faire passer des informations de composant à composant, mais parfois on vas avoir un composant parent qui va avoir besoin de communiquer avec un composant enfant qui est plus loin dans l'arbre pour ça on a la notion de `Provide - Inject`
    > L'attribut `ref` sur une balise ou un composant sert à référencer un élément du DOM ou un composant enfant directement dans le js, permet de dire `je veux pouvoir accéder à cet élément html ou ce composant dans mon script`
    > Passage implicte, si on donne des propriétés qui ne se pas comprise par nos composants automatquement vue les transmet au premier parent trouver
    > La directive `v-model` permet de lier automatiquement une donnée à un champ de formulaire ou à un composant, de façon bidirectionnelle, quand l’utilisateur modifie le champ la variable est automatiquement mise à jour et quand la variable change le champ html est aussi mis à jour
    - - 
    > La fonction `markRaw` permet de marquer un objet comme non réactif - `const mapInstance = new Map()` - `markRaw(mapInstance)`, ne sera pas rendu réactif, il ne sera pas traqué et ne déclenchera pas de mise à jour du dom
    > !! `reactive` permet de créer un objet profond réactif
    > !! `readonly` permet de créer un objet réactif en lecture seule - `const raw = reactive({ count: 0 })` - `const readOnlyState = readonly(raw)`
    > !! `isReactive`, `isRef`, `isReadonly`, `isProxy` pour de tester la nature d’un objet et retourne un boolean
    > !! `unref` permet d'accéder à la valeur d’un ref, que ce soit une ref ou non `const value = unref(raw)`

**Package**
- Vue Router `router.vuejs.org` : Permet de gérer la partie routing
    > npm install vue-router@4
    > Une fois installé on vas changer la partie `a` de notre application en `RouterLink`
    > La séconde partie qu'on vas modifié et là ou on gérait quel composant on doit afficher en fonction de l'url `Blog.vue` en ajoutant le composant `RouterView`
    > L'étape suivante est de créer un fichier qui va nous permettre de définir les routes `routes.js` et on crée le router dans le `main.js`
- Motion `motion.dev` : Animation
    > npm install motion
- Pinia `pinia.vuejs.org` : Une gestion d'état dans vue
    > npm install pinia
    > Plugins
        > npm i pinia-plugin-persistedstate : Pour persister les informations
- Tanstack `tanstack.com `: Permet de gérer mieux avec vue l'intéraction avec les données extérieur et qui va permettre de gérer la mise en cache et la validation
    > npm i @tanstack/vue-query
- Vue Flip Toolkit : Animation flip
    > npm i vue-flip-toolkit : Une adaptation vue.js du `react-flip-toolkit`
    > npm i vue-flip : Permet d'inverser des éléments
    > npm i vue-flipper : Permet de retourner des éléments avec une transition fluide
    > npm i flipbook-vue : Permet d'afficher des images avec un effet de page tournée en 3d

- **Nuxt** `nuxt.com` - Un framework pour créer des application web avec vue, fais du `SSR` et de la génération statique
    > npm create nuxt@latest nuxt

**Test**
- npm install -D vitest jsdom @vue/test-utils : `jsdom` permet d'émuler les api javascript côté navigateur mais directement sur node.js, `@vue/test-utils` un ensemble de fonction qui vont nous permettre de travailler plus facilement avec vue
- npx vitest `vitest.dev` : Pour exécuter les tests, on appuie sur `u` dans le terminal pour mettre à jour les snapshot
- Un autre outil de test `jestjs.io`
    > npm install --save-dev jest

**Bibliothèques de composants**
- primevue.org
    > npm install primevue @primeuix/themes
- naiveui.com : Une bibliothèque moderne, minimaliste et élégant
    > npm i -D naive-ui
- shoelace.style : Un framework basé sur web component
    > npm install @shoelace-style/shoelace
- headlessui.com : Composants sans style
    > npm install @headlessui/vue@latest
- oruga-ui.com : Composants neutres et non stylés
    > npm install @oruga-ui/oruga-next
- vueformulate.com : Un générateur de formulaires puissant
    > npm install @braid/vue-formulate
- element-plus.org : Un projet entreprise, populaire en asie
    > npm install element-plus --save
- vuetifyjs.com : Un material design
    > npm create vuetify@latest
- vant-ui.github.io : Un design mobile-first
    > npm i vant
- vue-tailwind.com : Composants tailwind customisables
    > npm install vue-tailwind --save
- quaquasar.devsar : Une bibliothèque très complète avec ui,cli,pwa mobile et desktop
- inkline.io : Un design system accessible