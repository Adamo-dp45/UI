<script setup>
    import { RouterView } from 'vue-router'
    import FadeSlide from '../transition/fadeSlideForBlog.vue'
</script>

<template>
    <!-- Pour le single seulement
        <div class="blog">
            <main>
                <RouterView></RouterView>
            </main>
            <aside>
                <h2>Sidebar</h2>
            </aside>
        </div>
    -->

    <!-- Pour avoir des 'RouterView' multiple -->
    <div class="blog">
        <main>
           <!-- <RouterView></RouterView> -->

            <!-- Transition -->
            <RouterView v-slot="{ Component }"> <!-- Le slot qui correspond au composant va être sauvegarder dans une variable 'Component' -->
                <FadeSlide>
                    <component :is="Component"></component> <!-- 'component' permet d'avoir un composant dynamique -->
                </FadeSlide>
            </RouterView>
        </main>
        <aside>
            <h2>Sidebar</h2>
            <RouterView name="sidebar"></RouterView>
        </aside>
    </div>
</template>

<style>
    .blog {
        display: grid;
        grid-template-columns: 1fr 200px;
        gap: 1rem;
    }
</style>