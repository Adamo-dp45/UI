<template>
    <h1>{{ data.hello }}</h1>
</template>

<script setup>
    const {data} = useFetch("/api/hello")
</script>