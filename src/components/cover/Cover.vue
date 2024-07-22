<template>
    <div class="cover">

        <Header>
            <Menu />
        </Header>

        <img src="/hoshino.jpg" alt="cover" class="cover-bg cover-blur">

        <slot></slot>

        <div class="wave-container">
            <svg class="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto" fill="white">
                <defs>
                    <path id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g class="wave">
                    <use xlink:href="#gentle-wave" x="48" y="7" />
                    <use xlink:href="#gentle-wave" x="48" y="5" />
                    <use xlink:href="#gentle-wave" x="48" y="3" />
                    <use xlink:href="#gentle-wave" x="48" y="0" />
                </g>
            </svg>
        </div>

    </div>
</template>

<script setup>
import Header from '@/components/cover/Header.vue'
import Menu from '@/components/Menu.vue'
import '@/components/cover/cover.css'
</script>

<style>
.btn-toTop {
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 5%;
    right: 5%;
    border: 0;
    outline: none;
    border-radius: 50%;
    background-color: var(--bg-c-a7);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.125);
    z-index: 1;
}

.btn-toTop>svg {
    width: 60%;
}

.btn-toTop>svg path {
    stroke: var(--dark-c-2);
}
</style>