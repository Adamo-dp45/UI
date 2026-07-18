<script setup>
import { ref, computed } from "vue"

/*
    - <templates> : Peut être intérèssant quand on veut créer un sous éléments qui ne soit pas présent dans le DOM
    - <components> : Si jamais il y'a un composant dynamique à charger on peut l'utiliser
*/
let showCount = ref(true)
const componentToShow = computed(() => {
    if(showCount.value) {
        return 'Compteur'
    }
    return 'Placeholder'
})

// -- Composant de vue
/*
    - KeepAlive : Permet de garder des composants actifs lorsque ils sont démonté avec un v-if ou <component>, par défaut quand le composant est démonté l'état n'est pas sauvegarder, attention il va avoir un éffet sur les composants enfants car il ne vont plus être considérer comme monter ou demonter, si on utilise le 'onMunted' ou 'unMunted' pour grèffé des choses liées au DOM on aura une erreur à la place on n'a 2 hook 'onActivated' et 'onDesactivated' plutôt que les 'onMunted', on le fais si notre composant est un enfant du 'KeepAlive', il a aussi des paramètre voir doc..

    - Teleport : Permet de téléporter un élément particulier, il a attribut to qui est un selecteur css qui va nous permettre d'indiquer ou on vas envoyer l'élément, ici va migrer notre dialog dans le body en bas, va laisser ça position initial, idéal pour les modal . tooltip, Il a assi un attribut disabled qui permet d'activer ou désactiver le téléporte

    - Async Components : Pour utiliser des composants de manière async, vont être charger que lorsqu'il seront affichés, aussi le composant 'Suspense' est utiliser dans son cas, doc..
*/

let trueOrfalse = false
</script>

<template>
    <KeepAlive>
        <!-- <component :is="componentToShow" /> Va afficher le composant à charger -->
    </KeepAlive>

    <Teleport to="body" :disabled="trueOrfalse">
        <dialog open>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptate sapiente cupiditate voluptas, sint quos fuga laboriosam. Cupiditate provident accusamus veniam porro itaque voluptas quam sequi perspiciatis illum sunt. Dolores! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore asperiores repudiandae corrupti ex. Aspernatur error aperiam excepturi molestias illo ab obcaecati nisi reiciendis a, delectus voluptas eveniet veniam adipisci provident.
        </dialog>
    </Teleport>
</template>