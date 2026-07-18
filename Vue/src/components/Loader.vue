<template>
    <div class="loader"></div>
</template>

<style scoped>
    .loader {
        width: 20px;
        height: 20px;
        border: 2px solid #ccc;
        border-top: 2px solid #CCC;
        border-radius: 50%;
        animation: spin 0.7s linear infinite;
        margin: 2rem auto;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>