<template>
    <template v-for="item in  settings.menu " :key="item.name">
        <router-link :to="item.path" :id="getId(item.path)" @click="handleScroll(item.path)">
            {{ item.name.toUpperCase() }}
        </router-link>
    </template>
</template>

<script setup>
import { useRoute } from 'vue-router'
import settings from '@/settings.json'
import scrollToTop from '@/components/scroll.js'

const route = useRoute()
const getId = (path) => {
    return route.path === path ? 'is-current' : ''
}

const handleScroll = (path) => {
    if (route.path != path)
        return scrollToTop()
}

</script>