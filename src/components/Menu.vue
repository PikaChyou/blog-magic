<template>
    <template v-for="item in  settings.menu " :key="item.name">
        <router-link :to="item.path" :id="$route.path === item.path ? 'is-current' : ''">
            {{ item.name.toUpperCase() }}
        </router-link>
    </template>
</template>

<script setup>
import settings from '@/settings.json'
</script>