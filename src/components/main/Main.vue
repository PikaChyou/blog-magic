<template>
    <div class="main">
        <div class="main-container">
            <div class="content">
                <p class="btn-back" @click="$router.back()"> &lt;-返回 </p>
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