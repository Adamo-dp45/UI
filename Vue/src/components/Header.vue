<template>
    <header class="header">
        <!-- <a href="#" class="header__logo">Mon site</a> -- Hash -->
        <RouterLink to="/">Single page</RouterLink>
        <nav>
            <!-- <a href="#blog">Blog</a> -- Hash -->

            <!-- Vue router -->
            <RouterLink :to="{name: 'posts.index'}">Blog</RouterLink> <!-- Il n'est pas utile de l'importer ici -->
            <RouterLink to="/contact">Contact</RouterLink>
        </nav>
    </header>
</template>

<style>
.header {
    display: flex;
    align-items: center;
    padding: .5rem 1rem;
    gap: 1rem;
    background: #CCC;
    border-bottom: 1px solid #ffffff2d;
}

.header a {
    text-decoration: none;
    color: inherit;
}

.header nav {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.header__logo {
    font-size: 1.4rem;
}
</style>