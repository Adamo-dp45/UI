<script setup>
import { ref, useCssModule } from 'vue'

console.log(useCssModule()) // Contient le css module en objet depuis vue

/* - Les Css modules ne viennent pas de vue
    .className { color: 'red'; }
    Js : import style from 'style.css' - element.innerHtml = '<div class="style.className"></div>'
*/

const color = ref('red')
</script>

<template>
    <div :class="$style.text">
        Css Module
    </div>

    <select v-model="color">
        <option value="red">Rouge</option>
        <option value="blue">Blue</option>
        <option value="yellow">Jaune</option>
    </select>

    <p class="textbind">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur, iure hic error accusantium repudiandae dolorum non dolore iusto cumque eligendi, molestias suscipit repellat vel ut animi, inventore explicabo accusamus.
    </p>

    <div class="app">
        <h1>Lorem</h1>
    </div>
    <div class="text"> <!-- Ici il sera bleu -->
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, repellendus. Impedit, velit dolorem reiciendis nisi modi corrupti similique sed odio eos cum, voluptatibus ullam quasi explicabo officiis. Magni, odio est!
    </div>
</template>

<style scoped> /* Grâce à l'attribut scoped la classe sera mis sur seulement notre premier div */
    .text { /* Il va scopper le style au niveau du composant */
        color: blue;
    }
    .app h1 {
        color: aquamarine; /* Ici ça sera seulement pour ce composant */
    }
    .app :deep(h1) {  /* :deep sible tous les enfants en profondeurs */
        color: aquamarine;
    }
    /* :global(.app h1) : La règle va être mis de manière globale */
    /* ::slotted(.text) : Si on mais un style dans le composant enfant qu'on veut qu'il s'applique chez le parent, car par défaut les styles prises en comptes sont celui du parent, ne marhe que si la structure html est un enfant de votre composant */

    .textbind {
        color: v-bind(color); /* Pour utiliser une variable */
    }
</style>

<style> /* Ou le séparer de cette mainière */
    .app h1 {
        color: aquamarine;
    }
</style>

<style module>
    /* Une autre méthode de travail sont les modules css, permettent de générer les noms des class de manière automatique, et aussi n'affecte pas les autres éléments */
    .text {
        color: brown;
    }
</style>

<style lang="scss">
    /* Préprocesseur, Lors de la compilation va demander d'installer npm install -D sass-embedded */
    // @use 'sass:color';
    // .text {
    //    color: color.scale-color($color: #FF0000, $alpha: -40%);
    // }
</style>