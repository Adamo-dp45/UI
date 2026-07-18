<template>
  <div>
    <NuxtLoadingIndicator /> <!-- Va afficher un loader lorsqu'on va passer d'une page à l'autre -->
    <NuxtRouteAnnouncer />
    <!-- <NuxtWelcome /> -->
    <Header />
    <NuxtPage /> <!-- Il n'est pas nécéssaire de les importer, ils le sont de manière globale -->
  </div>
</template>

<script setup>
    const config = useAppConfig() /*
        - Pas réactive vu qu'il est générer lorsqu'il y'a un build
    */
    useSeoMeta({
        title: config.title
    })
</script>

<style>
    .page-enter-active,
    .page-leave-active {
        transition: all .4s;
    }
    .page-enter-from,
    .page-leave-to {
        opacity: 0;
        filter: blur(1rem);
    }
</style>