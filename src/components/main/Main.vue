<template>
    <div class="main">
        <div class="main-container">
            <div class="content">
                <p @click="$router.back()"> &lt;-返回 </p>
                <slot>nothing</slot>
            </div>
            <Sidebar v-if="isWideScreen">
                <Menu></Menu>
            </Sidebar>
        </div>
    </div>
</template>

<script setup>
import '@/components/main/main.css'
import Sidebar from '@/components/main/Sidebar.vue'
import Menu from '@/components/Menu.vue'

import { onMounted, onUnmounted, ref } from 'vue'
const isWideScreen = ref(window.innerWidth >= 1200)

function updateScreen() { isWideScreen.value = window.innerWidth >= 1200 }
onMounted(() => { window.addEventListener('resize', updateScreen) })
onUnmounted(() => { window.removeEventListener('resize', updateScreen) })
</script>