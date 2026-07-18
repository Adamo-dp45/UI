<template>
    <Transition name="slide" appear mode="out-in"> <!-- Le mode lui d'attendre la fin de l'animation de sortie avant d'avoir l'animation d'entrer -->
        <slot></slot>  <!-- appear rajoute l'effet d'animation à l'arriver -->
    </Transition>
    <!-- Ou 
    <div class="relative">
        <Transition name="slide"> 
            <slot></slot> 
        </Transition>
    </div> -->

    <TransitionGroup tag="ul"> <!-- Ici je peut lui dire de devenir un ul dans mon html, ça peut nous faire économiser une balise -->

    </TransitionGroup> <!-- Fonctionne si son enfant est un v-for -->
</template>

<style>
/*
    .relative {
        position: relative;
    }
    .slide-leave-active {
        position: absolute;
        width: 100%;
    } 
*/

/* - Si on veut que quand on un supprime un élément et qu'on ne veut pas un saut
    .slide-leave-active {
        position: absolute;
    }
*/

.slide-enter-active,
.slide-leave-active {
    transition: .5s;
}
.slide-enter-from { /* Quand l'élément arrive */
    opacity: 0;
    transform: translateX(10px);
}
.slide-leave-to { /* Quand il part */
    opacity: 0;
    transform: translateX(-10px);
}
</style>