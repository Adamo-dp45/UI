<template>
    <div class="layout">
        <header v-if="$slots.header"> <!-- Affiche le header que si on a un slot pour le header, conditionne l'affichage -->
            <slot name="header"></slot>
        </header>
        <aside>
            <slot name="aside"></slot>
        </aside>
        <main>
            <slot name="main"></slot>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<style>
    .layout {
        display: grid;
        grid-template-columns: 200px 1fr;
    }
    .layout > * { /* Tous les éléments qui sont des enfants directe */
        border: 1px solid red;
    }
    .layout header,
    .layout footer {
        grid-column: 1 / -1;
    }
</style>