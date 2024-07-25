<template>
    <div class="main">
        <div class="main-container">
            <div class="content">
                <!-- <font-awesome-icon class="back-btn" :icon="['fas', 'backward']" @click="$router.back()" /> -->
                <slot>nothing</slot>
            </div>
            <Sidebar v-if="screen.isWideScreen">
                <Menu></Menu>
            </Sidebar>
        </div>
    </div>
</template>

<script setup>
import '@/components/main/main.css'
import Sidebar from '@/components/main/Sidebar.vue'
import Menu from '@/components/Menu.vue'
import { useScreenStore } from "@/store/screen"
const screen = useScreenStore()
</script>

<style>
.back-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--dark-c-3);
    transition: color .28s;
}
</style>