<template>
    <div class="relative">
        <Transition name="slide"> 
            <slot></slot> 
        </Transition>
    </div>
</template>

<style>
.relative {
    position: relative;
}
.slide-leave-active {
    position: absolute;
    width: 100%;
} 
.slide-leave-active {
    position: absolute;
}

.slide-enter-active,
.slide-leave-active {
    transition: .5s;
}
</style>